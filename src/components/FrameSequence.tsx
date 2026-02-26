'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { asset } from '@/lib/asset'

interface FrameSequenceProps {
  /** Total number of frames */
  frameCount: number
  /** e.g. '/frames/home/ezgif-frame-' */
  framePrefix: string
  /** e.g. '.jpg' */
  frameExt?: string
  /** Number of zero-padding digits (3 → '001') */
  framePad?: number
  /** Fallback frame index (1-based) shown when reduced-motion is on or frames fail */
  fallbackFrame?: number
  className?: string
}

export default function FrameSequence({
  frameCount,
  framePrefix,
  frameExt = '.jpg',
  framePad = 3,
  fallbackFrame = 1,
  className = '',
}: FrameSequenceProps) {
  const imgRef = useRef<HTMLImageElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const currentIndexRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  const [loadedCount, setLoadedCount] = useState(0)
  const [ready, setReady] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  // ── Generate frame URL list (no filesystem reads) ─────────────────────────
  const frameUrls = useMemo(() => {
    return Array.from({ length: frameCount }, (_, i) => {
      const num = String(i + 1).padStart(framePad, '0')
      return asset(`${framePrefix}${num}${frameExt}`)
    })
  }, [frameCount, framePrefix, frameExt, framePad])

  // ── Detect prefers-reduced-motion ────────────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // ── Preload all frames ────────────────────────────────────────────────────
  useEffect(() => {
    if (reducedMotion) {
      // Show fallback frame immediately
      if (imgRef.current) {
        imgRef.current.src = frameUrls[Math.min(fallbackFrame - 1, frameUrls.length - 1)]
      }
      setReady(true)
      return
    }

    let finished = 0
    const total = frameUrls.length
    const images: HTMLImageElement[] = []

    frameUrls.forEach((url, i) => {
      const img = new window.Image()
      img.decoding = 'async'
      img.onload = img.onerror = () => {
        finished++
        setLoadedCount(finished)
        if (finished === total) {
          setReady(true)
        }
      }
      img.src = url
      images[i] = img
    })

    framesRef.current = images

    return () => {
      // Release on unmount
      images.forEach((img) => { img.src = '' })
    }
  }, [frameUrls, fallbackFrame, reducedMotion])

  // ── Set initial frame when ready ─────────────────────────────────────────
  useEffect(() => {
    if (!ready || !imgRef.current) return
    const firstFrame = framesRef.current[0]
    if (firstFrame?.src) imgRef.current.src = firstFrame.src
  }, [ready])

  // ── Scroll → frame index ──────────────────────────────────────────────────
  useEffect(() => {
    if (!ready || reducedMotion) return

    const updateFrame = () => {
      const scrolled = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? Math.min(Math.max(scrolled / maxScroll, 0), 1) : 0
      const idx = Math.round(progress * (frameCount - 1))

      if (idx !== currentIndexRef.current) {
        currentIndexRef.current = idx
        const frame = framesRef.current[idx]
        if (imgRef.current && frame?.complete && frame.src) {
          imgRef.current.src = frame.src
        }
      }
    }

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updateFrame)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateFrame() // sync on mount

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [ready, reducedMotion, frameCount])

  const progress = frameCount > 0 ? loadedCount / frameCount : 0

  return (
    <div
      className={className}
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}
    >
      {/* ── Loading bar ───────────────────────────────── */}
      {!ready && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#050508',
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: '120px',
              height: '1px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 4,
              overflow: 'hidden',
              marginBottom: '1rem',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${Math.round(progress * 100)}%`,
                background: 'rgba(59,130,246,0.7)',
                transition: 'width 0.1s linear',
              }}
            />
          </div>
          <p
            style={{
              fontSize: '0.55rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)',
            }}
          >
            {Math.round(progress * 100)}%
          </p>
        </div>
      )}

      {/* ── Frame image ───────────────────────────────── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />
    </div>
  )
}
