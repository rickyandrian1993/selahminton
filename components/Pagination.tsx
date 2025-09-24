import Link from 'next/link'

type PaginationProps = {
  totalPages: number
  page: number
  search?: string
}

export default function Pagination({
  totalPages,
  page,
  search
}: PaginationProps) {
  const query = search ? `&search=${encodeURIComponent(search)}` : ''

  return (
    totalPages > 1 && (
      <div className="flex justify-center gap-4 w-full mt-3 px-4">
        {page > 1 ? (
          <Link
            href={`/products?page=${page - 1}${query}`}
            className="text-sm px-4 py-1 rounded-lg transition bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            ◀ Prev
          </Link>
        ) : (
          <button
            className="text-sm px-4 py-1 rounded-lg transition bg-gray-200 text-gray-400 cursor-not-allowed"
            disabled
          >
            ◀ Prev
          </button>
        )}
        <span className="text-sm text-gray-500">
          Page {page} of {totalPages}
        </span>
        {page < totalPages ? (
          <Link
            href={`/products?page=${page + 1}${query}`}
            className="text-sm px-4 py-1 rounded-lg transition bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            Next ▶
          </Link>
        ) : (
          <button
            className="text-sm px-4 py-1 rounded-lg transition bg-gray-200 text-gray-400 cursor-not-allowed"
            disabled
          >
            Next ▶
          </button>
        )}
      </div>
    )
  )
}
