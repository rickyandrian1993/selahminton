import Loading from '@/components/Loading'
import Search from '@/components/Search'
import Link from 'next/link'
import { Suspense } from 'react'
import ProductGrid from './ProductGrid'

interface ProductPageProps {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function ProductPage({ searchParams }: ProductPageProps) {
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

  return (
    <div className="mt-4 flex flex-col items-center w-full gap-4">
      <Link
        className="w-full bg-[#ecebe8] rounded-xl shadow hover:shadow-lg p-2 flex flex-col items-center text-center transition-all duration-200 transform hover:scale-105 hover:cursor-pointer"
        href={'/products/form'}
      >
        Add New Product
      </Link>
      <Link
        className="w-full bg-[#ecebe8] rounded-xl shadow hover:shadow-lg p-2 flex flex-col items-center text-center transition-all duration-200 transform hover:scale-105 hover:cursor-pointer"
        href={'/'}
      >
        Back to Home
      </Link>

      <Search />

      {/* Products grid with Suspense */}
      <Suspense fallback={<Loading />}>
        <ProductGrid page={page} search={search} />
      </Suspense>
    </div>
  )
}
