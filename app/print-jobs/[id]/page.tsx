'use client'

import React from 'react'
import ComingSoon from '@/local-components/ComingSoon'
import { Printer } from 'lucide-react'
import { useParams } from 'next/navigation'

export default function JobDetailsPage() {
  const params = useParams()
  const id = params.id as string

  return (
    <ComingSoon 
      title="Print Job Details" 
      description={`Detailed view for print job ${id}.`} 
      icon={<Printer size={32} />}
    />
  )
}
