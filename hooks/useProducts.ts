import { supabaseBrowser } from "@/libs/supabase";
import { Product } from "@/types/product";
import { useCallback, useEffect, useState } from "react";

const ITEMS_PER_PAGE = 6;

export function useProducts(search: string, page: number) {
  const supabase = supabaseBrowser();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const from = page * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      let query = supabase
        .from("products")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

      if (search.trim() !== "") {
        query = query.or(`name.ilike.%${search}%`);
      }

      const { data, count, error } = await query;
      if (error) throw error;

      setProducts(data || []);
      setTotalCount(count || 0);
    } catch (err) {
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  }, [page, search, supabase]);

  useEffect(() => {
    loadProducts();
  }, [page, search, loadProducts]);

  return { products, loading, totalCount, ITEMS_PER_PAGE };
}