'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export const HoveredLink = ({ children, ...props }: any) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      {...props}
      className="text-neutral-700 hover:text-neutral-900 transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  )
} 