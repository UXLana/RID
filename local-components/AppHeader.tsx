'use client'

import React from 'react'
import { Button } from 'mtr-design-system/components'
import { ChevronDown } from 'lucide-react'
import {
  colors,
  fontFamilies,
  fontWeights,
  spacing,
  borderRadius,
  header,
} from '@/styles/design-tokens'
import { useDarkMode, dark } from './Providers'

interface AppHeaderProps {
  orgName?: string
  userInitials?: string
}

export default function AppHeader({
  orgName = 'Holistic Industries',
  userInitials = 'JB',
}: AppHeaderProps) {
  const { isDark } = useDarkMode()

  return (
    <header
      role="banner"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: header.height,
        padding: `0 ${spacing.xl}`,
        backgroundColor: isDark ? dark.bgSidebar : colors.brand.darker,
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        fontFamily: fontFamilies.body,
        boxSizing: 'border-box',
        flexShrink: 0,
        transition: 'background-color 0.2s ease',
      }}
    >
      {/* Left — Logo */}
      <img
        src="/metrc-logo.png"
        alt="Metrc Retail ID"
        style={{
          height: '36px',
          width: 'auto',
        }}
      />

      {/* Right — Org + Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
        <Button
          emphasis="low"
          onDark
          size="md"
          rightIcon={<ChevronDown size={16} />}
          style={{
            color: 'rgba(255, 255, 255, 0.85)',
            fontWeight: fontWeights.regular,
            padding: `4px ${spacing.xs}`,
            height: '32px',
            minWidth: 0,
          }}
        >
          {orgName}
        </Button>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: borderRadius.full,
            backgroundColor: colors.brand.default,
            color: colors.text.highEmphasis.onDark,
            fontSize: '12px',
            fontWeight: fontWeights.semibold,
            letterSpacing: '0.3px',
            flexShrink: 0,
          }}
        >
          {userInitials}
        </div>
      </div>
    </header>
  )
}
