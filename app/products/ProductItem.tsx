import Image from 'next/image'
import Link from 'next/link'

interface ProductItemProps {
  image_url: string
  name: string
  link: string
}

export default function ProductItem({
  image_url,
  name,
  link
}: ProductItemProps) {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center bg-[#ecebe8] rounded-xl shadow hover:shadow-lg p-3 
                 transition-all duration-200 transform hover:scale-105 w-full"
    >
      <div className="relative w-full h-40 rounded-lg overflow-hidden mb-2">
        <Image
          src={image_url || '/placeholder.png'}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 200px"
          className="object-cover"
        />
      </div>
      <h3 className="text-sm font-medium text-gray-800 text-center truncate w-full">
        {name}
      </h3>
    </Link>
  )
}
