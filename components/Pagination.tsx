type PaginationProps = {
  totalPages: number;
  page: number;
  handlePrev: () => void;
  handleNext: () => void;
};

export default function Pagination({
  totalPages,
  page,
  handlePrev,
  handleNext,
}: PaginationProps) {
  return (
    totalPages > 1 && (
      <div className="flex justify-center gap-4 w-full mt-3 px-4">
        <button
          onClick={handlePrev}
          disabled={page === 0}
          className={`text-sm px-4 py-1 rounded-lg transition ${
            page === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          ◀ Prev
        </button>
        <span className="text-sm text-gray-500">
          Page {page + 1} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page + 1 >= totalPages}
          className={`text-sm px-4 py-1 rounded-lg transition ${
            page + 1 >= totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Next ▶
        </button>
      </div>
    )
  );
}
