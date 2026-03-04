'use client'

import React, { useState, useEffect } from 'react'
import {
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Printer,
  Calendar,
  Package,
  Maximize,
  Download,
  RotateCcw,
  Undo,
  Redo,
  Highlighter,
  Minus,
  Plus,
  Check,
  Square,
  Search,
} from 'lucide-react'
import { Button, LinearStepper, FullScreenModal, FullScreenModalPanel } from 'mtr-design-system/components'
import {
  colors,
  typography,
  fontFamilies,
  fontWeights,
  spacing,
  borderRadius,
  shadows,
  transitionPresets,
  header,
  productCard,
} from '@/styles/design-tokens'

// =============================================================================
// TYPES
// =============================================================================

interface LabelWizardProps {
  isOpen: boolean
  onClose: () => void
  packages: any[]
}

// =============================================================================
// ATOMIC: PRODUCT CARD (Compact horizontal)
// =============================================================================

function ProductCardCompact({
  imageUrl,
  name,
  tagId,
  brand,
  onRemove,
  onClick,
  interactive = false,
  borderless = false,
}: {
  imageUrl?: string
  name: string
  tagId: string
  brand?: string
  onRemove?: () => void
  onClick?: () => void
  interactive?: boolean
  borderless?: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => interactive && setHovered(true)}
      onMouseLeave={() => interactive && setHovered(false)}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: spacing.sm,
        border: borderless ? 'none' : `${productCard.border.width} solid ${productCard.border.color}`,
        borderRadius: borderless ? 0 : productCard.border.radius,
        padding: borderless ? `${spacing.sm} ${spacing.md}` : spacing.sm,
        backgroundColor: hovered ? colors.hover.onLight : 'transparent',
        position: 'relative',
        cursor: interactive ? 'pointer' : 'default',
        transition: `background-color ${transitionPresets.default}`,
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          backgroundColor: productCard.image.background,
          borderRadius: productCard.image.borderRadius,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <Package size={28} style={{ color: productCard.image.iconColor }} />
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: fontFamilies.display,
            fontSize: productCard.typography.name.fontSize,
            fontWeight: productCard.typography.name.fontWeight,
            lineHeight: productCard.typography.name.lineHeight,
            color: productCard.typography.name.color,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: fontFamilies.mono,
            fontSize: productCard.typography.sku.fontSize,
            fontWeight: productCard.typography.sku.fontWeight,
            lineHeight: productCard.typography.sku.lineHeight,
            color: productCard.typography.sku.color,
            marginTop: '2px',
          }}
        >
          {tagId}
        </div>
        {brand && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              marginTop: spacing.xs,
              padding: `2px ${spacing.xs}`,
              borderRadius: borderRadius.sm,
              backgroundColor: colors.surface.lightDarker,
              fontFamily: fontFamilies.body,
              fontSize: '11px',
              fontWeight: fontWeights.medium,
              color: colors.text.lowEmphasis.onLight,
            }}
          >
            {brand}
          </div>
        )}
      </div>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          aria-label="Remove"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: colors.text.lowEmphasis.onLight,
            padding: 0,
            flexShrink: 0,
          }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}

// =============================================================================
// ATOMIC: PRODUCT SELECT (Trigger + Dropdown)
// =============================================================================

function ProductSelect({
  value,
  selectedProduct,
  onSelect,
  onClear,
}: {
  value: string
  selectedProduct?: { name: string; tagId: string; brand: string; imageUrl: string } | null
  onSelect: (product: any) => void
  onClear: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const containerRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setSearchTerm('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const recentProducts = [
    { id: 'rp1', name: 'Cannabis-Infused Blood Raspberries', tagId: '12345-NG-567890', brand: 'Wyld', imageUrl: '/blue-dream-preroll.png' },
    { id: 'rp2', name: 'Blue Dream Pre-Roll 1g', tagId: '1A4FF030...295', brand: 'Holistic', imageUrl: '/blue-dream-preroll.png' },
    { id: 'rp3', name: 'OG Kush Cartridge 0.5g', tagId: '1A4FF030...296', brand: 'Holistic', imageUrl: '/blue-dream-preroll.png' },
    { id: 'rp4', name: 'Sour Diesel Gummies 10pk', tagId: '1A4FF030...297', brand: 'Wyld', imageUrl: '/blue-dream-preroll.png' },
    { id: 'rp5', name: 'GSC Flower 3.5g', tagId: '1A4FF030...298', brand: 'Holistic', imageUrl: '/blue-dream-preroll.png' },
    { id: 'rp6', name: 'CBD Tincture 30ml', tagId: '1A4FF030...299', brand: 'Wyld', imageUrl: '/blue-dream-preroll.png' },
    { id: 'rp7', name: 'Northern Lights Cartridge', tagId: '1A4FF030...300', brand: 'Holistic', imageUrl: '/blue-dream-preroll.png' },
    { id: 'rp8', name: 'Pineapple Express Edibles', tagId: '1A4FF030...301', brand: 'Wyld', imageUrl: '/blue-dream-preroll.png' },
  ]

  const handleSelect = (product: any) => {
    onSelect(product)
    setIsOpen(false)
    setSearchTerm('')
  }

  if (!isOpen && selectedProduct) {
    return (
      <ProductCardCompact
        imageUrl={selectedProduct.imageUrl}
        name={selectedProduct.name}
        tagId={selectedProduct.tagId}
        brand={selectedProduct.brand}
        onRemove={() => { onClear(); }}
        onClick={() => setIsOpen(true)}
      />
    )
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        style={{
          width: '100%',
          padding: `${spacing.xs} ${spacing.sm}`,
          border: `1px solid ${colors.border.midEmphasis.onLight}`,
          borderRadius: borderRadius.md,
          ...typography.body.sm,
          outline: 'none',
          boxSizing: 'border-box',
          height: '36px',
          backgroundColor: colors.surface.light,
          color: value ? colors.text.highEmphasis.onLight : colors.text.lowEmphasis.onLight,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'left',
        }}
      >
        <span>{value || 'Select product'}</span>
        <ChevronDown size={16} style={{ color: colors.icon.enabled.onLight, flexShrink: 0 }} />
      </button>
    )
  }

  return (
    <div
      ref={containerRef}
      style={{
        border: `1px solid ${colors.border.midEmphasis.onLight}`,
        borderRadius: borderRadius.lg,
        backgroundColor: colors.surface.light,
        overflow: 'hidden',
      }}
    >
      {/* Search input */}
      <div style={{ position: 'relative', padding: `${spacing.sm} ${spacing.md}` }}>
        <input
          type="text"
          placeholder=""
          autoFocus
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: `${spacing.xs} ${spacing.xl} ${spacing.xs} ${spacing.xl}`,
            border: 'none',
            borderRadius: 0,
            ...typography.body.sm,
            outline: 'none',
            boxSizing: 'border-box',
            height: '28px',
            backgroundColor: 'transparent',
          }}
        />
        <Search
          size={18}
          style={{
            position: 'absolute',
            left: spacing.md,
            top: '50%',
            transform: 'translateY(-50%)',
            color: colors.icon.enabled.onLight,
            pointerEvents: 'none',
          }}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            aria-label="Clear search"
            style={{
              position: 'absolute',
              right: spacing.md,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px',
              height: '20px',
              borderRadius: borderRadius.full,
              backgroundColor: colors.border.midEmphasis.onLight,
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <X size={12} color={colors.surface.light} strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Pinline under search */}
      <div style={{ height: '1px', backgroundColor: colors.border.lowEmphasis.onLight }} />

      {/* Recent label */}
      <div
        style={{
          ...typography.label.sm,
          color: colors.text.lowEmphasis.onLight,
          padding: `${spacing.sm} ${spacing.md} 0`,
          marginBottom: spacing.md,
        }}
      >
        Recent
      </div>

      {/* Product rows — scrollable */}
      <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
        {recentProducts.map((product, idx) => (
          <div key={product.id}>
            {idx > 0 && (
              <div style={{ height: '1px', backgroundColor: colors.border.lowEmphasis.onLight, margin: `0 ${spacing.md}` }} />
            )}
            <ProductCardCompact
              name={product.name}
              tagId={product.tagId}
              brand={product.brand}
              imageUrl={product.imageUrl}
              interactive
              onClick={() => handleSelect(product)}
              borderless
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// ATOMIC: CHECKBOX TOGGLE
// =============================================================================

function CheckboxToggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  description?: string
}) {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: spacing.sm,
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          width: '20px',
          height: '20px',
          borderRadius: borderRadius.xs,
          border: checked
            ? `2px solid ${colors.brand.default}`
            : `2px solid ${colors.border.midEmphasis.onLight}`,
          backgroundColor: checked ? colors.brand.default : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: '2px',
          transition: `all ${transitionPresets.default}`,
        }}
        onClick={() => onChange(!checked)}
      >
        {checked && <Check size={14} color="#fff" strokeWidth={2.5} />}
      </div>
      <div>
        <div
          style={{
            ...typography.body.sm,
            fontWeight: fontWeights.medium,
            color: colors.text.highEmphasis.onLight,
          }}
        >
          {label}
        </div>
        {description && (
          <div
            style={{
              ...typography.body.xs,
              color: colors.text.lowEmphasis.onLight,
              marginTop: '1px',
            }}
          >
            {description}
          </div>
        )}
      </div>
    </label>
  )
}

// =============================================================================
// ATOMIC: COMPLIANCE LABEL
// =============================================================================

function getTemplateSize(template: string): { w: number; h: number; label: string } {
  if (template === 'mqr') return { w: 2, h: 2, label: '2" × 2"' }
  if (template.includes('3x1.5') || template.includes('3wx1.5h')) return { w: 3, h: 1.5, label: '3" × 1.5"' }
  if (template.includes('3x2')) return { w: 3, h: 2, label: '3" × 2"' }
  if (template.includes('3x1')) return { w: 3, h: 1, label: '3" × 1"' }
  if (template.includes('3.5x2')) return { w: 3.5, h: 2, label: '3.5" × 2"' }
  if (template.includes('2.5x1.5')) return { w: 2.5, h: 1.5, label: '2.5" × 1.5"' }
  if (template.includes('2.5x1')) return { w: 2.5, h: 1, label: '2.5" × 1"' }
  if (template.includes('2x1')) return { w: 2, h: 1, label: '2" × 1"' }
  if (template.includes('4x6')) return { w: 4, h: 6, label: '4" × 6"' }
  if (template.includes('4x3')) return { w: 4, h: 3, label: '4" × 3"' }
  if (template.includes('4x2')) return { w: 4, h: 2, label: '4" × 2"' }
  return { w: 3, h: 1.5, label: '3" × 1.5"' }
}

function getLayoutCount(layout: string): { count: number; rotated: boolean } {
  if (layout.includes('Match label')) return { count: 1, rotated: false }
  if (layout.includes('Letter')) return { count: 1, rotated: false }
  if (layout.includes('A4')) return { count: 1, rotated: false }
  if (layout.includes('4" x 6"')) return { count: 1, rotated: false }
  if (layout.includes('2" x 3"')) return { count: 1, rotated: false }
  if (layout.includes('avery5167')) return { count: 80, rotated: false }
  if (layout.includes('avery5267')) return { count: 30, rotated: false }
  if (layout.includes('avery94203')) return { count: 10, rotated: false }
  if (layout.includes('avery4221')) return { count: 20, rotated: false }
  if (layout.includes('ol1000')) return { count: 8, rotated: false }
  if (layout.includes('ol100cx')) return { count: 6, rotated: false }
  if (layout.includes('ol1067')) return { count: 12, rotated: false }
  if (layout.includes('ol1115')) return { count: 4, rotated: false }
  if (layout.includes('ol114')) return { count: 14, rotated: false }
  if (layout.includes('1.88x2.62')) return { count: 10, rotated: false }
  return { count: 1, rotated: false }
}

function ComplianceLabel({ data, scale = 1, rotated = false }: { data: any; scale?: number; rotated?: boolean }) {
  const productName = data.overrideProduct || data.productId || 'Blue Dream Pre-Roll'
  const pkgDate = data.packagedDate || '03/04/2026'
  const tagId = data.packageId || '1A4FF0300000026000000295'
  const topOffset = parseFloat(data.topOffset) || 0
  const leftOffset = parseFloat(data.leftOffset) || 0

  return (
    <div
      style={{
        backgroundColor: '#fff',
        width: '100%',
        border: `1px solid ${colors.border.lowEmphasis.onLight}`,
        fontFamily: fontFamilies.body,
        padding: '20px 24px',
        paddingTop: topOffset > 0 ? `${20 + topOffset * 48}px` : '20px',
        paddingLeft: leftOffset > 0 ? `${24 + leftOffset * 48}px` : '24px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        fontSize: `${scale * 100}%`,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Cannabis flower
          </div>
          <div style={{ fontSize: '10px', color: '#666', marginTop: '2px', textTransform: 'uppercase' }}>
            Metrc compliant &bull; CA
          </div>
          <div style={{ fontSize: '10px', color: '#666', textTransform: 'uppercase' }}>State</div>
        </div>
        {/* State badge */}
        <div
          style={{
            width: '36px',
            height: '36px',
            border: '2px solid #333',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 800, lineHeight: 1 }}>CA</span>
          <span style={{ fontSize: '7px', fontWeight: 600, lineHeight: 1, marginTop: '1px' }}>!</span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '2px', backgroundColor: colors.brand.default, marginBottom: '14px' }} />

      {/* Product + Potency */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', color: '#888', letterSpacing: '0.5px' }}>Product</div>
          <div style={{ fontSize: '18px', fontWeight: 700, lineHeight: 1.2, marginTop: '2px' }}>{productName}</div>
          <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>Class: Sativa</div>
          <div style={{ fontSize: '10px', color: '#666' }}>Net Wt: 1.0g (0.035oz)</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'right', flexShrink: 0, borderLeft: '1px solid #e0e0e0', paddingLeft: '12px' }}>
          <div>
            <span style={{ fontSize: '9px', fontWeight: 600, color: '#888', textTransform: 'uppercase' }}>THC</span>
            <span style={{ fontSize: '14px', fontWeight: 700, marginLeft: '8px' }}>24.5%</span>
          </div>
          <div>
            <span style={{ fontSize: '9px', fontWeight: 600, color: '#888', textTransform: 'uppercase' }}>CBD</span>
            <span style={{ fontSize: '14px', fontWeight: 700, marginLeft: '8px' }}>0.1%</span>
          </div>
          <div>
            <span style={{ fontSize: '9px', fontWeight: 600, color: '#888', textTransform: 'uppercase' }}>TAC</span>
            <span style={{ fontSize: '14px', fontWeight: 700, marginLeft: '8px' }}>25.2%</span>
          </div>
        </div>
      </div>

      {/* Barcode */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 12px',
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          marginBottom: '12px',
        }}
      >
        {/* Simulated barcode lines */}
        <div style={{ display: 'flex', gap: '1px', flexShrink: 0 }}>
          {[3, 1, 2, 1, 3, 1, 2, 3, 1, 2].map((w, i) => (
            <div key={i} style={{ width: `${w}px`, height: '28px', backgroundColor: '#000' }} />
          ))}
        </div>
        <span style={{ fontFamily: fontFamilies.mono, fontSize: '11px', letterSpacing: '0.5px', fontWeight: 500 }}>
          {tagId}
        </span>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div>
          <span style={{ fontSize: '9px', fontWeight: 600, color: '#888', textTransform: 'uppercase' }}>Pkg date: </span>
          <span style={{ fontSize: '10px', fontWeight: 700 }}>{pkgDate}</span>
        </div>
        <div>
          <span style={{ fontSize: '9px', fontWeight: 600, color: '#888', textTransform: 'uppercase' }}>Batch: </span>
          <span style={{ fontSize: '10px', fontWeight: 700 }}>BD-PR-1024</span>
        </div>
      </div>

      {/* Warning */}
      <div style={{ fontSize: '7px', color: '#888', lineHeight: 1.4, textTransform: 'uppercase', letterSpacing: '0.2px' }}>
        Government warning: This package contains cannabis, a schedule I controlled substance. Keep out of reach of children and animals.
      </div>
    </div>
  )
}

// =============================================================================
// ATOMIC: PREVIEW TOOLBAR BUTTON
// =============================================================================

function ToolbarBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '28px',
        height: '28px',
        borderRadius: borderRadius.full,
        backgroundColor: hovered ? 'rgba(255,255,255,0.15)' : 'transparent',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        transition: `background-color ${transitionPresets.default}`,
      }}
    >
      {children}
    </button>
  )
}

// =============================================================================
// ATOMIC: STEP NAVIGATION
// =============================================================================

function StepNav({
  step,
  total,
  onNext,
  onPrev,
  lastLabel = 'Finish',
}: {
  step: number
  total: number
  onNext: () => void
  onPrev: () => void
  lastLabel?: string
}) {
  return (
    <div
      style={{ display: 'flex', gap: spacing.xs, marginTop: spacing.xs }}
      onClick={(e) => e.stopPropagation()}
    >
      {step > 0 && (
        <Button emphasis="mid" size="md" onClick={onPrev}>
          Previous
        </Button>
      )}
      <Button emphasis="high" size="md" onClick={onNext}>
        {step === total - 1 ? lastLabel : 'Next'}
      </Button>
    </div>
  )
}

// =============================================================================
// MAIN: LABEL WIZARD
// =============================================================================

export default function LabelWizard({ isOpen, onClose, packages }: LabelWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [previewPage, setPreviewPage] = useState(0)
  const [overrideEnabled, setOverrideEnabled] = useState(false)
  const [overrideProduct, setOverrideProduct] = useState<{ name: string; tagId: string; brand: string; imageUrl: string } | null>(null)
  const [formData, setFormData] = useState({
    packageId: packages[0]?.id || '12345-NG-567890',
    productId: packages[0]?.product || 'Cannabis-Infused Blood Raspberries',
    overrideProduct: '',
    imageUrl: '/blue-dream-preroll.png',
    brand: 'Wyld',
    packagedDate: new Date().toISOString().split('T')[0],
    template: '',
    layout: '',
    topOffset: '',
    leftOffset: '',
    rotation: '0',
    quantity: '',
    perReel: '',
    jobName: `Job-${new Date().toISOString().split('T')[0]}-001`,
  })

  // When override is disabled, clear the selection
  useEffect(() => {
    if (!overrideEnabled) {
      setFormData(prev => ({ ...prev, overrideProduct: '' }))
    }
  }, [overrideEnabled])

  const getLayoutOptions = () => [
    'Match label size (1-up)',
    'Letter 8.5" x 11" (1-up)',
    'A4 210mm x 297mm (1-up)',
    'Label 4" x 6" (roll)',
    'Label 2" x 3" (roll)',
    '1.88x2.62x1sheet',
    'avery4221',
    'avery5167',
    'avery5267',
    'avery94203',
    'ol1000',
    'ol1000wx',
    'ol100cx',
    'ol1067',
    'ol1115',
    'ol114',
  ]

  const steps = [
    { id: 'package', label: 'Package', metadata: 'Verify package details' },
    { id: 'template', label: 'Label template', metadata: 'Select layout and design' },
    { id: 'quantity', label: 'Label quantity', metadata: 'Set print counts' },
    { id: 'settings', label: 'Print job settings', metadata: 'Configure job details' },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep((s) => s + 1)
  }

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1)
  }

  if (!isOpen) return null

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: `${spacing.xs} ${spacing.sm}`,
    border: `1px solid ${colors.border.midEmphasis.onLight}`,
    borderRadius: borderRadius.md,
    ...typography.body.sm,
    outline: 'none',
    boxSizing: 'border-box',
    height: '36px',
  }

  const labelStyle: React.CSSProperties = {
    ...typography.label.sm,
    color: colors.text.lowEmphasis.onLight,
    display: 'block',
    marginBottom: spacing['2xs'],
  }

  const stepContent = [
    // Step 0: Package
    <div key="package" style={{ display: 'flex', flexDirection: 'column', gap: spacing.md, width: '100%', minWidth: 0 }}>
      <ProductCardCompact
        imageUrl={formData.imageUrl}
        name={formData.productId}
        tagId={formData.packageId}
        brand={formData.brand}
        onRemove={() => {}}
      />

      <CheckboxToggle
        checked={overrideEnabled}
        onChange={setOverrideEnabled}
        label="Product override"
        description="Product information is different from package"
      />

      {overrideEnabled && (
        <ProductSelect
          value={formData.overrideProduct}
          selectedProduct={overrideProduct}
          onSelect={(product) => {
            setFormData({ ...formData, overrideProduct: product.name })
            setOverrideProduct({ name: product.name, tagId: product.tagId, brand: product.brand, imageUrl: product.imageUrl })
          }}
          onClear={() => {
            setFormData({ ...formData, overrideProduct: '' })
            setOverrideProduct(null)
          }}
        />
      )}

      <div>
        <label style={labelStyle}>Packaged date</label>
        <div style={{ display: 'flex', gap: spacing.xs }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              type="date"
              style={{ ...inputStyle, paddingLeft: spacing['2xl'] }}
              value={formData.packagedDate}
              onChange={(e) => setFormData({ ...formData, packagedDate: e.target.value })}
            />
            <Calendar
              size={16}
              style={{
                position: 'absolute',
                left: spacing.sm,
                top: '50%',
                transform: 'translateY(-50%)',
                color: colors.icon.enabled.onLight,
                pointerEvents: 'none',
              }}
            />
          </div>
          <Button
            emphasis="low"
            size="md"
            onClick={() => setFormData({ ...formData, packagedDate: new Date().toISOString().split('T')[0] })}
          >
            Today
          </Button>
        </div>
      </div>
      <StepNav step={0} total={steps.length} onNext={handleNext} onPrev={handlePrev} />
    </div>,

    // Step 1: Label template
    <div key="template" style={{ display: 'flex', flexDirection: 'column', gap: spacing.md, width: '100%', minWidth: 0 }}>
      <div>
        <label style={labelStyle}>Template</label>
        <select
          style={inputStyle}
          value={formData.template}
          onChange={(e) => setFormData({ ...formData, template: e.target.value, layout: '' })}
        >
          <option value="">Select a template...</option>
          <option value="mqr">MQR</option>
          <option value="3x1.5-concentrate">3 x 1.5 Concentrate V2</option>
          <option value="3x1.5-distillate">3 x 1.5 Distillate Cartridge</option>
          <option value="3x1.5-infused">3 x 1.5 Infused Preroll 4pk V2</option>
          <option value="3x1-disposable">3 x 1 Disposable</option>
          <option value="3x1-flower">3 x 1 Flower Preroll</option>
          <option value="3wx1.5h-infused">3w x 1.5h Infused Preroll</option>
          <option value="2.5x1.5-nv-flower">2.5 x 1.5 NV Flower FGL</option>
          <option value="3x1.5-nv-fgl-concentrate">3 x 1.5 NV FGL Concentrate</option>
          <option value="3x1.5-nv-fgl-edible">3 x 1.5 NV FGL Edible</option>
          <option value="3x1.5-nv-fgl-flower">3 x 1.5 NV FGL Flower</option>
          <option value="2x1-flower">2 x 1 Flower</option>
          <option value="4x2-edible">4 x 2 Edible</option>
          <option value="4x3-retail">4 x 3 Retail</option>
          <option value="4x6-shipping">4 x 6 Shipping</option>
          <option value="2x1-vape">2 x 1 Vape Cartridge</option>
          <option value="3x2-tincture">3 x 2 Tincture</option>
          <option value="2.5x1-preroll">2.5 x 1 Preroll Tube</option>
          <option value="3.5x2-topical">3.5 x 2 Topical</option>
        </select>
      </div>
      {formData.template && (
        <div>
          <label style={labelStyle}>Layout</label>
          <select
            style={inputStyle}
            value={formData.layout}
            onChange={(e) => setFormData({ ...formData, layout: e.target.value })}
          >
            <option value="">Select a layout...</option>
            {getLayoutOptions().map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: spacing.md }}>
        <div>
          <label style={labelStyle}>Top offset (in)</label>
          <input type="number" step="0.01" style={inputStyle} placeholder="0.00" value={formData.topOffset} onChange={(e) => setFormData({ ...formData, topOffset: e.target.value })} />
        </div>
        <div>
          <label style={labelStyle}>Left offset (in)</label>
          <input type="number" step="0.01" style={inputStyle} placeholder="0.00" value={formData.leftOffset} onChange={(e) => setFormData({ ...formData, leftOffset: e.target.value })} />
        </div>
        <div>
          <label style={labelStyle}>Rotate (°)</label>
          <select style={inputStyle} value={formData.rotation} onChange={(e) => setFormData({ ...formData, rotation: e.target.value })}>
            <option value="0">0°</option>
            <option value="90">90°</option>
            <option value="180">180°</option>
            <option value="270">270°</option>
          </select>
        </div>
      </div>
      <StepNav step={1} total={steps.length} onNext={handleNext} onPrev={handlePrev} />
    </div>,

    // Step 2: Label quantity
    <div key="quantity" style={{ display: 'flex', flexDirection: 'column', gap: spacing.md, width: '100%', minWidth: 0 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.md }}>
        <div>
          <label style={labelStyle}>Total quantity</label>
          <input type="number" style={inputStyle} placeholder="Enter quantity" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} />
        </div>
        <div>
          <label style={labelStyle}>Labels per reel</label>
          <input type="number" style={inputStyle} placeholder="e.g. 500" value={formData.perReel} onChange={(e) => setFormData({ ...formData, perReel: e.target.value })} />
        </div>
      </div>
      <div>
        <label style={labelStyle}>Reels needed</label>
        <div
          style={{
            ...inputStyle,
            backgroundColor: colors.surface.lightDarker,
            display: 'flex',
            alignItems: 'center',
            color: (formData.quantity && formData.perReel) ? colors.text.highEmphasis.onLight : colors.text.lowEmphasis.onLight,
          }}
        >
          {formData.quantity && formData.perReel
            ? Math.ceil(parseInt(formData.quantity) / parseInt(formData.perReel))
            : '—'}
        </div>
      </div>
      <StepNav step={2} total={steps.length} onNext={handleNext} onPrev={handlePrev} />
    </div>,

    // Step 3: Print job settings
    <div key="settings" style={{ display: 'flex', flexDirection: 'column', gap: spacing.md, width: '100%', minWidth: 0 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: spacing.md }}>
        <div>
          <label style={labelStyle}>Job name</label>
          <input type="text" style={{ ...inputStyle, width: '100%', minWidth: 0 }} value={formData.jobName} onChange={(e) => setFormData({ ...formData, jobName: e.target.value })} />
        </div>
        <div>
          <label style={labelStyle}>Scheduled date</label>
          <input type="date" style={{ ...inputStyle, width: '100%', minWidth: 0 }} defaultValue={new Date().toISOString().split('T')[0]} />
        </div>
      </div>
      <StepNav step={3} total={steps.length} onNext={handleNext} onPrev={handlePrev} lastLabel="Finish" />
    </div>,
  ]

  return (
    <FullScreenModal
      open={isOpen}
      onClose={onClose}
      title="New print job"
      columns={3}
      headerButtons={[
        { label: 'Save', emphasis: 'low', onClick: () => {} },
        { label: 'Print now', emphasis: 'high', onClick: () => {}, disabled: currentStep < steps.length - 1 },
      ]}
    >
      {/* Left panel: Wizard */}
      <FullScreenModalPanel
        sticky
        className="col-span-1 h-[calc(100vh-64px)] !p-0 [&>div]:!p-0 [&>div]:!overflow-x-clip !min-w-0"
      >
        <div style={{ width: '100%', padding: `${spacing.xs} ${spacing.xl}`, boxSizing: 'border-box', minWidth: 0 }}>
          <LinearStepper
            steps={steps}
            activeStep={currentStep}
            onStepChange={setCurrentStep}
            stepContent={stepContent}
            clickable
          />
        </div>
      </FullScreenModalPanel>

      {/* Right panel: Preview */}
      <FullScreenModalPanel
        background="muted"
        border="left"
        sticky
        className="col-span-2 h-[calc(100vh-64px)] !p-0"
      >
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            height: '100%',
            backgroundColor: '#111',
            backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        >
          {/* Preview header + toolbar row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              padding: `${spacing.lg} ${spacing.xl} ${spacing.md}`,
            }}
          >
            <div>
              <div
                style={{
                  ...typography.body.xs,
                  fontWeight: fontWeights.semibold,
                  color: 'rgba(255,255,255,0.6)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '2px',
                }}
              >
                Print preview
              </div>
              <h2 style={{ ...typography.heading.h4, color: '#fff', margin: 0 }}>
                Match label size (1-up)
              </h2>
            </div>

            {/* Dark toolbar pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#2a2a2a',
                borderRadius: borderRadius.full,
                padding: '6px 12px',
                color: '#fff',
                flexShrink: 0,
                border: '1px solid #444',
              }}
            >
              <ToolbarBtn onClick={() => setPreviewPage((p) => Math.max(0, p - 1))}><ChevronLeft size={14} /></ToolbarBtn>
              <span style={{ fontFamily: fontFamilies.mono, fontSize: '12px', opacity: 0.7, minWidth: '36px', textAlign: 'center' }}>
                {previewPage + 1} / 3
              </span>
              <ToolbarBtn onClick={() => setPreviewPage((p) => Math.min(2, p + 1))}><ChevronRight size={14} /></ToolbarBtn>
              <div style={{ width: '1px', height: '16px', backgroundColor: '#555', margin: '0 4px' }} />
              <ToolbarBtn><Minus size={14} /></ToolbarBtn>
              <ToolbarBtn><Plus size={14} /></ToolbarBtn>
              <ToolbarBtn><RotateCcw size={14} /></ToolbarBtn>
              <ToolbarBtn><Highlighter size={14} /></ToolbarBtn>
              <ToolbarBtn><Undo size={14} /></ToolbarBtn>
              <ToolbarBtn><Redo size={14} /></ToolbarBtn>
              <ToolbarBtn><Maximize size={14} /></ToolbarBtn>
              <ToolbarBtn><Download size={14} /></ToolbarBtn>
            </div>
          </div>

          {/* Dark canvas with labels */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: spacing.xl,
              padding: `${spacing['2xl']} ${spacing.xl}`,
            }}
          >
            {(() => {
              const templateSize = formData.template ? getTemplateSize(formData.template) : { w: 3, h: 1.5, label: '3" × 1.5"' }
              const layoutInfo = formData.layout ? getLayoutCount(formData.layout) : { count: 1, rotated: false }
              const perPage = layoutInfo.count
              const isRotated = layoutInfo.rotated
              const isGrid = perPage >= 4

              const labelW = isRotated ? templateSize.h : templateSize.w
              const labelH = isRotated ? templateSize.w : templateSize.h
              const cols = isGrid ? Math.ceil(Math.sqrt(perPage)) : perPage
              const rows = isGrid ? Math.ceil(perPage / cols) : 1

              const sheetW = labelW * cols
              const sheetH = labelH * rows
              const aspectRatio = sheetW / sheetH

              return (
                <div style={{ display: 'inline-flex', flexDirection: 'column', maxWidth: '100%' }}>
                  {formData.template && (
                    <div style={{ fontSize: '10px', color: '#999', marginBottom: spacing.xs, fontFamily: fontFamilies.mono }}>
                      Page {previewPage + 1} &middot; {templateSize.label} &middot; {formData.layout || 'Standard'} &middot; {perPage}-up
                    </div>
                  )}
                  <div
                    style={{
                      display: 'inline-grid',
                      gridTemplateColumns: `repeat(${cols}, auto)`,
                      gridTemplateRows: `repeat(${rows}, auto)`,
                      gap: 0,
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: borderRadius.sm,
                      overflow: 'hidden',
                    }}
                  >
                    {Array.from({ length: perPage }, (_, i) => (
                      <div key={i} style={{ transform: formData.rotation !== '0' ? `rotate(${formData.rotation}deg)` : undefined }}>
                        <ComplianceLabel
                          data={formData}
                          scale={1}
                          rotated={false}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      </FullScreenModalPanel>
    </FullScreenModal>
  )
}
