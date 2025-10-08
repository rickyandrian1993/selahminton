import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  image_url: string;
  name: string;
  link: string;
}

export default function ProductCard({
  image_url,
  name,
  link,
}: ProductCardProps) {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center bg-[#ecebe8] rounded-xl shadow hover:shadow-lg p-3 transition-all duration-200 transform hover:scale-105 w-full"
    >
      <div className="relative w-full h-40 rounded-lg overflow-hidden mb-2">
        <Image
          src={image_url || "/placeholder.png"}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 200px"
          className="object-cover"
          priority
        />
      </div>
      <h3 className="text-sm font-medium text-gray-700 hover:text-pink-500 transition line-clamp-2">
        {name}
      </h3>
    </Link>
  );
}
