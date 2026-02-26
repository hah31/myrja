'use client'

import { useAudio } from '@/context/AudioContext'
import { useState } from 'react'

export default function MiniPlayer() {
  const { playing, muted, volume, trackTitle, unlocked, togglePlay, toggleMute, setVolume } =
    useAudio()
  const [expanded, setExpanded] = useState(false)

  if (!unlocked) return null

  return (
    <div
      className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-2"
      style={{ fontFamily: 'Georgia, serif' }}
    >
      {/* Expanded panel */}
      {expanded && (
        <div
          className="flex flex-col gap-3 px-4 py-4 rounded-lg"
          style={{
            background: 'rgba(5, 5, 14, 0.88)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(59, 130, 246, 0.18)',
            minWidth: 200,
            boxShadow: '0 0 30px rgba(30, 64, 175, 0.2)',
          }}
        >
          {/* Track title */}
          <p
            className="text-center"
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            {trackTitle || '—'}
          </p>

          {/* Controls row */}
          <div className="flex items-center justify-center gap-4">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              aria-label={playing ? 'Pause' : 'Play'}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#e2e2e8',
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {playing ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="2" y="2" width="4" height="12" rx="1" />
                  <rect x="10" y="2" width="4" height="12" rx="1" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M3 2l10 6-10 6V2z" />
                </svg>
              )}
            </button>

            {/* Mute */}
            <button
              onClick={toggleMute}
              aria-label={muted ? 'Unmute' : 'Mute'}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: muted ? 'rgba(59,130,246,0.5)' : '#e2e2e8',
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {muted ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              )}
            </button>
          </div>

          {/* Volume slider */}
          <div className="flex items-center gap-2">
            <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
              VOL
            </span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              style={{
                flex: 1,
                accentColor: '#3b82f6',
                cursor: 'pointer',
              }}
              aria-label="Volume"
            />
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setExpanded((v) => !v)}
        aria-label="Toggle audio player"
        style={{
          background: 'rgba(5, 5, 14, 0.88)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(59, 130, 246, 0.22)',
          borderRadius: '50%',
          width: 44,
          height: 44,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: playing ? '#3b82f6' : 'rgba(255,255,255,0.5)',
          boxShadow: playing ? '0 0 16px rgba(59,130,246,0.25)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      </button>
    </div>
  )
}
