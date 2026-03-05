'use client'

import { createContext, useContext, useEffect, useLayoutEffect, useState, useCallback, useMemo } from 'react'
import { ThemeProvider, ridTheme } from '@/styles/themes'
import { applyAllThemeVars } from '@/styles/themes/css-vars'

// =============================================================================
// DARK PALETTE (Teams-like)
// =============================================================================

export const dark = {
  bg:          '#1F1F1F', // Main background
  bgSidebar:   '#1B1B1B', // Left rail (slightly darker)
  bgSurface:   '#2D2D2D', // Cards/Headers
  bgElevated:  '#2D2D2D', // Dropdowns/Modals
  bgInput:     '#292929', // Inputs
  bgHover:     '#3B3B3B', // List item hover
  bgActive:    '#484848', // Active state
  border:      '#3E3E3E', // Standard border
  borderSubtle:'#2D2D2D', // Subtle border
  text:        '#FFFFFF', // High emphasis
  textMuted:   '#D1D1D1', // Medium emphasis
  textFaint:   '#A1A1A1', // Low emphasis
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

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  )
}

// =============================================================================
// RID THEME APPLIER — sets CSS variables on :root immediately
// =============================================================================

function RIDThemeVars({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    applyAllThemeVars(ridTheme, document.documentElement)
  }, [])
  return <>{children}</>
}

// =============================================================================
// COMBINED PROVIDERS
// =============================================================================

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={ridTheme}>
      <RIDThemeVars>
        <DarkModeProvider>{children}</DarkModeProvider>
      </RIDThemeVars>
    </ThemeProvider>
  )
}
