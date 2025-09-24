'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Search() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // initialize once from current URL
  const [value, setValue] = useState(() => searchParams.get('search') || '')

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(window.location.search)

      if (value.trim()) {
        params.set('search', value.trim())
        params.set('page', '1') // reset page only when typing
      } else {
        params.delete('search')
      }

      router.push(`/products?${params.toString()}`)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [value, router])

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full max-w-md px-4 py-2 rounded-lg border bg-[#ecebe8] border-[#ecebe8] 
                 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
    />
  )
}
