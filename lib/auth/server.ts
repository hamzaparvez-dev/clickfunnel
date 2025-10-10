import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * Server-side authentication utilities for API routes
 */

export interface AuthUser {
  id: string
  email: string
  name: string | null
  firebaseUid: string
  role: string
}

export interface AuthError {
  error: string
  status: 401 | 403
}

/**
 * Validates the Firebase ID token and returns the authenticated user
 * This is a simplified version - in production, you should use Firebase Admin SDK
 * to verify the token signature
 */
export async function validateAuth(request: NextRequest): Promise<AuthUser | null> {
  try {
    // Extract token from Authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix
    if (!token) {
      return null
    }

    // In production, you should verify the Firebase token using Firebase Admin SDK:
    // const decodedToken = await admin.auth().verifyIdToken(token)
    // const firebaseUid = decodedToken.uid
    
    // For now, we'll decode the token payload (base64) to get the user info
    // WARNING: This is NOT secure without proper signature verification
    // TODO: Install firebase-admin and implement proper token verification
    try {
      const payload = JSON.parse(
        Buffer.from(token.split('.')[1], 'base64').toString()
      )
      const firebaseUid = payload.user_id || payload.sub
      
      if (!firebaseUid) {
        return null
      }

      // Look up user in database
      const user = await prisma.user.findUnique({
        where: { firebaseUid },
        select: {
          id: true,
          email: true,
          name: true,
          firebaseUid: true,
          role: true,
        },
      })

      return user
    } catch (decodeError) {
      console.error('Error decoding token:', decodeError)
      return null
    }
  } catch (error) {
    console.error('Error validating auth:', error)
    return null
  }
}

/**
 * Validates that a user has access to a specific team
 */
export async function validateTeamAccess(
  userId: string,
  teamId: string
): Promise<boolean> {
  try {
    const membership = await prisma.teamMember.findFirst({
      where: {
        userId,
        teamId,
      },
    })

    return !!membership
  } catch (error) {
    console.error('Error validating team access:', error)
    return false
  }
}

/**
 * Gets the user's default team or first available team
 */
export async function getUserDefaultTeam(userId: string): Promise<string | null> {
  try {
    // Get user's first team membership (ordered by role priority: owner > admin > editor > viewer)
    const membership = await prisma.teamMember.findFirst({
      where: { userId },
      orderBy: [
        // Prioritize by role
        { role: 'desc' },
        // Then by creation date
        { createdAt: 'asc' },
      ],
      select: {
        teamId: true,
      },
    })

    return membership?.teamId || null
  } catch (error) {
    console.error('Error getting user default team:', error)
    return null
  }
}

/**
 * Creates a personal team for a user if they don't have one
 */
export async function ensureUserTeam(userId: string): Promise<string> {
  try {
    // Check if user already has a team
    const existingTeam = await getUserDefaultTeam(userId)
    if (existingTeam) {
      return existingTeam
    }

    // Get user info
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, name: true },
    })

    if (!user) {
      throw new Error('User not found')
    }

    // Create a personal team for the user
    const teamSlug = `${user.name?.toLowerCase().replace(/\s+/g, '-') || 'user'}-${userId.slice(0, 8)}-team`
    
    const team = await prisma.team.create({
      data: {
        name: `${user.name || user.email}'s Team`,
        slug: teamSlug,
        members: {
          create: {
            userId,
            role: 'owner',
          },
        },
      },
    })

    return team.id
  } catch (error) {
    console.error('Error ensuring user team:', error)
    throw new Error('Failed to create user team')
  }
}

/**
 * Validates authentication and team access for API routes
 * Returns the authenticated user and validated teamId, or throws an error response
 * 
 * In development mode (NODE_ENV !== 'production'), if no auth token is provided,
 * it will attempt to use a development fallback user/team
 */
export async function validateAuthAndTeam(
  request: NextRequest,
  requestedTeamId?: string
): Promise<{ user: AuthUser; teamId: string }> {
  // Validate authentication
  let user = await validateAuth(request)
  
  // Development mode fallback
  if (!user && process.env.NODE_ENV !== 'production') {
    console.warn('⚠️ No authentication found - using development fallback')
    console.warn('⚠️ This should NEVER happen in production!')
    
    // Try to find or create a development user
    try {
      const devEmail = 'dev@example.com'
      let devUser = await prisma.user.findUnique({
        where: { email: devEmail },
        select: {
          id: true,
          email: true,
          name: true,
          firebaseUid: true,
          role: true,
        },
      })
      
      if (!devUser) {
        // Create development user
        console.log('Creating development user...')
        devUser = await prisma.user.create({
          data: {
            email: devEmail,
            name: 'Development User',
            firebaseUid: 'dev-firebase-uid',
            role: 'admin',
          },
          select: {
            id: true,
            email: true,
            name: true,
            firebaseUid: true,
            role: true,
          },
        })
        console.log('✅ Development user created:', devUser.id)
      }
      
      user = devUser
    } catch (error) {
      console.error('Failed to create development user:', error)
      throw {
        error: 'Unauthorized - Authentication required',
        status: 401,
      } as AuthError
    }
  }
  
  if (!user) {
    throw {
      error: 'Unauthorized - Authentication required',
      status: 401,
    } as AuthError
  }

  // Determine which team to use
  let teamId: string

  if (requestedTeamId) {
    // If a specific team was requested, validate the user has access
    const hasAccess = await validateTeamAccess(user.id, requestedTeamId)
    if (!hasAccess) {
      throw {
        error: 'Forbidden - You do not have access to this team',
        status: 403,
      } as AuthError
    }
    teamId = requestedTeamId
  } else {
    // If no team specified, use user's default team or create one
    const defaultTeamId = await getUserDefaultTeam(user.id)
    if (defaultTeamId) {
      teamId = defaultTeamId
    } else {
      // Create a team for the user if they don't have one
      teamId = await ensureUserTeam(user.id)
    }
  }

  return { user, teamId }
}

