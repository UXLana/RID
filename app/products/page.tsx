'use client'

import React from 'react'
import ComingSoon from '@/local-components/ComingSoon'
import { Tag } from 'lucide-react'

export default function ProductsPage() {
  return (
    <ComingSoon 
      title="Products" 
      description="View and manage your product catalog." 
      icon={<Tag size={32} />}
    />
  )
}
