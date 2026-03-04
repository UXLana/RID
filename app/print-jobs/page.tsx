'use client'

import React, { useState } from 'react'
import { DataTable, TabBar } from 'mtr-design-system/components'
import {
  colors,
  typography,
  fontFamilies,
  fontWeights,
  spacing,
  borderRadius,
  shadows,
  transitionPresets,
} from '@/styles/design-tokens'
import {
  Search,
  RefreshCw,
  Eye,
  Calendar,
  Printer
} from 'lucide-react'
import { useDarkMode, dark } from '@/local-components/Providers'

const jobs = [
  { id: 'JOB-2026-001', name: 'Blue Dream Batch 1', package: '1A4FF030...295', product: 'Blue Dream Pre-Roll', template: 'Standard 3x2', count: 100, date: '2026-03-03', status: 'Queued' },
  { id: 'JOB-2026-002', name: 'OG Kush Cartridges', package: '1A4FF030...296', product: 'OG Kush Cartridge', template: 'Compact 2x1', count: 50, date: '2026-03-03', status: 'Printing' },
  { id: 'JOB-2026-003', name: 'Sour Diesel Gummies', package: '1A4FF030...297', product: 'Sour Diesel Gummies', template: 'Retail 4x3', count: 200, date: '2026-03-02', status: 'Complete' },
  { id: 'JOB-2026-004', name: 'GSC Flower Run', package: '1A4FF030...298', product: 'GSC Flower 3.5g', template: 'Standard 3x2', count: 45, date: '2026-03-01', status: 'Failed' },
  { id: 'JOB-2026-005', name: 'CBD Tincture Labels', package: '1A4FF030...299', product: 'CBD Tincture', template: 'Compact 2x1', count: 30, date: '2026-02-28', status: 'Complete' },
]

const statusStyles: Record<string, { bg: string; text: string }> = {
  Complete: { bg: colors.surface.success, text: colors.text.success },
  Printing: { bg: colors.surface.info, text: colors.status.info },
  Failed: { bg: colors.surface.important, text: colors.text.important },
  Queued: { bg: colors.surface.warning, text: colors.text.warning },
}

function StatusBadge({ status }: { status: string }) {
  const style = statusStyles[status] || statusStyles.Queued
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: `${spacing['2xs']} ${spacing.xs}`,
        borderRadius: borderRadius.full,
        backgroundColor: style.bg,
        color: style.text,
        ...typography.label.sm,
      }}
    >
      {status}
    </span>
  )
}

function ActionButton({ icon, label, isDark }: { icon: React.ReactNode; label: string; isDark: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      type="button"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '32px',
        height: '32px',
        borderRadius: borderRadius.sm,
        backgroundColor: hovered
          ? (isDark ? dark.bgHover : colors.hover.onLight)
          : 'transparent',
        color: isDark ? dark.textMuted : colors.icon.enabled.onLight,
        border: 'none',
        cursor: 'pointer',
        transition: `all ${transitionPresets.default}`,
        padding: 0,
      }}
    >
      {icon}
    </button>
  )
}

export default function PrintJobsPage() {
  const [activeTab, setActiveTab] = useState('active')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const { isDark } = useDarkMode()

  const textHigh = isDark ? dark.text : colors.text.highEmphasis.onLight
  const textLow = isDark ? dark.textMuted : colors.text.lowEmphasis.onLight
  const borderColor = isDark ? dark.border : colors.border.midEmphasis.onLight
  const borderLow = isDark ? dark.borderSubtle : colors.border.lowEmphasis.onLight
  const surfaceBg = isDark ? dark.bgElevated : colors.surface.light

  const tabs = [
    { id: 'active', label: 'Active' },
    { id: 'complete', label: 'Complete' },
    { id: 'archive', label: 'Archive' },
  ]

  const columns = [
    { key: 'id', header: 'Job ID', width: '12%' },
    { key: 'name', header: 'Job Name', width: '18%' },
    { key: 'package', header: 'Package Tag', width: '14%' },
    { key: 'product', header: 'Product', width: '18%' },
    { key: 'template', header: 'Template', width: '14%' },
    { key: 'count', header: 'Count', width: '8%', align: 'right' as const },
    { key: 'date', header: 'Print Date', width: '12%' },
    {
      key: 'status',
      header: 'Status',
      width: '10%',
      render: (row: any) => <StatusBadge status={row.status} />,
    },
    {
      key: 'actions',
      header: '',
      width: '100px',
      align: 'right' as const,
      render: () => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: spacing['2xs'] }}>
          <ActionButton icon={<Eye size={16} />} label="Preview" isDark={isDark} />
          <ActionButton icon={<RefreshCw size={16} />} label="Reprint" isDark={isDark} />
          <ActionButton icon={<Printer size={16} />} label="Print" isDark={isDark} />
        </div>
      ),
    },
  ]

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.id.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === 'active') return matchesSearch && ['Queued', 'Printing', 'Failed'].includes(job.status)
    if (activeTab === 'complete') return matchesSearch && job.status === 'Complete'
    return matchesSearch
  })

  return (
    <div style={{ padding: spacing.xl }}>
      {/* Header */}
      <div style={{ marginBottom: spacing.xl }}>
        <h1 style={{ ...typography.heading.h3, color: textHigh, margin: 0 }}>
          Print Jobs
        </h1>
        <p style={{ ...typography.body.sm, color: textLow, margin: 0, marginTop: spacing['2xs'] }}>
          Monitor and manage your label print jobs
        </p>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: spacing.md }}>
        <TabBar
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onDark={isDark}
          hasDivider={false}
        />
      </div>

      {/* Filter Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: spacing.md,
          alignItems: 'center',
          backgroundColor: surfaceBg,
          padding: spacing.md,
          borderRadius: borderRadius.lg,
          border: `1px solid ${borderLow}`,
          boxShadow: isDark ? 'none' : shadows.xs,
          marginBottom: spacing.xl,
        }}
      >
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: spacing.sm,
              top: '50%',
              transform: 'translateY(-50%)',
              color: isDark ? dark.textMuted : colors.icon.enabled.onLight,
            }}
          />
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{
              width: '100%',
              paddingLeft: spacing['2xl'],
              paddingRight: spacing.md,
              paddingTop: spacing.xs,
              paddingBottom: spacing.xs,
              border: `1px solid ${searchFocused ? (isDark ? '#007acc' : colors.focusBorder.onLight) : borderColor}`,
              borderRadius: borderRadius.md,
              ...typography.body.sm,
              outline: 'none',
              backgroundColor: isDark ? dark.bgInput : colors.surface.light,
              color: textHigh,
              boxShadow: searchFocused ? `0 0 0 3px ${isDark ? 'rgba(0,122,204,0.3)' : colors.selectedHighlight}` : 'none',
              transition: `all ${transitionPresets.default}`,
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: spacing.sm }}>
          <select
            style={{
              padding: `${spacing.xs} ${spacing.sm}`,
              paddingRight: spacing['2xl'],
              border: `1px solid ${borderColor}`,
              borderRadius: borderRadius.md,
              backgroundColor: isDark ? dark.bgInput : colors.surface.light,
              color: textHigh,
              ...typography.body.sm,
              outline: 'none',
            }}
          >
            <option>All Products</option>
            <option>Blue Dream</option>
            <option>OG Kush</option>
          </select>

          <select
            style={{
              padding: `${spacing.xs} ${spacing.sm}`,
              paddingRight: spacing['2xl'],
              border: `1px solid ${borderColor}`,
              borderRadius: borderRadius.md,
              backgroundColor: isDark ? dark.bgInput : colors.surface.light,
              color: textHigh,
              ...typography.body.sm,
              outline: 'none',
            }}
          >
            <option>All Templates</option>
            <option>Standard 3x2</option>
            <option>Compact 2x1</option>
          </select>

          <button
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing.xs,
              padding: `${spacing.xs} ${spacing.sm}`,
              border: `1px solid ${borderColor}`,
              borderRadius: borderRadius.md,
              backgroundColor: isDark ? dark.bgInput : colors.surface.light,
              ...typography.body.sm,
              cursor: 'pointer',
              color: textHigh,
            }}
          >
            <Calendar size={16} style={{ color: isDark ? dark.textMuted : colors.icon.enabled.onLight }} />
            Date Range
          </button>
        </div>
      </div>

      {/* Table */}
      <div className={isDark ? 'dark-table' : ''}>
        <DataTable
          columns={columns}
          data={filteredJobs}
          density="comfortable"
          rowKey={(row) => row.id}
          emptyState={
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: `${spacing['4xl']} 0`,
                color: textLow,
              }}
            >
              <Printer size={48} style={{ marginBottom: spacing.md, opacity: 0.5 }} />
              <p style={{ ...typography.body.md, margin: 0 }}>No print jobs found</p>
            </div>
          }
        />
      </div>
    </div>
  )
}
