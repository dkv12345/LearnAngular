// classes/SlugHelper.ts

// Function to sanitize text to SEO-friendly slug string
export function sanitizeSlug(text: string): string {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove Vietnamese accents
    .replace(/[^a-z0-9]+/g, '-') // Replace special characters with hyphens
    .replace(/(^-|-$)+/g, ''); // Trim leading and trailing hyphens
}

// Function to generate a Product Slug (Format: product-name-p1)
export function createSlug(name: string, id: number): string {
  const sanitizedName = sanitizeSlug(name);
  return `${sanitizedName}-p${id}`;
}

// Function to generate a Fashion Slug (Format: fashion-subject-f1)
export function createFashionSlug(subject: string, idF: number): string {
  const sanitizedSubject = sanitizeSlug(subject);
  return `${sanitizedSubject}-f${idF}`;
}

// Function to extract numeric ID from a Slug (supports -p{id}, -f{id}, or -{id})
export function extractIdFromSlug(slug: string): number | null {
  if (!slug) return null;
  const match = slug.match(/-(?:p|f)?(\d+)$/i);
  return match ? parseInt(match[1], 10) : null;
}

// Dedicated function to extract IdF from Fashion slug
export function extractFashionIdFromSlug(slug: string): number | null {
  return extractIdFromSlug(slug);
}

// Function to determine the identifier type provided in the URL
export function getIdentityType(identity: string): 'ID' | 'SLUG_WITH_ID' | 'PURE_SLUG' {
  if (!identity) return 'PURE_SLUG';

  // 1. Check if it is a pure number (e.g., "1")
  if (!isNaN(Number(identity))) {
    return 'ID';
  }

  // 2. Check if it contains an ID suffix (e.g., "-p1", "-f1", "-1")
  const match = identity.match(/-(?:p|f)?(\d+)$/i);
  if (match && !isNaN(Number(match[1]))) {
    return 'SLUG_WITH_ID';
  }

  // 3. Otherwise, treat it as a pure text slug
  return 'PURE_SLUG';
}
