# Development Mode Authentication

## Overview

To make development easier, the authentication system includes a **development mode fallback** that allows API requests to work even without Firebase authentication configured.

## How It Works

### Production Mode (Secure)
- **Requires**: Valid Firebase JWT token in `Authorization: Bearer <token>` header
- **Returns**: 401 Unauthorized if no token provided
- **Returns**: 403 Forbidden if user doesn't have access to requested resource

### Development Mode (Fallback)
- **Tries**: Authentication first (if token provided, validates it)
- **Fallback**: If no token AND `NODE_ENV !== 'production'`, creates/uses a development user
- **User**: `dev@example.com` with admin role
- **Team**: Auto-creates personal team for development user

## When Development Mode Activates

Development mode **ONLY** activates when:
1. `process.env.NODE_ENV !== 'production'` (development or not set)
2. No authentication token is provided in the request
3. Token validation fails or returns null

## Security Warnings

### ⚠️ Critical
The development fallback will **NEVER** activate in production environments. The check is:

```typescript
if (!user && process.env.NODE_ENV !== 'production') {
  // Development fallback
}
```

### Console Warnings
When development mode activates, you'll see:
```
⚠️ No authentication found - using development fallback
⚠️ This should NEVER happen in production!
```

## Usage Examples

### Frontend (No Auth)
```typescript
// This will work in development even without auth token
const response = await fetch('/api/funnels', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'My Funnel' })
})
// Development: Uses dev@example.com user
// Production: Returns 401 Unauthorized
```

### Frontend (With Auth)
```typescript
// Recommended: Always try to include auth token
const token = await user.getIdToken()
const response = await fetch('/api/funnels', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ name: 'My Funnel' })
})
// Works in both development and production
```

## AppContext Integration

The `AppContext` automatically handles authentication:

```typescript
// Gets auth headers (includes token if user is logged in)
const getAuthHeaders = async () => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (user) {
    try {
      const token = await user.getIdToken()
      headers['Authorization'] = `Bearer ${token}`
    } catch (error) {
      console.error('Error getting auth token:', error)
    }
  }

  return headers
}

// All API calls use getAuthHeaders()
const createFunnel = async (data: any) => {
  const headers = await getAuthHeaders()
  const response = await fetch('/api/funnels', {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  })
  // ...
}
```

## Development User Details

When development mode creates a user:

```typescript
{
  email: 'dev@example.com',
  name: 'Development User',
  firebaseUid: 'dev-firebase-uid',
  role: 'admin'
}
```

This user will have:
- ✅ Admin permissions
- ✅ Personal team (auto-created)
- ✅ Access to all team resources

## Disabling Development Mode

To test production authentication locally:

```bash
# Set NODE_ENV to production
NODE_ENV=production npm run dev
```

Or in `.env.local`:
```env
NODE_ENV=production
```

Now all requests will require proper authentication.

## Production Deployment

### Environment Variable
Make sure your production environment sets:
```env
NODE_ENV=production
```

Most hosting platforms (Vercel, Netlify, etc.) automatically set this.

### Verification
To verify auth is required in production:

```bash
# Should return 401 Unauthorized
curl -X POST https://your-domain.com/api/funnels \
  -H "Content-Type: application/json" \
  -d '{"name": "Test"}'

# Should work with valid token
curl -X POST https://your-domain.com/api/funnels \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <valid-firebase-token>" \
  -d '{"name": "Test"}'
```

## Best Practices

### ✅ Do
- Use proper authentication in production
- Include auth tokens in all requests when available
- Test with `NODE_ENV=production` before deploying
- Monitor console for development mode warnings

### ❌ Don't
- Rely on development mode in production
- Deploy without setting `NODE_ENV=production`
- Ignore development mode warning messages
- Use the development user email in production

## Troubleshooting

### Issue: Getting 401 in development
**Cause**: `NODE_ENV` might be set to `production`  
**Solution**: Check `.env.local` or remove `NODE_ENV` variable

### Issue: Development mode not working
**Cause**: Database connection issue or user creation failed  
**Solution**: Check database is running and migrations are applied

### Issue: Multiple development users created
**Cause**: Race condition on first request  
**Solution**: Normal - the code checks for existing user first, but concurrent requests might create duplicates. This won't affect functionality.

## Migration from Old System

If you had the old system without authentication:

### Before (No Auth)
```typescript
await fetch('/api/funnels', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
```

### After (Compatible)
Same code works in development! But recommended:

```typescript
const headers = await getAuthHeaders() // From AppContext
await fetch('/api/funnels', {
  method: 'POST',
  headers,
  body: JSON.stringify(data)
})
```

## Summary

- 🔒 **Production**: Full authentication required, no fallback
- 🛠️ **Development**: Auto-creates dev user if no auth
- ⚡ **Fast**: No need to configure Firebase for local development
- 🔐 **Secure**: Development mode disabled in production
- ✅ **Compatible**: Works with existing code

The development mode makes it easy to develop and test locally without full authentication setup, while maintaining security in production.

