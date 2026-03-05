'use client'

import React from 'react'
import ComingSoon from '@/local-components/ComingSoon'
import { Tag } from 'lucide-react'
import { useParams } from 'next/navigation'

export default function ProductDetailsPage() {
  const params = useParams()
  const id = params.id as string

  return (
    <ComingSoon 
      title="Product Details" 
      description={`Detailed view for product ${id}.`} 
      icon={<Tag size={32} />}
    />
  )
}
