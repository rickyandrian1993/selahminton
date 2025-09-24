import Pagination from '@/components/Pagination'
import { createServerClient } from '@/utils/supabase-server'
import ProductItem from './ProductItem'

interface ProductGridProps {
  page: number
  search: string
}

export default async function ProductGrid({ page, search }: ProductGridProps) {
  const supabase = createServerClient()

  const PAGE_SIZE = 6
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

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

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>
  }

  return (
    <>
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
      <Pagination page={page} totalPages={totalPages} search={search} />
    </>
  )
}
