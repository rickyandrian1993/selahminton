import Link from 'next/link'
import FormInput from './FormInput'
import ProductLists from './ProductLists'

export default function ProductForm() {
  return (
    <>
      <Link
        className="w-full bg-[#ecebe8] rounded-xl shadow hover:shadow-lg p-2 flex flex-col items-center text-center transition-all duration-200 transform hover:scale-105 hover:cursor-pointer mt-4"
        href={'/products'}
      >
        Back to Products
      </Link>
      {/* Add New Product Form */}
      <FormInput />

      <ProductLists />
    </>
  )
}
