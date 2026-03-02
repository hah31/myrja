'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useAudio } from '@/context/AudioContext'
import { asset } from '@/lib/asset'
import { features } from '@/data/features'
import FrameSequence from '@/components/FrameSequence'
import RouteGuard from '@/components/RouteGuard'

const FRAME_COUNT = 68
const FRAME_PREFIX = '/frames/home/ezgif-frame-'
const TRACK_A_SRC = '/audio/track-a.mp3'

export default function HomePage() {
  const { play, unlocked } = useAudio()
  const router = useRouter()

  // Scroll-based transforms.
  //
  // Page layout (500 vh container, viewport = 100 vh, max-scroll = 400 vh):
  //   ┌ Hero sticky  100 vh   → scroll  0–100 vh   (progress 0–0.25)
  //   ├ Spacer       160 vh
  //   ├ Nav sticky   100 vh   → enters viewport at scroll 260 vh
  //   │                         progress = 260/400 = 0.65
  //   └ Buffer       100 vh
  //
  // Hero fades out quickly in the first ~10% of scroll.
  // Nav fades in right as its sticky section first appears (~progress 0.65).
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])
  const heroY       = useTransform(scrollYProgress, [0, 0.15], [0, -60])

  // Play Track A (or resume if already playing it)
  useEffect(() => {
    if (unlocked) {
      play(asset(TRACK_A_SRC), 'Track A')
    }
  }, [unlocked, play])

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('unlocked')
    router.push('/')
  }

  return (
    <RouteGuard>
      <div style={{ position: 'relative', background: '#050508' }}>
        {/* ── Fixed frame-sequence background ─────────── */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
          }}
        >
          <FrameSequence
            frameCount={FRAME_COUNT}
            framePrefix={FRAME_PREFIX}
            frameExt=".jpg"
            framePad={3}
            fallbackFrame={1}
            className="w-full h-full"
          />
        </div>

        {/* ── Fixed dark gradient overlays ─────────────── */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1,
            background:
              'linear-gradient(to bottom, rgba(5,5,8,0.55) 0%, transparent 35%, transparent 65%, rgba(5,5,8,0.75) 100%)',
            pointerEvents: 'none',
          }}
        />
        {/* Blue bloom center */}
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: '70vmax',
            height: '70vmax',
            transform: 'translate(-50%,-50%)',
            background:
              'radial-gradient(circle, rgba(30,58,138,0.12) 0%, transparent 65%)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* ── Scrollable content (drives the frame sequence) ── */}
        {/* 500vh gives plenty of scroll to play all 68 frames */}
        <div style={{ position: 'relative', zIndex: 10, height: '500vh' }}>
          {/* ── Logout button (fixed top-right) ─────────── */}
          <div style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 100 }}>
            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 4,
                padding: '0.45rem 1rem',
                fontSize: '0.55rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.35)'
              }}
            >
              Exit
            </button>
          </div>

          {/* ── Hero section (sticky in first viewport) ── */}
          <div
            style={{
              position: 'sticky',
              top: 0,
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <motion.div
              style={{ opacity: heroOpacity, y: heroY, textAlign: 'center' }}
            >
              <p
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.55em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.28)',
                  marginBottom: '1.5rem',
                }}
              >
                MYRJA X ARK DROPPING SOON
              </p>
              <h1
                style={{
                  fontSize: 'clamp(3rem, 10vw, 9rem)',
                  letterSpacing: '0.38em',
                  fontWeight: 300,
                  textTransform: 'uppercase',
                  color: '#e8e8f0',
                  lineHeight: 1,
                  textShadow: '0 0 80px rgba(30,58,138,0.4)',
                }}
              >
                MYRJAAA
                <br />
                BAIIIG
              </h1>
              <p
                style={{
                  marginTop: '2rem',
                  fontSize: '0.6rem',
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.22)',
                }}
              >
                Scroll to explore
              </p>
            </motion.div>
          </div>

          {/* ── Spacer (frames play through here) ──────── */}
          <div style={{ height: '160vh' }} />

          {/* ── Feature navigation (appears mid-scroll) ── */}
          <div
            style={{
              position: 'sticky',
              top: 0,
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 40, damping: 15 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            >
              <p
                style={{
                  textAlign: 'center',
                  fontSize: '0.58rem',
                  letterSpacing: '0.5em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.28)',
                  marginBottom: '3rem',
                }}
              >
                Select Chapter
              </p>

              <nav
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1.5rem',
                  maxWidth: 560,
                }}
              >
                {features.map((feature, i) => {
                  const itemCount = features.length
                  const reverseIndex = itemCount - 1 - i
                  return (
                  <motion.div
                    key={feature.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 60, damping: 12, delay: reverseIndex * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={`/feature/${feature.slug}`}
                      style={{ display: 'block', textDecoration: 'none' }}
                    >
                      <div
                        style={{
                          padding: '1.5rem',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: 4,
                          background: 'rgba(5,5,14,0.4)',
                          backdropFilter: 'blur(8px)',
                          transition: 'all 0.35s ease',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget
                          el.style.borderColor = 'rgba(59,130,246,0.3)'
                          el.style.background = 'rgba(30,58,138,0.15)'
                          el.style.boxShadow = '0 0 30px rgba(59,130,246,0.1)'
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget
                          el.style.borderColor = 'rgba(255,255,255,0.08)'
                          el.style.background = 'rgba(5,5,14,0.4)'
                          el.style.boxShadow = 'none'
                        }}
                      >
                        <p
                          style={{
                            fontSize: '0.55rem',
                            letterSpacing: '0.4em',
                            textTransform: 'uppercase',
                            color: 'rgba(59,130,246,0.6)',
                            marginBottom: '0.6rem',
                          }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </p>
                        <h2
                          style={{
                            fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                            letterSpacing: '0.2em',
                            fontWeight: 300,
                            textTransform: 'uppercase',
                            color: '#e8e8f0',
                            marginBottom: '0.5rem',
                          }}
                        >
                          {feature.name}
                        </h2>
                        {feature.subtitle && (
                          <p
                            style={{
                              fontSize: '0.6rem',
                              letterSpacing: '0.15em',
                              color: 'rgba(255,255,255,0.3)',
                              fontStyle: 'italic',
                            }}
                          >
                            {feature.subtitle}
                          </p>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                  )
                })}
              </nav>
            </motion.div>
          </div>

          {/* ── Bottom buffer ────────────────────────────── */}
          <div style={{ height: '100vh' }} />
        </div>
      </div>
    </RouteGuard>
  )
}
