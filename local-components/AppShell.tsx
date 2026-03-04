'use client'

import React from 'react'
import AppHeader from './AppHeader'
import Sidebar from './Sidebar'
import { useDarkMode, dark } from './Providers'
import { colors } from '@/styles/design-tokens'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { isDark } = useDarkMode()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: isDark ? dark.bg : colors.surface.light,
        color: isDark ? dark.text : colors.text.highEmphasis.onLight,
        transition: 'background-color 0.2s ease, color 0.2s ease',
      }}
    >
      <AppHeader />
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <Sidebar />
        <main
          style={{
            flex: 1,
            overflow: 'auto',
            minWidth: 0,
            backgroundColor: isDark ? dark.bgSurface : colors.surface.lightDarker,
            transition: 'background-color 0.2s ease',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
