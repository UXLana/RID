'use client'

import React, { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  colors,
  fontFamilies,
  fontWeights,
  sidebar,
  spacing,
  borderRadius,
  transitionPresets,
  typography,
} from '@/styles/design-tokens'
import {
  Package,
  Printer,
  Settings,
  LayoutTemplate,
  Tag,
  Moon,
  Sun,
} from 'lucide-react'
import { useDarkMode, dark } from './Providers'

interface NavItem {
  id: string
  label: string
  href: string
  icon: React.ReactNode
}

function NavItemButton({
  item,
  isActive,
  onClick,
  isDark,
}: {
  item: NavItem
  isActive: boolean
  onClick: () => void
  isDark: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)

  const getBg = () => {
    if (isActive) return isDark ? dark.bgActive : sidebar.colors.item.active.background
    if (isHovered) return isDark ? dark.bgHover : sidebar.colors.item.hover.background
    return 'transparent'
  }

  const getTextColor = () => {
    if (isActive) return isDark ? dark.text : sidebar.colors.item.active.text
    if (isHovered) return isDark ? dark.textMuted : sidebar.colors.item.hover.text
    return isDark ? dark.textMuted : sidebar.colors.item.default.text
  }

  const getIconColor = () => {
    if (isActive) return isDark ? '#fff' : sidebar.colors.item.active.icon
    if (isHovered) return isDark ? dark.text : sidebar.colors.item.hover.icon
    return isDark ? dark.textMuted : sidebar.colors.item.default.icon
  }

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={item.label}
      aria-current={isActive ? 'page' : undefined}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: `${spacing.sm} 0`,
        gap: spacing['2xs'],
        backgroundColor: getBg(),
        color: getTextColor(),
        border: 'none',
        borderRadius: borderRadius.sm,
        cursor: 'pointer',
        transition: `all ${transitionPresets.default}`,
        outline: 'none',
        fontFamily: fontFamilies.body,
        position: 'relative',
      }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          borderRadius: borderRadius.lg,
          backgroundColor: isActive ? (isDark ? '#5AAE90' : colors.brand.darker) : 'transparent',
          color: isActive ? '#fff' : getIconColor(),
          transition: `all ${transitionPresets.default}`,
        }}
      >
        {item.icon}
      </span>
      <span
        style={{
          ...typography.body.xs,
          fontWeight: isActive ? fontWeights.medium : fontWeights.regular,
          lineHeight: '14px',
          color: getTextColor(),
        }}
      >
        {item.label}
      </span>
    </button>
  )
}

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { isDark, toggle } = useDarkMode()

  const mainItems: NavItem[] = [
    { id: 'products', label: 'Products', href: '/products', icon: <Tag size={22} /> },
    { id: 'packages', label: 'Packages', href: '/', icon: <Package size={22} /> },
    { id: 'templates', label: 'Templates', href: '/templates', icon: <LayoutTemplate size={22} /> },
    { id: 'print-jobs', label: 'Print Jobs', href: '/print-jobs', icon: <Printer size={22} /> },
  ]

  const footerItems: NavItem[] = [
    { id: 'admin', label: 'Admin', href: '/admin', icon: <Settings size={22} /> },
  ]

  const isActive = (item: NavItem) =>
    item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)

  return (
    <nav
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: sidebar.collapsedWidth,
        height: '100%',
        backgroundColor: isDark ? dark.bgSidebar : colors.surface.light,
        borderRight: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
        flexShrink: 0,
        overflow: 'hidden',
        transition: 'background-color 0.2s ease',
        padding: `0 ${spacing.xs}`,
        boxSizing: 'content-box',
      }}
    >
      {/* Main Navigation */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          paddingTop: spacing.md,
          overflowY: 'auto',
          overflowX: 'hidden',
          gap: spacing.xs,
        }}
      >
        {mainItems.map((item) => (
          <NavItemButton
            key={item.id}
            item={item}
            isActive={isActive(item)}
            onClick={() => router.push(item.href)}
            isDark={isDark}
          />
        ))}
      </div>

      {/* Footer: Dark mode toggle + Admin */}
      <div
        style={{
          marginTop: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: spacing.xs,
        }}
      >
        {/* Dark mode toggle */}
        <button
          type="button"
          onClick={toggle}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: `${spacing.sm} 0`,
            gap: spacing['2xs'],
            backgroundColor: 'transparent',
            color: isDark ? dark.textMuted : colors.text.lowEmphasis.onLight,
            border: 'none',
            cursor: 'pointer',
            transition: `all ${transitionPresets.default}`,
            outline: 'none',
            fontFamily: fontFamilies.body,
          }}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: borderRadius.lg,
            }}
          >
            {isDark ? <Sun size={22} /> : <Moon size={22} />}
          </span>
          <span style={{ ...typography.body.xs, lineHeight: '14px' }}>
            {isDark ? 'Light' : 'Dark'}
          </span>
        </button>

        {footerItems.map((item) => (
          <NavItemButton
            key={item.id}
            item={item}
            isActive={isActive(item)}
            onClick={() => router.push(item.href)}
            isDark={isDark}
          />
        ))}
      </div>
    </nav>
  )
}
