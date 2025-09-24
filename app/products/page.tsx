import Pagination from '@/components/Pagination'
import Search from '@/components/Search'
import { createServerClient } from '@/utils/supabase-server'
import Link from 'next/link'
import ProductItem from './ProductItem'

interface ProductPageProps {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const supabase = createServerClient()

  // ✅ Await the searchParams if needed
  const params = await Promise.resolve(searchParams)

  // Page number
  const pageParam = Array.isArray(params?.page) ? params.page[0] : params?.page
  const page = parseInt(pageParam || '1', 10)

  // Search query
  const searchParam = Array.isArray(params?.search)
    ? params.search[0]
    : params?.search
  const search = searchParam?.trim() || ''

  const PAGE_SIZE = 6
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  // Build query
  let query = supabase
    .from('products')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (search) {
    query = query.ilike('name', `%${search}%`)
  }

  const { data: products, count, error } = await query

  const totalPages = Math.ceil((count || 0) / PAGE_SIZE)

  return (
    <div className="mt-4 flex flex-col items-center w-full gap-4">
      <Link
        className="w-full bg-[#ecebe8] rounded-xl shadow hover:shadow-lg p-2 flex flex-col items-center text-center transition-all duration-200 transform hover:scale-105 hover:cursor-pointer"
        href={'/'}
      >
        Back to Home
      </Link>

      <Search />

      {error ? (
        <div className="text-red-500">
          Error loading products: {error.message}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 w-full">
          {products?.map((p) => (
            <ProductItem
              key={p.id}
              image_url={p.image_url}
              link={p.link}
              name={p.name}
            />
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} search={search} />
    </div>
  )
}
