import React, { useContext, useEffect, useState } from 'react'
import { ThemeContextValue } from '../types/component'

// Theme context (would be created in a separate provider)
const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined)

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  
  // Always call hooks at the top level
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    if (!context && theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      setResolvedTheme(mediaQuery.matches ? 'dark' : 'light')
      
      const handleChange = (e: MediaQueryListEvent) => {
        setResolvedTheme(e.matches ? 'dark' : 'light')
      }
      
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } else if (!context && theme !== 'system') {
      setResolvedTheme(theme as 'light' | 'dark')
    }
  }, [context, theme])

  if (!context) {
    // Fallback implementation when no provider is available
    return { theme, setTheme, resolvedTheme }
  }
  
  return context
} 