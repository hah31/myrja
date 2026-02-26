/**
 * Prepend the basePath to all public asset URLs.
 * In production (GitHub Pages /myrja), NEXT_PUBLIC_BASE_PATH = "/myrja".
 * In development, it is an empty string, so paths work as-is.
 */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}
