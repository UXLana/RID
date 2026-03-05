'use client'

import React from 'react'
import ComingSoon from '@/local-components/ComingSoon'
import { Settings } from 'lucide-react'

export default function AdminPage() {
  return (
    <ComingSoon 
      title="Admin" 
      description="System settings and configuration." 
      icon={<Settings size={32} />}
    />
  )
}
