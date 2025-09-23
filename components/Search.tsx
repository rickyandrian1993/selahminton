import { useEffect, useRef } from "react";

type SearchProps = {
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Search({ search, onSearchChange }: SearchProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.selectionStart = inputRef.current.value.length;
    }
  }, [search]);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={onSearchChange}
      className="w-full max-w-md px-4 py-2 rounded-lg border bg-[#ecebe8] border-[#ecebe8] focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
    />
  );
}
