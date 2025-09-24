'use client'

import { FormEvent, useState } from 'react'

export default function Authentication({
  setIsAuthentication
}: {
  setIsAuthentication: () => void
}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      const data = await res.json()
      if (res.ok && data.ok) {
        // Demo success: close modal & show a tiny success message
        setUsername('')
        setPassword('')
        setIsAuthentication()
      } else {
        setError(data?.message ?? 'Unknown error')
      }
    } catch (err) {
      setError('Network error')
      console.error('Error during login:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-4 w-full max-w-md mt-6 flex flex-col gap-3"
    >
      <h2 className="text-lg font-semibold text-gray-700">Credential Check</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          required
          autoFocus
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          required
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md transition disabled:opacity-50"
      >
        {loading ? 'Checking...' : 'Login'}
      </button>
    </form>
  )
}
