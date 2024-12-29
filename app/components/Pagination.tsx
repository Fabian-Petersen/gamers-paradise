import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const updatePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    onPageChange(newPage);
  };

  const renderPageNumbers = () => {
    const pages = [];

    // First 5 pages
    for (let i = 1; i <= Math.min(5, totalPages); i++) {
      pages.push(
        <button
          key={`page-${i}`}
          onClick={() => updatePage(i)}
          className={`px-4 py-2 rounded-full text-clampBodyText border ${
            i === currentPage
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }

    // Current page if it's greater than 5
    if (currentPage > 5) {
      pages.push(
        <button
          key={`page-${currentPage}`}
          onClick={() => updatePage(currentPage)}
          className="px-4 py-2 rounded-full border bg-blue-500 text-white"
        >
          {currentPage}
        </button>
      );
    }

    // Ellipsis and last page if there are more pages
    if (totalPages > 5) {
      pages.push(
        <span key="ellipsis" className="px-4 py-2">
          ...
        </span>,
        <button
          key={`page-${totalPages}`}
          onClick={() => updatePage(totalPages)}
          className={`px-4 py-2 rounded-full border text-clampBodyText ${
            totalPages === currentPage
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          Last Page
        </button>
      );
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 my-8 dark:hover:bg">
      <button
        onClick={() => updatePage(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-full border enabled:hover:bg-gray-100 dark:enabled:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => updatePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full border enabled:hover:bg-gray-100 dark:enabled:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
