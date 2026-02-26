/**
 * Resolve a public asset URL.
 *
 * The site is served from the domain root (myrja.com/) so no basePath prefix
 * is required. NEXT_PUBLIC_BASE_PATH is intentionally absent from next.config.js,
 * so `base` is always '' and this returns the path unchanged.
 *
 * If a subdirectory basePath is ever reintroduced, set NEXT_PUBLIC_BASE_PATH
 * in next.config.js `env` and all asset URLs will pick it up automatically.
 */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}
