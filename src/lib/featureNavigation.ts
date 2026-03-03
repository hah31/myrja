import { features } from '@/data/features'

/**
 * Get the index of a feature by its slug
 */
export function getFeatureIndex(slug: string): number | null {
  const index = features.findIndex((f) => f.slug === slug)
  return index >= 0 ? index : null
}

/**
 * Get the next feature slug with wrap-around behavior
 * Last feature wraps to first feature
 */
export function getNextFeatureSlug(currentSlug: string): string | null {
  const currentIndex = getFeatureIndex(currentSlug)
  if (currentIndex === null) return null

  const nextIndex = (currentIndex + 1) % features.length
  return features[nextIndex].slug
}

/**
 * Get the previous feature slug with wrap-around behavior
 * First feature wraps to last feature
 */
export function getPreviousFeatureSlug(currentSlug: string): string | null {
  const currentIndex = getFeatureIndex(currentSlug)
  if (currentIndex === null) return null

  const prevIndex = (currentIndex - 1 + features.length) % features.length
  return features[prevIndex].slug
}

/**
 * Get a feature by its index
 */
export function getFeatureByIndex(index: number) {
  if (index < 0 || index >= features.length) return null
  return features[index]
}
