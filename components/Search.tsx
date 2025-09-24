"use client";

import { useEffect, useState } from "react";

export default function Search({
  search,
  onSearchChange,
  delay = 500,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  delay?: number;
}) {
  const [inputValue, setInputValue] = useState(search);

  // ⏳ Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(inputValue);
    }, delay);

    return () => clearTimeout(handler);
  }, [inputValue, delay, onSearchChange]);

  return (
    <input
      type="text"
      className="w-full max-w-md px-4 py-2 rounded-lg border bg-[#ecebe8] border-[#ecebe8] focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
      placeholder="Search products..."
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}
