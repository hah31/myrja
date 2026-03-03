'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface FeatureNavigationProps {
  currentSlug: string
  previousSlug: string | null
  nextSlug: string | null
  featureName: string
}

export default function FeatureNavigation({
  previousSlug,
  nextSlug,
  featureName,
}: FeatureNavigationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{
        marginTop: '4rem',
        paddingTop: '2rem',
        paddingBottom: '2rem',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.6rem',
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
      }}
    >
      {/* Previous button */}
      {previousSlug ? (
        <Link
          href={`/feature/${previousSlug}`}
          style={{
            color: 'rgba(255,255,255,0.35)',
            textDecoration: 'none',
            transition: 'color 0.3s',
            flex: 1,
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.color = '#e8e8f0'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)'
          }}
        >
          ← Previous
        </Link>
      ) : (
        <div style={{ flex: 1 }} />
      )}

      {/* Feature name center */}
      <div
        style={{
          flex: 1,
          textAlign: 'center',
          color: 'rgba(255,255,255,0.35)',
          fontSize: '0.55rem',
        }}
      >
        {featureName}
      </div>

      {/* Next button */}
      {nextSlug ? (
        <Link
          href={`/feature/${nextSlug}`}
          style={{
            color: 'rgba(255,255,255,0.35)',
            textDecoration: 'none',
            transition: 'color 0.3s',
            flex: 1,
            textAlign: 'right',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.color = '#e8e8f0'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)'
          }}
        >
          next →
        </Link>
      ) : (
        <div style={{ flex: 1 }} />
      )}
    </motion.div>
  )
}
