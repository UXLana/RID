'use client'

import React from 'react'
import {
  colors,
  typography,
  spacing,
  borderRadius,
} from '@/styles/design-tokens'
import { Construction } from 'lucide-react'
import { useDarkMode, dark } from '@/local-components/Providers'

interface ComingSoonProps {
  title: string
  description?: string
  icon?: React.ReactNode
}

export default function ComingSoon({ 
  title, 
  description = "This feature is currently under development.", 
  icon 
}: ComingSoonProps) {
  const { isDark } = useDarkMode()
  
  const textHigh = isDark ? dark.text : colors.text.highEmphasis.onLight
  const textLow = isDark ? dark.textMuted : colors.text.lowEmphasis.onLight
  const bg = isDark ? dark.bgElevated : colors.surface.light

  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%', 
        minHeight: '60vh',
        padding: spacing.xl,
        textAlign: 'center'
      }}
    >
      <div 
        style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '64px',
          height: '64px',
          borderRadius: borderRadius.full,
          backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : colors.surface.lightDarker,
          marginBottom: spacing.md,
          color: isDark ? dark.textMuted : colors.icon.enabled.onLight
        }}
      >
        {icon || <Construction size={32} />}
      </div>
      
      <h1 
        style={{ 
          ...typography.heading.h3, 
          color: textHigh, 
          marginBottom: spacing.sm 
        }}
      >
        {title}
      </h1>
      
      <p 
        style={{ 
          ...typography.body.md, 
          color: textLow, 
          maxWidth: '480px' 
        }}
      >
        {description}
      </p>
    </div>
  )
}
