'use client'

import { ReactNode } from 'react'
import { AudioProvider } from '@/context/AudioContext'
import MiniPlayer from '@/components/MiniPlayer'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AudioProvider>
      {children}
      <MiniPlayer />
      {/* Grain texture overlay */}
      <div className="grain-overlay" aria-hidden="true" />
      {/* Vignette */}
      <div className="vignette" aria-hidden="true" />
    </AudioProvider>
  )
}
