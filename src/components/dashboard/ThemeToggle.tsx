'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '../../providers/ThemeProvider'
import { Button } from '../ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <Button
      variant="outline" size="icon" className="h-9 w-9"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 2.22a1 1 0 011.42 1.42l-.71.7a1 1 0 11-1.41-1.41l.7-.71zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zm-2.22 4.22a1 1 0 010 1.42l-.7.71a1 1 0 11-1.42-1.42l.71-.7a1 1 0 011.41 0zM10 17a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zM5.78 15.78a1 1 0 01-1.42 0l-.71-.7a1 1 0 011.42-1.42l.7.71a1 1 0 010 1.41zM4 10a1 1 0 01-1 1H2a1 1 0 110-2h1a1 1 0 011 1zm1.78-5.78a1 1 0 010-1.41l.71-.7A1 1 0 117.9 3.52l-.7.71a1 1 0 01-1.42 0zM10 7a3 3 0 100 6 3 3 0 000-6z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </Button>
  )
}

