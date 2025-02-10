'use client'

import Image from 'next/image'
import Link from 'next/link'

interface ProductItemProps {
  title: string
  description: string
  href: string
  src: string
}

export const ProductItem = ({
  title,
  description,
  href,
  src
}: ProductItemProps) => {
  return (
    <Link href={href} className="flex items-start space-x-4 rounded-lg p-2 hover:bg-gray-100">
      <div className="flex-shrink-0 relative w-12 h-12">
        {src && <Image src={src} alt={title} fill className="object-cover rounded-lg" />}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </Link>
  )
} 