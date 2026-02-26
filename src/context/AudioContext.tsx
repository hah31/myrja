'use client'

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react'

interface AudioContextValue {
  playing: boolean
  muted: boolean
  volume: number
  trackTitle: string
  unlocked: boolean
  unlock: () => void
  play: (src: string, title: string) => void
  togglePlay: () => void
  toggleMute: () => void
  setVolume: (v: number) => void
}

const AudioCtx = createContext<AudioContextValue | null>(null)

const FADE_MS = 700

export function AudioProvider({ children }: { children: ReactNode }) {
  // Refs for mutable audio state (avoids stale closure issues in callbacks)
  const HowlRef = useRef<any>(null)      // Howl class (loaded dynamically)
  const howlRef = useRef<any>(null)      // current Howl instance
  const currentSrcRef = useRef('')
  const unlockedRef = useRef(false)
  const volumeRef = useRef(0.7)
  const mutedRef = useRef(false)

  // UI state
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolumeState] = useState(0.7)
  const [trackTitle, setTrackTitle] = useState('')
  const [unlocked, setUnlocked] = useState(false)

  // Dynamically import Howler to avoid SSR issues
  useEffect(() => {
    import('howler').then((m) => {
      HowlRef.current = m.Howl
    })
  }, [])

  // Restore unlock state from a previous session (page refresh / direct URL).
  // This shows the MiniPlayer without forcing auto-play — the browser's
  // autoplay policy still applies; the user can click play in the MiniPlayer.
  useEffect(() => {
    if (localStorage.getItem('unlocked') === '1') {
      unlockedRef.current = true
      setUnlocked(true)
    }
  }, [])

  const unlock = useCallback(() => {
    unlockedRef.current = true
    setUnlocked(true)
  }, [])

  const play = useCallback((src: string, title: string) => {
    if (!unlockedRef.current || !HowlRef.current) return
    // Don't restart the same track
    if (currentSrcRef.current === src) return

    const HowlClass = HowlRef.current
    const old = howlRef.current

    const newHowl = new HowlClass({
      src: [src],
      loop: true,
      volume: 0,
      html5: true,
      mute: mutedRef.current,
    })

    if (old) {
      const curVol = old.volume ? old.volume() : volumeRef.current
      old.fade(curVol, 0, FADE_MS)
      setTimeout(() => { try { old.unload() } catch (_) {} }, FADE_MS + 200)
    }

    newHowl.play()
    newHowl.fade(0, mutedRef.current ? 0 : volumeRef.current, FADE_MS)
    howlRef.current = newHowl
    currentSrcRef.current = src

    setPlaying(true)
    setTrackTitle(title)
  }, [])

  const togglePlay = useCallback(() => {
    const howl = howlRef.current
    if (!howl) return
    if (howl.playing()) {
      howl.pause()
      setPlaying(false)
    } else {
      howl.play()
      setPlaying(true)
    }
  }, [])

  const toggleMute = useCallback(() => {
    const newMuted = !mutedRef.current
    mutedRef.current = newMuted
    setMuted(newMuted)
    if (howlRef.current) {
      howlRef.current.mute(newMuted)
    }
  }, [])

  const setVolume = useCallback((v: number) => {
    volumeRef.current = v
    setVolumeState(v)
    if (howlRef.current && !mutedRef.current) {
      howlRef.current.volume(v)
    }
  }, [])

  return (
    <AudioCtx.Provider
      value={{
        playing,
        muted,
        volume,
        trackTitle,
        unlocked,
        unlock,
        play,
        togglePlay,
        toggleMute,
        setVolume,
      }}
    >
      {children}
    </AudioCtx.Provider>
  )
}

export function useAudio(): AudioContextValue {
  const ctx = useContext(AudioCtx)
  if (!ctx) throw new Error('useAudio must be used within AudioProvider')
  return ctx
}
