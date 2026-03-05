'use client'

import React, { useState } from 'react'
import { DataTable, TabBar, Input, Badge, Button } from 'mtr-design-system/components'
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
  Printer,
  MoreVertical,
  Columns3,
  FileText,
  FileSpreadsheet,
  Plus,
} from 'lucide-react'
import Link from 'next/link'
import { useDarkMode, dark } from '@/local-components/Providers'

const jobs = [
  { id: 'JOB-2026-001', name: 'Blue Dream Batch 1', package: '1A4FF030...295', product: 'Blue Dream Pre-Roll', template: 'Standard 3x2', count: 100, date: '2026-03-03', status: 'Queued', image: '/blue-dream-preroll.png' },
  { id: 'JOB-2026-002', name: 'OG Kush Cartridges', package: '1A4FF030...296', product: 'OG Kush Cartridge', template: 'Compact 2x1', count: 50, date: '2026-03-03', status: 'Printing', image: '/og-kush-cartridge.png' },
  { id: 'JOB-2026-003', name: 'Sour Diesel Gummies', package: '1A4FF030...297', product: 'Sour Diesel Gummies', template: 'Retail 4x3', count: 200, date: '2026-03-02', status: 'Complete', image: '/sour-diesel-gummies.png' },
  { id: 'JOB-2026-004', name: 'GSC Flower Run', package: '1A4FF030...298', product: 'GSC Flower 3.5g', template: 'Standard 3x2', count: 45, date: '2026-03-01', status: 'Failed', image: '/gsc-flower.png' },
  { id: 'JOB-2026-005', name: 'CBD Tincture Labels', package: '1A4FF030...299', product: 'CBD Tincture', template: 'Compact 2x1', count: 30, date: '2026-02-28', status: 'Complete', image: '/cbd-tincture.png' },
]

const statusBadgeColor: Record<string, 'success' | 'info' | 'error' | 'warning' | 'neutral'> = {
  Complete: 'success',
  Printing: 'info',
  Failed: 'error',
  Queued: 'warning',
}

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="subtle" color={statusBadgeColor[status] || 'neutral'} size="sm">
      {status}
    </Badge>
  )
}

import { createPortal } from 'react-dom'

function OverflowMenu({ isDark }: { isDark: boolean }) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      // Close if clicking outside the menu
      // Note: Since menu is in a portal, we can't just check buttonRef containment for the menu part
      // But we can check if the click target is NOT the button
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        // We also need to check if the click is inside the portal menu, but that's harder without a ref to it
        // A simpler way for this prototype: close on any click, stopPropagation on menu click
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setPosition({
        top: rect.bottom + 4,
        left: rect.right - 140, // Align right edge of 140px menu to right edge of button
      })
    }
    setOpen((v) => !v)
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label="Row actions"
        onClick={handleOpen}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '36px',
          height: '36px',
          borderRadius: borderRadius.md,
          backgroundColor: hovered || open
            ? (isDark ? dark.bgHover : colors.hover.onLight)
            : 'transparent',
          color: hovered || open
            ? (isDark ? dark.text : colors.text.highEmphasis.onLight)
            : (isDark ? dark.textMuted : colors.icon.enabled.onLight),
          border: 'none',
          cursor: 'pointer',
          transition: `all ${transitionPresets.default}`,
          padding: 0,
        }}
      >
        <MoreVertical size={20} strokeWidth={1.5} />
      </button>
      {open && createPortal(
        <div
          onMouseDown={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu
          style={{
            position: 'fixed',
            top: position.top,
            left: position.left,
            minWidth: '140px',
            backgroundColor: isDark ? dark.bgElevated : colors.surface.light,
            border: `1px solid ${isDark ? dark.border : colors.border.lowEmphasis.onLight}`,
            borderRadius: borderRadius.md,
            boxShadow: shadows.lg,
            zIndex: 9999,
            overflow: 'hidden',
          }}
        >
          {[
            { label: 'Preview' },
            { label: 'Download PDF' },
            { label: 'Download CSV' },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={(e) => { e.stopPropagation(); setOpen(false) }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = isDark ? dark.bgHover : colors.hover.onLight }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.sm,
                width: '100%',
                padding: `${spacing.xs} ${spacing.md}`,
                border: 'none',
                backgroundColor: 'transparent',
                color: isDark ? dark.text : colors.text.highEmphasis.onLight,
                ...typography.body.sm,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>,
        document.body
      )}
    </>
  )
}

export default function PrintJobsPage() {
  const [activeTab, setActiveTab] = useState('active')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set())
  const { isDark } = useDarkMode()

  const textHigh = isDark ? dark.text : colors.text.highEmphasis.onLight
  const textLow = isDark ? dark.textMuted : colors.text.lowEmphasis.onLight

  const tabs = [
    { id: 'active', label: 'Active' },
    { id: 'complete', label: 'Complete' },
    { id: 'archive', label: 'Archive' },
  ]

  const columns = [
    {
      key: 'thumbnail',
      header: '',
      width: '48px',
      render: (row: any) => (
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: borderRadius.sm,
            backgroundColor: '#F5F5F5',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          <img src={row.image} alt={row.product} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      ),
    },
    {
      key: 'name',
      header: 'Job name',
      width: '20%',
      sortable: true,
      render: (row: any) => (
        <Link
          href={`/print-jobs/${row.id}`}
          onClick={(e) => e.stopPropagation()}
          style={{
            fontFamily: fontFamilies.body,
            fontWeight: fontWeights.medium,
            color: isDark ? '#5AAE90' : colors.text.action.enabled,
            textDecoration: 'underline',
            transition: `color ${transitionPresets.default}`,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'none' }}
          onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'underline' }}
        >
          {row.name}
        </Link>
      ),
    },
    { key: 'id', header: 'Job ID', width: '12%' },
    { key: 'package', header: 'Package tag', width: '14%' },
    { key: 'product', header: 'Product', width: '16%' },
    { key: 'template', header: 'Template', width: '12%' },
    { key: 'count', header: 'Count', width: '7%', align: 'right' as const },
    { key: 'date', header: 'Print date', width: '10%' },
    ...(activeTab !== 'archive' && activeTab !== 'complete' ? [{
      key: 'status',
      header: 'Status',
      width: '9%',
      render: (row: any) => <StatusBadge status={row.status} />,
    }] : []),
    {
      key: 'actions',
      header: '',
      width: '50px',
      align: 'right' as const,
      render: () => <OverflowMenu isDark={isDark} />,
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

      {/* Tabs + Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md }}>
        <TabBar
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onDark={isDark}
          hasDivider={false}
        />
        <div style={{ display: 'flex', gap: spacing.sm }}>
          <Button emphasis="high" size="md" leftIcon={<Plus size={16} />}>
            New print job
          </Button>
        </div>
      </div>

      {/* Toolbar + Table */}
      <div className={`copper-highlight ${isDark ? 'dark-table' : ''}`}>
        <div className="mtr-toolbar" style={{ marginBottom: spacing.sm }}>
          <DataTable.Toolbar>
            <DataTable.Toolbar.Left>
              <DataTable.SelectionInfo count={selectedKeys.size}>
                <DataTable.IconButton title="Reprint selected" label="Reprint">
                  <RefreshCw size={16} />
                </DataTable.IconButton>
                <DataTable.IconButton title="Preview selected" label="Preview">
                  <Eye size={16} />
                </DataTable.IconButton>
              </DataTable.SelectionInfo>
            </DataTable.Toolbar.Left>
            <DataTable.Toolbar.Right>
              <Input
                placeholder="Search jobs..."
                startAdornment={<Search size={16} />}
                size="sm"
                value={searchQuery}
                onChange={(val) => setSearchQuery(val)}
                style={{ marginBottom: 0, width: '200px' }}
              />
              <DataTable.FilterButton />
              <DataTable.IconButton title="Configure columns">
                <Columns3 size={16} />
              </DataTable.IconButton>
            </DataTable.Toolbar.Right>
          </DataTable.Toolbar>
        </div>
        <DataTable
          columns={columns}
          data={filteredJobs}
          density="comfortable"
          rowKey={(row) => row.id}
          selectable
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
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
