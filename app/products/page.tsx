"use client";

import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import { Product } from "@/types/product";
import { supabase } from "@/utils/supabase";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const ITEMS_PER_PAGE = 6;

export default function ProductPage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [open, setOpen] = useState(false);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handlePrev = () => setPage((p) => Math.max(p - 1, 0));
  const handleNext = () => {
    if (page + 1 < totalPages) {
      setPage((p) => p + 1);
    }
  };

  // 🔁 Reset to page 0 when search changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(0);
  };

  // ⏳ Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => clearTimeout(handler);
  }, [search]);

  const handleProductClick = (url: string) => {
    window.open(url, "_blank");
  };

  const loadProduct = useCallback(async () => {
    try {
      setLoading(true);

      const from = page * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      let query = supabase
        .from("products")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

      // apply search with debounce
      if (debouncedSearch.trim() !== "") {
        query = query.or(`name.ilike.%${debouncedSearch}%`);
      }

      const { data, count, error } = await query;
      if (error) throw error;

      setProducts(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      alert("Error load products!");
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch]);

  useEffect(() => {
    loadProduct();
  }, [page, debouncedSearch, loadProduct]);

  return (
    <div className="mt-4 flex flex-col items-center w-full gap-4">
      {/* Back to Home */}
      <button
        className="w-full bg-[#ecebe8] rounded-xl shadow hover:shadow-lg p-2 flex flex-col items-center text-center transition-all duration-200 transform hover:scale-105 hover:cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Add new product
      </button>
      {open && <Modal setIsOpen={setOpen} />}
      <Link
        className="w-full bg-[#ecebe8] rounded-xl shadow hover:shadow-lg p-2 flex flex-col items-center text-center transition-all duration-200 transform hover:scale-105 hover:cursor-pointer"
        href={"/"}
      >
        Back to Home
      </Link>

      {loading && <Loading />}

      {!loading && (
        <>
          <Search onSearchChange={handleSearchChange} search={search} />
          <div className="grid grid-cols-2 gap-4 w-full">
            {products.map((product) => (
              <button
                key={product.id}
                className="bg-[#ecebe8] rounded-xl shadow hover:shadow-lg p-4 flex flex-col items-center text-center transition-all duration-200 transform hover:scale-105 hover:cursor-pointer"
                onClick={() => handleProductClick(product.link)}
              >
                <Image
                  src={product.image_url}
                  alt={product.name}
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-md object-cover mb-2"
                />
                <span className="text-sm font-medium text-gray-700 hover:text-pink-500 transition line-clamp-2">
                  {product.name}
                </span>
              </button>
            ))}
          </div>

          {/* Pagination Controls */}
          <Pagination
            handleNext={handleNext}
            handlePrev={handlePrev}
            page={page}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
}

