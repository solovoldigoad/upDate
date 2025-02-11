'use client'

import Link from 'next/link'
import { useState } from 'react'

interface HoveredLinkProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode;
}

export const HoveredLink = ({ children, ...props }: HoveredLinkProps) => {
  const [, setIsHovered] = useState(false)

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