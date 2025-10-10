# Slug Uniqueness and Sanitization Fix

## Overview

This document describes the improvements made to slug generation and uniqueness validation for funnels and pages to prevent routing conflicts and ensure URL-safe slugs.

## Issues Fixed

### 1. **No Uniqueness Validation**
- **Problem**: Multiple pages within the same funnel could have identical slugs, causing routing conflicts and potential database constraint violations
- **Solution**: Implemented automatic uniqueness checking that appends a counter (e.g., `-1`, `-2`) when duplicates are detected
- **Scope**: Applied to both funnels (globally unique) and pages (unique within each funnel)

### 2. **Basic Slug Sanitization**
- **Problem**: Slug generation didn't handle special characters, accents, or ensure URL-safe output
  - Example: `"Hello & World!"` → `"hello-&-world!"` (invalid URL characters)
  - Example: `"Café Münchën"` → `"café-münchën"` (accented characters)
- **Solution**: Comprehensive sanitization that:
  - Removes accents and diacritics (é → e, ñ → n)
  - Removes special characters (&, !, @, etc.)
  - Replaces spaces and underscores with hyphens
  - Removes multiple consecutive hyphens
  - Trims leading/trailing hyphens

## Implementation

### New Utility Module: `lib/utils/slug.ts`

Created a centralized slug utility module with the following functions:

#### Core Functions

##### `sanitizeSlug(input: string): string`
Sanitizes a string to create a URL-safe slug.

```typescript
sanitizeSlug("Hello & World!") // "hello-world"
sanitizeSlug("Café Münchën") // "cafe-munchen"
sanitizeSlug("  Multiple   Spaces  ") // "multiple-spaces"
sanitizeSlug("Product__Name") // "product-name"
sanitizeSlug("---Dash-Crazy---") // "dash-crazy"
```

**Processing Steps**:
1. Convert to lowercase
2. Trim whitespace
3. Normalize Unicode (NFD) to separate base characters from diacritics
4. Remove diacritical marks ([\u0300-\u036f])
5. Replace spaces and underscores with hyphens
6. Remove all non-alphanumeric characters except hyphens
7. Replace multiple consecutive hyphens with single hyphen
8. Remove leading and trailing hyphens

##### `ensureUniquePageSlug(funnelId: string, baseSlug: string): Promise<string>`
Ensures slug uniqueness for pages within a specific funnel.

```typescript
// If "home" doesn't exist in funnel
await ensureUniquePageSlug("funnel123", "home") // "home"

// If "home" exists, returns next available
await ensureUniquePageSlug("funnel123", "home") // "home-1"
await ensureUniquePageSlug("funnel123", "home") // "home-2"
```

**Algorithm**:
1. Check if `baseSlug` exists in the funnel
2. If not, return `baseSlug`
3. If exists, append `-1` and check again
4. Increment counter until unique slug is found

##### `ensureUniqueFunnelSlug(baseSlug: string): Promise<string>`
Ensures slug uniqueness for funnels globally across the entire database.

```typescript
// If "sales-funnel" doesn't exist
await ensureUniqueFunnelSlug("sales-funnel") // "sales-funnel"

// If "sales-funnel" exists
await ensureUniqueFunnelSlug("sales-funnel") // "sales-funnel-1"
```

##### `generateUniquePageSlug(funnelId: string, name: string, providedSlug?: string): Promise<string>`
High-level function that combines sanitization and uniqueness checking for pages.

```typescript
// Using page name
await generateUniquePageSlug("funnel123", "Home Page") // "home-page"

// Using custom slug
await generateUniquePageSlug("funnel123", "Home Page", "custom-home") // "custom-home"

// Handles duplicates automatically
await generateUniquePageSlug("funnel123", "Home Page") // "home-page-1" (if "home-page" exists)
```

##### `generateUniqueFunnelSlug(name: string, providedSlug?: string): Promise<string>`
High-level function that combines sanitization and uniqueness checking for funnels.

```typescript
// Using funnel name
await generateUniqueFunnelSlug("Sales Funnel") // "sales-funnel"

// Using custom slug
await generateUniqueFunnelSlug("Sales Funnel", "my-sales") // "my-sales"

// Handles duplicates automatically
await generateUniqueFunnelSlug("Sales Funnel") // "sales-funnel-1" (if exists)
```

### Updated Endpoints

#### `POST /api/funnels` - Create Funnel

**Before**:
```typescript
// Basic sanitization, no uniqueness check
const providedSlug = slug?.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-')
const generatedSlug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
const funnelSlug = providedSlug || `${generatedSlug}-${Date.now()}`
```

**After**:
```typescript
// Comprehensive sanitization + uniqueness check
let funnelSlug: string
try {
  funnelSlug = await generateUniqueFunnelSlug(name, slug)
} catch (slugError: any) {
  return NextResponse.json(
    { error: slugError.message || 'Unable to generate a valid slug' },
    { status: 400 }
  )
}
```

**Benefits**:
- ✅ Removes accents and special characters
- ✅ Ensures global uniqueness
- ✅ Proper error handling
- ✅ No timestamp suffix needed

#### `POST /api/funnels/[id]/pages` - Create Page

**Before**:
```typescript
// Basic replacement, no uniqueness check
const pageSlug = slug || name.toLowerCase().replace(/\s+/g, '-')
```

**After**:
```typescript
// Comprehensive sanitization + uniqueness check + validation
let pageSlug: string
try {
  pageSlug = await generateUniquePageSlug(id, name, slug)
} catch (slugError: any) {
  return NextResponse.json(
    { error: slugError.message || 'Unable to generate a valid slug' },
    { status: 400 }
  )
}
```

**Additional Improvements**:
- ✅ Validates funnel exists before creating page (404 if not found)
- ✅ Validates name is non-empty
- ✅ Proper error messages for invalid input

## Examples

### Page Creation Examples

#### Example 1: Normal Page
```http
POST /api/funnels/funnel123/pages
{
  "name": "About Us"
}
```
**Result**: Creates page with slug `"about-us"`

#### Example 2: Duplicate Page Name
```http
POST /api/funnels/funnel123/pages
{
  "name": "About Us"  // Already exists
}
```
**Result**: Creates page with slug `"about-us-1"`

#### Example 3: Special Characters
```http
POST /api/funnels/funnel123/pages
{
  "name": "Café & Restaurant Menu"
}
```
**Result**: Creates page with slug `"cafe-restaurant-menu"`

#### Example 4: Custom Slug
```http
POST /api/funnels/funnel123/pages
{
  "name": "Contact Us",
  "slug": "get-in-touch"
}
```
**Result**: Creates page with slug `"get-in-touch"` (or `"get-in-touch-1"` if exists)

#### Example 5: Invalid Input
```http
POST /api/funnels/funnel123/pages
{
  "name": "!!!@@##"  // Only special characters
}
```
**Result**: 400 Bad Request
```json
{
  "error": "Unable to generate a valid slug from the provided name or slug"
}
```

### Funnel Creation Examples

#### Example 1: Normal Funnel
```http
POST /api/funnels
Authorization: Bearer <token>
{
  "name": "Product Launch Funnel"
}
```
**Result**: Creates funnel with slug `"product-launch-funnel"`

#### Example 2: Accented Characters
```http
POST /api/funnels
Authorization: Bearer <token>
{
  "name": "Münchën Café Special"
}
```
**Result**: Creates funnel with slug `"munchen-cafe-special"`

#### Example 3: Duplicate Name
```http
POST /api/funnels
Authorization: Bearer <token>
{
  "name": "Sales Funnel"  // Already exists
}
```
**Result**: Creates funnel with slug `"sales-funnel-1"`

## Validation Rules

### Slug Validation
- **Allowed characters**: a-z, 0-9, hyphen (-)
- **Min length**: 1 character (after sanitization)
- **Max length**: No explicit limit (database column limit applies)
- **Case**: Always lowercase
- **Accents**: Automatically removed
- **Special chars**: Automatically removed

### Input Validation
- **Name**: Required, non-empty string
- **Slug**: Optional, will be sanitized if provided
- **Funnel ID**: Must exist in database (for pages)

## Database Constraints

The slug uniqueness is enforced both at the application level (this fix) and database level:

### Pages
```prisma
@@unique([funnelId, slug])
```
- Slugs must be unique within each funnel
- Different funnels can have pages with the same slug

### Funnels
```prisma
slug String @unique
```
- Slugs must be globally unique across all funnels

## Error Handling

### 400 Bad Request
Returned when:
- Name is missing or empty
- Slug cannot be generated from name (e.g., only special characters)

**Example Response**:
```json
{
  "error": "Name is required and must be a non-empty string"
}
```

### 404 Not Found
Returned when:
- Creating a page for a non-existent funnel

**Example Response**:
```json
{
  "error": "Funnel not found"
}
```

### 500 Internal Server Error
Returned when:
- Database connection fails
- Unexpected server error

**Example Response**:
```json
{
  "error": "Failed to create page"
}
```

## Performance Considerations

### Uniqueness Checking Performance
- **Worst case**: O(n) where n is the number of existing pages/funnels with similar slugs
- **Typical case**: O(1) - one database query
- **Database queries**: 1 query per uniqueness check attempt
- **Optimization**: Uses indexed `slug` column for fast lookups

### Recommended Practices
1. **Provide custom slugs** when possible to avoid collisions
2. **Use descriptive names** to reduce likelihood of duplicates
3. **Monitor slow queries** if you have thousands of pages per funnel

## Testing

### Test Cases Covered

✅ **Basic Sanitization**
- Spaces converted to hyphens
- Special characters removed
- Accents removed
- Multiple hyphens collapsed

✅ **Uniqueness**
- Duplicate detection within funnel (pages)
- Duplicate detection globally (funnels)
- Counter increment works correctly

✅ **Edge Cases**
- Empty string after sanitization
- Very long names
- Unicode characters
- Emoji removal
- Numbers in names

✅ **Error Handling**
- Invalid input
- Missing funnel
- Database errors

### Manual Testing Commands

```bash
# Test basic page creation
curl -X POST http://localhost:3000/api/funnels/funnel123/pages \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Page"}'

# Test duplicate detection
curl -X POST http://localhost:3000/api/funnels/funnel123/pages \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Page"}'  # Should create "test-page-1"

# Test special characters
curl -X POST http://localhost:3000/api/funnels/funnel123/pages \
  -H "Content-Type: application/json" \
  -d '{"name": "Café & Restaurant!!!"}'  # Should create "cafe-restaurant"

# Test custom slug
curl -X POST http://localhost:3000/api/funnels/funnel123/pages \
  -H "Content-Type: application/json" \
  -d '{"name": "Contact", "slug": "get-in-touch"}'
```

## Migration Notes

### Existing Data
No migration is required. Existing pages and funnels with their current slugs will continue to work. The new validation only applies to:
- New pages/funnels created after this update
- Updates to existing pages/funnels (if slug is changed)

### Potential Issues
If you have existing pages with:
- Identical slugs in the same funnel → Will violate database constraint, needs manual fix
- Special characters in slugs → Will continue to work but consider updating

### Cleanup Script (Optional)
If you want to sanitize existing slugs:

```typescript
// scripts/sanitize-slugs.ts
import { prisma } from '@/lib/prisma'
import { sanitizeSlug, ensureUniquePageSlug } from '@/lib/utils/slug'

async function sanitizeFunnelSlugs() {
  const funnels = await prisma.funnel.findMany()
  
  for (const funnel of funnels) {
    const newSlug = sanitizeSlug(funnel.slug)
    if (newSlug !== funnel.slug) {
      await prisma.funnel.update({
        where: { id: funnel.id },
        data: { slug: newSlug }
      })
      console.log(`Updated funnel ${funnel.id}: ${funnel.slug} → ${newSlug}`)
    }
  }
}

async function sanitizePageSlugs() {
  const pages = await prisma.page.findMany()
  
  for (const page of pages) {
    const newSlug = sanitizeSlug(page.slug)
    if (newSlug !== page.slug) {
      const uniqueSlug = await ensureUniquePageSlug(page.funnelId, newSlug)
      await prisma.page.update({
        where: { id: page.id },
        data: { slug: uniqueSlug }
      })
      console.log(`Updated page ${page.id}: ${page.slug} → ${uniqueSlug}`)
    }
  }
}
```

## Summary

### What Changed
1. ✅ Created `lib/utils/slug.ts` with comprehensive slug utilities
2. ✅ Updated `POST /api/funnels/[id]/pages` to use slug utilities
3. ✅ Updated `POST /api/funnels` to use slug utilities
4. ✅ Added uniqueness validation for both funnels and pages
5. ✅ Improved slug sanitization (accents, special chars, etc.)
6. ✅ Better error handling and validation

### Benefits
- 🎯 **No routing conflicts**: Guaranteed unique slugs
- 🌍 **International support**: Handles accents and non-ASCII characters
- 🔒 **URL-safe**: All slugs are valid URL components
- 🔧 **Maintainable**: Centralized slug logic
- 📝 **Better UX**: Meaningful error messages
- ⚡ **Performant**: Indexed database queries

### Breaking Changes
None. This is a backward-compatible improvement.

