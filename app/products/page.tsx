"use client";

import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import { useDebounce } from "@/hooks/useDebounce";
import { useProducts } from "@/hooks/useProducts";
import Link from "next/link";
import { useState } from "react";
import ProductList from "./ProductList";

export default function ProductPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const debouncedSearch = useDebounce(search, 1000);

  const { products, loading, totalCount, ITEMS_PER_PAGE } = useProducts(
    debouncedSearch,
    page
  );

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="mt-4 flex flex-col item-center w-full gap-4">
      <Link
        className="w-full bg-[#ecebe8] rounded-xl shadow hover:shadow-lg p-2 flex flex-col items-center text-center transition-all duration-200 transform hover:scale-105 hover:cursor-pointer"
        href={"/products/form"}
      >
        Add New Product
      </Link>
      <Link
        className="w-full bg-[#ecebe8] rounded-xl shadow hover:shadow-lg p-2 flex flex-col items-center text-center transition-all duration-200 transform hover:scale-105 hover:cursor-pointer"
        href={"/"}
      >
        Back to Home
      </Link>

      <Search
        search={search}
        onSearchChange={(val) => {
          setSearch(val);
          setPage(0);
        }}
      />

      {loading ? <Loading /> : <ProductList products={products} />}

      <Pagination
        page={page}
        totalPages={totalPages}
        handleNext={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
        handlePrev={() => setPage((p) => Math.max(p - 1, 0))}
      />
    </div>
  );
}
