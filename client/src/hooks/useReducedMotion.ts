import { useState, useEffect } from 'react'

export function useReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false)
  
  useEffect(() => {
    // Check for reduced motion preference on client side only
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])
  
  return reduceMotion
}
