"use client";

import { Product } from "@/types/product";
import { supabase } from "@/utils/supabase";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ProductForm() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    link: "",
  });

  // Handle text input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setImageFile(file);
  };

  // Submit form
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl: string | null = null;

      // 1. Upload image to Supabase Storage
      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("products") // ⚠️ bucket name must match your setup
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        // 2. Get the public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from("products").getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      // 3. Insert product into DB with image URL
      const { error: insertError } = await supabase.from("products").insert([
        {
          name: newProduct.name,
          link: newProduct.link,
          image_url: imageUrl,
        },
      ]);

      if (insertError) throw insertError;

      // 4. Reset form
      setNewProduct({ name: "", link: "" });
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      // 5. Reload products
      await loadProducts();
    } catch (err) {
      console.error("Error inserting product:", err);
      alert("Failed to save product: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Load products from Supabase
  const loadProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select()
      .order("created_at", { ascending: false });

    setProducts(data || []);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <Link
        className="w-full bg-[#ecebe8] rounded-xl shadow hover:shadow-lg p-2 flex flex-col items-center text-center transition-all duration-200 transform hover:scale-105 hover:cursor-pointer"
        href={"/products"}
      >
        Back to Products
      </Link>
      {/* Add New Product Form */}
      <form
        onSubmit={handleAddProduct}
        className="bg-white rounded-xl shadow p-4 w-full max-w-md mt-6 flex flex-col gap-3"
      >
        <h2 className="text-lg font-semibold text-gray-700">Add New Product</h2>

        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          placeholder="Product Name"
          className="border p-2 rounded"
          required
        />

        <input
          type="url"
          name="link"
          value={newProduct.link}
          onChange={handleInputChange}
          placeholder="Product URL"
          className="border p-2 rounded"
          required
        />

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Product"}
        </button>
      </form>

      {/* Show products */}
      <div className="w-full max-w-md mt-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Products from Supabase
        </h2>
        <div className="flex flex-col gap-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-[#ecebe8] rounded-xl shadow p-3 flex items-center gap-3"
            >
              {p.image_url && (
                <Image
                  src={p.image_url}
                  alt={p.name}
                  width={48}
                  height={48}
                  className="rounded object-cover w-12 h-12"
                />
              )}
              <div className="flex flex-col text-sm">
                <span className="font-medium">{p.name}</span>
                <span className="text-gray-600 truncate">{p.link}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
