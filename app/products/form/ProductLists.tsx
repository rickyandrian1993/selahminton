import { createServerClient } from '@/utils/supabase-server'
import Image from 'next/image'

export default async function ProductLists() {
  const supabase = createServerClient()
  const {
    data: products,
    count,
    error
  } = await supabase
    .from('products')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>
  }

  return (
    <div className="w-full max-w-md mt-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">
        {`${count} Products from Supabase`}
      </h2>
      <div className="flex flex-col gap-3">
        {products?.map((p) => (
          <div
            key={p.id}
            className="bg-[#ecebe8] rounded-xl shadow p-3 flex items-center gap-3"
          >
            {p.image_url && (
              <Image
                src={p.image_url}
                alt={p.name}
                width={48}
                height={48}
                className="rounded object-cover w-12 h-12"
              />
            )}
            <div className="flex flex-col text-sm">
              <span className="font-medium">{p.name}</span>
              <span className="text-gray-600 truncate">{p.link}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
