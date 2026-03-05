'use client'

import React from 'react'
import ComingSoon from '@/local-components/ComingSoon'
import { LayoutTemplate } from 'lucide-react'

export default function TemplatesPage() {
  return (
    <ComingSoon 
      title="Templates" 
      description="Manage and customize your label templates here." 
      icon={<LayoutTemplate size={32} />}
    />
  )
}
