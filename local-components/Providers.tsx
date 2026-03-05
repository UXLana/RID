'use client'

import { createContext, useContext, useEffect, useLayoutEffect, useState, useCallback, useMemo } from 'react'
import { ThemeProvider, ridTheme } from '@/styles/themes'
import { applyAllThemeVars } from '@/styles/themes/css-vars'
import { microsoftDarkTheme } from './microsoft-dark-theme'

// =============================================================================
// DARK PALETTE (Teams-like) — used by local components for inline styles
// =============================================================================

export const dark = {
  bg:          '#1F1F1F',
  bgSidebar:   '#1B1B1B',
  bgSurface:   '#2D2D2D',
  bgElevated:  '#2D2D2D',
  bgInput:     '#292929',
  bgHover:     '#3B3B3B',
  bgActive:    '#484848',
  border:      '#3E3E3E',
  borderSubtle:'#2D2D2D',
  text:        '#FFFFFF',
  textMuted:   '#D1D1D1',
  textFaint:   '#A1A1A1',
}

// =============================================================================
// DARK MODE CONTEXT
// =============================================================================

interface DarkModeContextValue {
  isDark: boolean
  toggle: () => void
}

const DarkModeContext = createContext<DarkModeContextValue>({
  isDark: false,
  toggle: () => {},
})

export function useDarkMode() {
  return useContext(DarkModeContext)
}

function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('rid-dark-mode')
    if (stored === 'true') setIsDark(true)
  }, [])

  useEffect(() => {
    localStorage.setItem('rid-dark-mode', String(isDark))
    document.documentElement.setAttribute('data-dark', String(isDark))
  }, [isDark])

  const toggle = useCallback(() => setIsDark((v) => !v), [])
  const value = useMemo(() => ({ isDark, toggle }), [isDark, toggle])

  const activeTheme = isDark ? microsoftDarkTheme : ridTheme

  useLayoutEffect(() => {
    applyAllThemeVars(activeTheme, document.documentElement)
  }, [activeTheme])

  return (
    <DarkModeContext.Provider value={value}>
      <ThemeProvider theme={activeTheme}>
        {children}
      </ThemeProvider>
    </DarkModeContext.Provider>
  )
}

// =============================================================================
// COMBINED PROVIDERS
// =============================================================================

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DarkModeProvider>{children}</DarkModeProvider>
  )
}
