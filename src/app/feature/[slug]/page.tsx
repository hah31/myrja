import { features } from '@/data/features'
import FeaturePageClient from './FeaturePageClient'
import { notFound } from 'next/navigation'

// Required for Next.js static export with dynamic routes
export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }))
}

interface PageProps {
  params: { slug: string }
}

export default function FeaturePage({ params }: PageProps) {
  const feature = features.find((f) => f.slug === params.slug)
  if (!feature) return notFound()
  return <FeaturePageClient feature={feature} />
}
