import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAuthAndTeam, type AuthError } from '@/lib/auth/server'
import { generateUniqueFunnelSlug } from '@/lib/utils/slug'

export async function GET(request: NextRequest) {
  try {
    // Validate authentication and get user's teams
    const { user } = await validateAuthAndTeam(request)

    // Get all funnels from teams the user has access to
    const funnels = await prisma.funnel.findMany({
      where: {
        team: {
          members: {
            some: {
              userId: user.id,
            },
          },
        },
      },
      include: {
        pages: true,
        _count: {
          select: {
            pages: true,
            leads: true,
            orders: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(funnels)
  } catch (error) {
    // Handle authentication/authorization errors
    if (error && typeof error === 'object' && 'status' in error) {
      const authError = error as AuthError
      return NextResponse.json(
        { error: authError.error },
        { status: authError.status }
      )
    }

    console.error('Error fetching funnels:', error)
    return NextResponse.json(
      { error: 'Failed to fetch funnels' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body first for validation
    const body = await request.json()
    const { name, description, slug, teamId: requestedTeamId } = body
    
    // Validate required fields
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is required to create a funnel' },
        { status: 400 }
      )
    }

    // Validate authentication and team access
    // If teamId is provided, this will verify the user has access to it
    // If not provided, it will use the user's default team or create one
    const { user, teamId } = await validateAuthAndTeam(request, requestedTeamId)

    // Wake up database if it's idle (Neon free tier)
    try {
      await prisma.funnel.findFirst({ take: 1 })
    } catch (wakeError) {
      console.log('🔄 Database was idle, waiting for wake up...')
      // Wait a moment for database to wake up
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    
    // Generate unique, sanitized slug
    let funnelSlug: string
    try {
      funnelSlug = await generateUniqueFunnelSlug(name, slug)
    } catch (slugError: any) {
      return NextResponse.json(
        { error: slugError.message || 'Unable to generate a valid slug' },
        { status: 400 }
      )
    }

    // Create the funnel with the validated teamId
    const funnel = await prisma.funnel.create({
      data: {
        name: name.trim(),
        slug: funnelSlug,
        description: description?.trim() || '',
        status: 'draft',
        teamId, // Use the validated teamId (not connectOrCreate)
      },
      include: {
        pages: true,
        _count: {
          select: {
            pages: true,
            leads: true,
            orders: true,
          },
        },
      },
    })

    return NextResponse.json(funnel, { status: 201 })
  } catch (error) {
    // Handle authentication/authorization errors
    if (error && typeof error === 'object' && 'status' in error) {
      const authError = error as AuthError
      return NextResponse.json(
        { error: authError.error },
        { status: authError.status }
      )
    }

    console.error('Error creating funnel:', error)
    return NextResponse.json(
      { error: 'Failed to create funnel' },
      { status: 500 }
    )
  }
}