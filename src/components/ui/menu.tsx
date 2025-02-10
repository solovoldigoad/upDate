'use client'

import React from 'react'

interface MenuProps {
  children: React.ReactNode
  setActive: (value: string | null) => void
}

interface MenuItemProps {
  children: React.ReactNode
  item: string
  setActive: (value: string | null) => void
  active: string | null
}

export function Menu({ children, setActive }: MenuProps) {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-transparent px-8"
    >
      <ul className="flex items-center gap-4">{children}</ul>
    </nav>
  )
}

export function MenuItem({ children, item, setActive, active }: MenuItemProps) {
  return (
    <li
      onMouseEnter={() => setActive(item)}
      className="relative rounded-full px-4 py-2 hover:bg-gray-100"
    >
      <span className="text-sm">{item}</span>
      {active === item && (
        <div className="absolute left-0 top-full pt-4">
          <div className="rounded-lg bg-white p-4 shadow-xl">{children}</div>
        </div>
      )}
    </li>
  )
} 