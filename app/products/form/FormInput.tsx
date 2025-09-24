'use client'

import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import Authentication from './Authentication'

export default function FormInput() {
  const [isAuthentication, setIsAuthentication] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [loading, setLoading] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    link: ''
  })

  const router = useRouter()

  // Handle text input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewProduct((prev) => ({ ...prev, [name]: value }))
  }

  // Handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Only image files are allowed.')
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fileInputRef.current?.files?.[0]) {
      alert('Please select an image')
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', newProduct.name)
      formData.append('link', newProduct.link)
      formData.append('image', fileInputRef.current.files[0])

      const res = await fetch('/api/product', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save')

      router.refresh()

      alert('✅ Product added successfully!')
      setNewProduct({ name: '', link: '' })
      if (fileInputRef.current) fileInputRef.current.value = ''
    } catch (err) {
      alert('❌ Error: ' + (err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {!isAuthentication ? (
        <Authentication setIsAuthentication={() => setIsAuthentication(true)} />
      ) : (
        <form
          onSubmit={handleAddProduct}
          className="bg-white rounded-xl shadow p-4 w-full max-w-md mt-6 flex flex-col gap-3"
        >
          <h2 className="text-lg font-semibold text-gray-700">
            Add New Product
          </h2>

          <input
            autoComplete="off"
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="border p-2 rounded"
            required
          />

          <input
            autoComplete="off"
            type="url"
            name="link"
            value={newProduct.link}
            onChange={handleInputChange}
            placeholder="Product URL"
            className="border p-2 rounded"
            required
          />

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="border p-2 rounded"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Add Product'}
          </button>
        </form>
      )}
    </>
  )
}
