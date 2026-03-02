'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useAudio } from '@/context/AudioContext'
import { asset } from '@/lib/asset'

// Load R3F scene client-only (no SSR)
const LockScene = dynamic(() => import('@/components/LockScene'), {
  ssr: false,
  loading: () => <div style={{ width: '100%', height: '100%', background: '#050508' }} />,
})

const PASSWORD = 'nabeelhussain'

export default function LockPage() {
  const router = useRouter()
  const { unlock, play } = useAudio()
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [shaking, setShaking] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // If already unlocked, skip to home
    if (typeof window !== 'undefined' && localStorage.getItem('unlocked') === '1') {
      router.replace('/home')
    }
  }, [router])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (value.toLowerCase().trim() === PASSWORD) {
      // Correct — show the audio-consent modal instead of unlocking immediately.
      // The modal's Continue button will be the affirmative user gesture that
      // satisfies the browser's AudioContext autoplay policy.
      setSuccess(true)
      setShowModal(true)
    } else {
      setError(true)
      setShaking(true)
      setTimeout(() => setShaking(false), 600)
      setTimeout(() => setError(false), 2000)
    }
  }

  const handleContinue = async () => {
    // ── Synchronous AudioContext resume ────────────────────────────────────
    // Browsers require audio to be created/resumed directly inside a user-
    // gesture event handler (no async gap). We do that here before any await.
    try {
      const tmpCtx = new AudioContext()
      tmpCtx.resume()          // intentionally not awaited — just opens the gate
    } catch (_) {
      // AudioContext not available (e.g. very old browser) — continue anyway
    }

    // ── Unlock + play + navigate ───────────────────────────────────────────
    localStorage.setItem('unlocked', '1')
    await unlock()
    play(asset('/audio/track-a.mp3'), 'Track A')
    router.push('/home')
  }

  if (!mounted) return null

  return (
    <main
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#050508',
      }}
    >
      {/* ── 3D Background ─────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <LockScene />
      </div>

      {/* ── Blue bloom radial ─────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(30,58,138,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Dark bottom gradient ──────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to top, #050508 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* ── Centered password form ────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2.5rem',
          padding: '2rem',
        }}
      >
        {/* Logotype */}
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <p
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.55em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              marginBottom: '1rem',
            }}
          >
            An Editorial
          </p>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              letterSpacing: '0.35em',
              fontWeight: 300,
              textTransform: 'uppercase',
              color: '#e8e8f0',
              lineHeight: 1,
            }}
          >
            Welcome to MYRJA.
          </h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            width: '100%',
            maxWidth: 360,
          }}
        >
          <div
            style={{
              width: '100%',
              position: 'relative',
              animation: shaking ? 'shake 0.4s ease' : undefined,
            }}
          >
            <input
              type="password"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter password"
              autoComplete="off"
              spellCheck={false}
              style={{
                width: '100%',
                padding: '0.75rem 1.25rem',
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : success ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 4,
                fontSize: '0.9rem',
                letterSpacing: '0.12em',
                color: '#e8e8f0',
                outline: 'none',
                textAlign: 'center',
                transition: 'border-color 0.3s ease',
              }}
            />
          </div>

          {error && (
            <p
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(239,68,68,0.8)',
              }}
            >
              Incorrect
            </p>
          )}

          <button
            type="submit"
            disabled={success}
            style={{
              padding: '0.65rem 2.5rem',
              background: success ? 'rgba(59,130,246,0.15)' : 'transparent',
              border: `1px solid ${success ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.15)'}`,
              borderRadius: 4,
              fontSize: '0.65rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: success ? '#60a5fa' : 'rgba(255,255,255,0.6)',
              cursor: success ? 'default' : 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (!success) {
                e.currentTarget.style.borderColor = 'rgba(59,130,246,0.45)'
                e.currentTarget.style.color = '#e8e8f0'
              }
            }}
            onMouseLeave={(e) => {
              if (!success) {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
              }
            }}
          >
            {success ? 'Entering...' : 'Enter'}
          </button>
        </form>

        {/* Footer hint */}
        <p
          style={{
            position: 'absolute',
            bottom: '2rem',
            fontSize: '0.55rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.18)',
          }}
        >
          Private Access
        </p>
      </div>

      {/* ── Audio-consent modal ───────────────────────────────────────── */}
      {showModal && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(5,5,8,0.88)',
            backdropFilter: 'blur(8px)',
            animation: 'fadeIn 0.35s ease',
          }}
        >
          <p
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
              marginBottom: '2rem',
            }}
          >
            Audio will begin playing
          </p>

          <button
            onClick={handleContinue}
            autoFocus
            style={{
              padding: '0.65rem 2.5rem',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 4,
              fontSize: '0.65rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.6)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(59,130,246,0.45)'
              e.currentTarget.style.color = '#e8e8f0'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
            }}
          >
            Continue
          </button>
        </div>
      )}

      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%     { transform: translateX(-8px); }
          40%     { transform: translateX(8px); }
          60%     { transform: translateX(-5px); }
          80%     { transform: translateX(5px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </main>
  )
}
