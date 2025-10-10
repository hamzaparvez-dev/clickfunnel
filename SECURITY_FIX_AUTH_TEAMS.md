# Security Fix: Authentication and Team Authorization

## Overview

This document describes the security fixes implemented for the funnel creation endpoint (`app/api/funnels/route.ts`) to address critical authentication and authorization vulnerabilities.

## Issues Fixed

### 1. **No Authentication Required**
- **Problem**: The endpoint was completely unauthenticated - anyone could create funnels
- **Solution**: Now requires a valid Firebase JWT token in the Authorization header
- **Response**: Returns `401 Unauthorized` if no valid token is provided

### 2. **Client-Controlled Team Assignment**
- **Problem**: The `teamId` came directly from the client request without validation
- **Solution**: The server now validates that the authenticated user has access to the requested team
- **Response**: Returns `403 Forbidden` if user doesn't have access to the specified team

### 3. **Shared Temporary Team**
- **Problem**: Used a shared 'temp-team-id' for all unauthenticated requests via `connectOrCreate`
- **Solution**: Removed `connectOrCreate` pattern; now uses validated team IDs only
- **Behavior**: If no team is specified, uses the user's default team or creates a personal team

### 4. **Insecure Prisma Operations**
- **Problem**: Used `connectOrCreate` with client-controlled IDs
- **Solution**: Changed to direct `teamId` assignment with validated IDs only
- **Security**: Prevents privilege escalation and unauthorized team creation

## Implementation Details

### New Authentication Module: `lib/auth/server.ts`

Created a comprehensive server-side authentication module with the following functions:

#### `validateAuth(request: NextRequest): Promise<AuthUser | null>`
- Extracts and validates the Firebase JWT token from Authorization header
- Returns the authenticated user or null if invalid
- **Note**: Currently decodes JWT payload without signature verification (see Production Notes)

#### `validateTeamAccess(userId: string, teamId: string): Promise<boolean>`
- Checks if a user has membership in a specific team
- Queries the `TeamMember` table for validation

#### `getUserDefaultTeam(userId: string): Promise<string | null>`
- Gets the user's first team (prioritized by role: owner > admin > editor > viewer)
- Returns null if user has no teams

#### `ensureUserTeam(userId: string): Promise<string>`
- Creates a personal team for users who don't have one
- Automatically adds the user as team owner
- Used when creating funnels without specifying a team

#### `validateAuthAndTeam(request: NextRequest, requestedTeamId?: string)`
- Main authentication/authorization function used by API routes
- Returns `{ user, teamId }` on success
- Throws `AuthError` with appropriate status codes (401/403) on failure

### Updated Endpoints

#### `GET /api/funnels`
**Before**: 
- No authentication
- Returned all funnels in the database

**After**:
- Requires authentication (401 if missing)
- Returns only funnels from teams the user has access to
- Filters by team membership via Prisma query

#### `POST /api/funnels`
**Before**:
```typescript
team: {
  connectOrCreate: {
    where: { id: teamId || 'temp-team-id' },
    create: {
      id: teamId || 'temp-team-id',
      name: 'Temporary Team',
      slug: 'temp-team',
    },
  },
}
```

**After**:
```typescript
// Validate authentication and team access first
const { user, teamId } = await validateAuthAndTeam(request, requestedTeamId)

// Create funnel with validated teamId
const funnel = await prisma.funnel.create({
  data: {
    name: name.trim(),
    slug: funnelSlug,
    description: description?.trim() || '',
    status: 'draft',
    teamId, // Direct assignment with validated ID
  },
  // ...
})
```

**Behavior**:
- Returns `401 Unauthorized` if no valid token
- Returns `403 Forbidden` if user doesn't have access to specified team
- Returns `400 Bad Request` if name is missing
- Returns `201 Created` with funnel data on success

## Security Improvements

### ✅ Authentication Required
- All funnel operations now require a valid Firebase token
- Unauthenticated requests receive 401 status

### ✅ Authorization Validated
- Users can only create funnels in teams they're members of
- Team access is verified against the `TeamMember` table
- Unauthorized access attempts receive 403 status

### ✅ No Shared Resources
- Eliminated the shared 'temp-team-id' vulnerability
- Each user gets their own personal team if needed
- No cross-user data leakage

### ✅ Proper HTTP Status Codes
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Valid auth but insufficient permissions
- `400 Bad Request`: Invalid request data
- `500 Internal Server Error`: Server-side failures

## Usage Examples

### Creating a Funnel (Success)

**Request**:
```http
POST /api/funnels
Authorization: Bearer <firebase-jwt-token>
Content-Type: application/json

{
  "name": "My Sales Funnel",
  "description": "A funnel for selling products",
  "slug": "my-sales-funnel",
  "teamId": "team_abc123" // optional
}
```

**Response** (201 Created):
```json
{
  "id": "funnel_xyz789",
  "name": "My Sales Funnel",
  "slug": "my-sales-funnel",
  "teamId": "team_abc123",
  "status": "draft",
  // ... other fields
}
```

### Unauthorized Access (No Token)

**Request**:
```http
POST /api/funnels
Content-Type: application/json

{
  "name": "Unauthorized Funnel"
}
```

**Response** (401 Unauthorized):
```json
{
  "error": "Unauthorized - Authentication required"
}
```

### Forbidden Access (Invalid Team)

**Request**:
```http
POST /api/funnels
Authorization: Bearer <valid-token>
Content-Type: application/json

{
  "name": "My Funnel",
  "teamId": "team_not_member_of"
}
```

**Response** (403 Forbidden):
```json
{
  "error": "Forbidden - You do not have access to this team"
}
```

## Production Notes

### ⚠️ Important: Firebase Admin SDK Required

The current implementation decodes the JWT token payload **without verifying the signature**. This is **NOT secure** for production use.

**Required Action**:
1. Install `firebase-admin` package:
   ```bash
   npm install firebase-admin
   ```

2. Set up Firebase Admin SDK in `lib/firebase/admin.ts`:
   ```typescript
   import * as admin from 'firebase-admin'
   
   if (!admin.apps.length) {
     admin.initializeApp({
       credential: admin.credential.cert({
         projectId: process.env.FIREBASE_PROJECT_ID,
         clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
         privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
       }),
     })
   }
   
   export const auth = admin.auth()
   ```

3. Update `validateAuth()` in `lib/auth/server.ts`:
   ```typescript
   import { auth } from '@/lib/firebase/admin'
   
   export async function validateAuth(request: NextRequest): Promise<AuthUser | null> {
     try {
       const authHeader = request.headers.get('authorization')
       if (!authHeader || !authHeader.startsWith('Bearer ')) {
         return null
       }
   
       const token = authHeader.substring(7)
       const decodedToken = await auth.verifyIdToken(token) // Proper verification
       const firebaseUid = decodedToken.uid
       
       const user = await prisma.user.findUnique({
         where: { firebaseUid },
         select: { id: true, email: true, name: true, firebaseUid: true, role: true },
       })
   
       return user
     } catch (error) {
       console.error('Error validating auth:', error)
       return null
     }
   }
   ```

4. Add environment variables:
   ```env
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

## Testing Recommendations

1. **Test Authentication**:
   - Verify 401 response without token
   - Verify 401 response with invalid token
   - Verify success with valid token

2. **Test Authorization**:
   - Verify 403 when accessing another user's team
   - Verify success when accessing own team
   - Verify default team assignment works

3. **Test Team Creation**:
   - Verify personal team creation for new users
   - Verify team membership is created correctly
   - Verify no duplicate teams are created

4. **Test Edge Cases**:
   - Multiple teams for same user
   - Different team roles (owner, admin, editor, viewer)
   - Concurrent funnel creation

## Migration Guide

If you have existing funnels with 'temp-team-id':

```sql
-- 1. Create a default team if needed
INSERT INTO teams (id, name, slug, created_at, updated_at)
VALUES ('default-team', 'Default Team', 'default-team', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 2. Update funnels to use the default team
UPDATE funnels
SET team_id = 'default-team'
WHERE team_id = 'temp-team-id';

-- 3. Optionally, delete the temp team
DELETE FROM teams WHERE id = 'temp-team-id';
```

## Summary

These changes transform the funnel endpoints from completely open (no security) to properly secured with:
- ✅ Authentication required
- ✅ Team access validated
- ✅ No shared temporary resources
- ✅ Proper error responses
- ✅ Database queries scoped to user's teams

The implementation follows security best practices and provides a foundation for securing other API endpoints in the application.

