import { prisma } from '@/lib/prisma'

/**
 * Sanitizes a string to create a URL-safe slug
 * Handles special characters, accents, and ensures proper formatting
 * 
 * @param input - The string to convert to a slug
 * @returns A sanitized, URL-safe slug
 * 
 * @example
 * sanitizeSlug("Hello & World!") // "hello-world"
 * sanitizeSlug("Café Münchën") // "cafe-munchen"
 * sanitizeSlug("  Multiple   Spaces  ") // "multiple-spaces"
 */
export function sanitizeSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    // Remove accents and diacritics (e.g., é -> e, ñ -> n)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Replace spaces and underscores with hyphens
    .replace(/[\s_]+/g, '-')
    // Remove all non-alphanumeric characters except hyphens
    .replace(/[^a-z0-9-]/g, '')
    // Replace multiple consecutive hyphens with a single hyphen
    .replace(/-+/g, '-')
    // Remove leading and trailing hyphens
    .replace(/^-+|-+$/g, '')
}

/**
 * Ensures slug uniqueness for pages within a funnel by appending a number if needed
 * 
 * @param funnelId - The ID of the funnel to check uniqueness within
 * @param baseSlug - The base slug to make unique
 * @returns A unique slug (may have a number appended)
 * 
 * @example
 * // If "home" exists, returns "home-1"
 * // If "home-1" also exists, returns "home-2"
 */
export async function ensureUniquePageSlug(
  funnelId: string,
  baseSlug: string
): Promise<string> {
  let uniqueSlug = baseSlug
  let counter = 1

  // Check if slug already exists in this funnel
  while (true) {
    const existing = await prisma.page.findFirst({
      where: {
        funnelId,
        slug: uniqueSlug,
      },
    })

    if (!existing) {
      // Slug is unique, we can use it
      break
    }

    // Slug exists, append counter and try again
    uniqueSlug = `${baseSlug}-${counter}`
    counter++
  }

  return uniqueSlug
}

/**
 * Ensures slug uniqueness for funnels globally by appending a number if needed
 * 
 * @param baseSlug - The base slug to make unique
 * @returns A unique slug (may have a number appended)
 * 
 * @example
 * // If "sales-funnel" exists, returns "sales-funnel-1"
 */
export async function ensureUniqueFunnelSlug(baseSlug: string): Promise<string> {
  let uniqueSlug = baseSlug
  let counter = 1

  // Check if slug already exists
  while (true) {
    const existing = await prisma.funnel.findUnique({
      where: { slug: uniqueSlug },
    })

    if (!existing) {
      // Slug is unique, we can use it
      break
    }

    // Slug exists, append counter and try again
    uniqueSlug = `${baseSlug}-${counter}`
    counter++
  }

  return uniqueSlug
}

/**
 * Generates a unique slug for a funnel from a name
 * 
 * @param name - The funnel name
 * @param providedSlug - Optional custom slug (will be sanitized)
 * @returns A unique, sanitized slug
 */
export async function generateUniqueFunnelSlug(
  name: string,
  providedSlug?: string
): Promise<string> {
  const baseSlug = providedSlug 
    ? sanitizeSlug(providedSlug) 
    : sanitizeSlug(name)
  
  if (!baseSlug) {
    throw new Error('Unable to generate a valid slug from the provided name or slug')
  }

  return ensureUniqueFunnelSlug(baseSlug)
}

/**
 * Generates a unique slug for a page within a funnel
 * 
 * @param funnelId - The ID of the funnel the page belongs to
 * @param name - The page name
 * @param providedSlug - Optional custom slug (will be sanitized)
 * @returns A unique, sanitized slug
 */
export async function generateUniquePageSlug(
  funnelId: string,
  name: string,
  providedSlug?: string
): Promise<string> {
  const baseSlug = providedSlug 
    ? sanitizeSlug(providedSlug) 
    : sanitizeSlug(name)
  
  if (!baseSlug) {
    throw new Error('Unable to generate a valid slug from the provided name or slug')
  }

  return ensureUniquePageSlug(funnelId, baseSlug)
}

