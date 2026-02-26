'use client'

import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface RouteGuardProps {
  children: ReactNode
}

/**
 * Redirects to "/" if the "unlocked" flag is not set in localStorage.
 * Used on /home and /feature/* pages.
 */
export default function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const unlocked = localStorage.getItem('unlocked')
    if (unlocked !== '1') {
      router.replace('/')
    }
  }, [router])

  // Always render children; the redirect happens async.
  // The lock page is lightweight so the flash is minimal.
  return <>{children}</>
}
