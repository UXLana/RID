'use client'

import React, { useState } from 'react'
import { DataTable, TabBar, Button, Input } from 'mtr-design-system/components'
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
  Printer,
  Package as PackageIcon,
  Archive,
  Download,
  Search,
} from 'lucide-react'
import LabelWizard from '@/local-components/LabelWizard'
import Link from 'next/link'
import { useDarkMode, dark } from '@/local-components/Providers'

const packages = [
  { id: '1A4FF0300000026000000295', product: 'Blue Dream Pre-Roll', type: 'Flower', quantity: '100 ea', date: '2026-02-28' },
  { id: '1A4FF0300000026000000296', product: 'OG Kush Cartridge', type: 'Concentrate', quantity: '50 ea', date: '2026-03-01' },
  { id: '1A4FF0300000026000000297', product: 'Sour Diesel Gummies', type: 'Edible', quantity: '200 ea', date: '2026-03-02' },
  { id: '1A4FF0300000026000000298', product: 'GSC Flower 3.5g', type: 'Flower', quantity: '45 ea', date: '2026-03-02' },
  { id: '1A4FF0300000026000000299', product: 'CBD Tincture', type: 'Tincture', quantity: '30 ea', date: '2026-03-03' },
]

function PrintButton({ onClick, isDark }: { onClick: () => void; isDark: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onClick() }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Print label"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '36px',
        height: '36px',
        borderRadius: borderRadius.md,
        backgroundColor: hovered
          ? (isDark ? dark.bgHover : colors.hover.onLight)
          : 'transparent',
        color: hovered
          ? (isDark ? dark.text : colors.text.highEmphasis.onLight)
          : (isDark ? dark.textMuted : colors.icon.enabled.onLight),
        border: 'none',
        cursor: 'pointer',
        transition: `all ${transitionPresets.default}`,
        padding: 0,
      }}
    >
      <Printer size={20} strokeWidth={1.5} />
    </button>
  )
}

const packageTabs = [
  { id: 'active', label: 'Active' },
  { id: 'staged', label: 'Staged' },
]

export default function PackagesPage() {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set())
  const [isWizardOpen, setIsWizardOpen] = useState(false)
  const displayMode = 'table' as const
  const [printTarget, setPrintTarget] = useState<any[] | null>(null)
  const [activeTab, setActiveTab] = useState<string>('active')
  const [searchQuery, setSearchQuery] = useState('')
  const { isDark } = useDarkMode()

  const textHigh = isDark ? dark.text : colors.text.highEmphasis.onLight
  const textLow = isDark ? dark.textMuted : colors.text.lowEmphasis.onLight

  const handlePrintSingle = (pkg: any) => {
    setPrintTarget([pkg])
    setIsWizardOpen(true)
  }

  const handlePrintSelected = () => {
    const selected = packages.filter((p) => selectedKeys.has(p.id))
    setPrintTarget(selected)
    setIsWizardOpen(true)
  }

  const columns = [
    {
      key: 'product',
      header: 'Product',
      width: '25%',
      sortable: true,
      cardPrimary: true,
      render: (row: any) => (
        <Link
          href={`/products/${row.id}`}
          onClick={(e) => e.stopPropagation()}
          style={{
            fontFamily: fontFamilies.body,
            fontWeight: fontWeights.medium,
            color: isDark ? colors.brand.lighter : colors.text.action.enabled,
            textDecoration: 'underline',
            transition: `color ${transitionPresets.default}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.textDecoration = 'none'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.textDecoration = 'underline'
          }}
        >
          {row.product}
        </Link>
      ),
    },
    { key: 'id', header: 'Package Tag', width: '25%', sortable: true },
    { key: 'type', header: 'Type', width: '15%', sortable: true },
    { key: 'quantity', header: 'Quantity', width: '15%' },
    { key: 'date', header: 'Date Created', width: '15%', sortable: true },
    {
      key: 'actions',
      header: '',
      width: '50px',
      align: 'right' as const,
      render: (row: any) => (
        <PrintButton onClick={() => handlePrintSingle(row)} isDark={isDark} />
      ),
    },
  ]

  return (
    <div style={{ padding: spacing.xl }}>
      {/* Page Header */}
      <div style={{ marginBottom: spacing.xl }}>
        <h1
          style={{
            ...typography.heading.h3,
            color: textHigh,
            margin: 0,
          }}
        >
          Packages
        </h1>
        <p
          style={{
            ...typography.body.sm,
            color: textLow,
            margin: 0,
            marginTop: spacing['2xs'],
          }}
        >
          Manage your inventory packages
        </p>
      </div>

      {/* Tabs + Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md }}>
        <TabBar
          tabs={packageTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onDark={isDark}
          hasDivider={false}
        />
        <div style={{ display: 'flex', gap: spacing.sm }}>
          <Button emphasis="low" size="md">Import</Button>
          <Button emphasis="high" size="md">Stage</Button>
        </div>
      </div>

      {/* DataTable Toolbar + Table */}
      <div className={isDark ? 'dark-table' : ''}>
        <div style={{ marginBottom: spacing.sm }}>
          <DataTable.Toolbar>
            <DataTable.Toolbar.Left>
              <DataTable.SelectionInfo count={selectedKeys.size}>
                <DataTable.IconButton title="Export selected" label="Export">
                  <Download size={16} />
                </DataTable.IconButton>
                <DataTable.IconButton title="Archive selected" label="Archive">
                  <Archive size={16} />
                </DataTable.IconButton>
              </DataTable.SelectionInfo>
            </DataTable.Toolbar.Left>
            <DataTable.Toolbar.Right>
              <Input
                placeholder="Search..."
                startAdornment={<Search size={16} />}
                size="sm"
                value={searchQuery}
                onChange={(val) => setSearchQuery(val)}
                style={{ marginBottom: 0, width: '200px' }}
              />
              <DataTable.FilterButton />
              <DataTable.SortButton />
            </DataTable.Toolbar.Right>
          </DataTable.Toolbar>
        </div>
        <DataTable
          display={displayMode}
          density="comfortable"
          columns={columns}
          data={packages}
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
              <PackageIcon size={48} style={{ marginBottom: spacing.md, opacity: 0.5 }} />
              <p style={{ ...typography.body.md, margin: 0 }}>No packages found</p>
            </div>
          }
        />
      </div>

      {isWizardOpen && (
        <LabelWizard
          isOpen={isWizardOpen}
          onClose={() => setIsWizardOpen(false)}
          packages={printTarget || []}
        />
      )}
    </div>
  )
}
