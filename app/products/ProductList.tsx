import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      {products?.map((p) => (
        <ProductCard
          key={p.id}
          image_url={p.image_url}
          link={p.link}
          name={p.name}
        />
      ))}
    </div>
  );
}
