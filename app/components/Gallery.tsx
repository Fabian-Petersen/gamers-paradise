"use client";

import { useState } from "react";
import { useFetchGames } from "../utils/useFetchItems";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";
import Pagination from "./Pagination";

const Gallery = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre") || undefined;
  const platforms = searchParams.get("platforms") || undefined;
  const store = searchParams.get("store") || undefined;
  const startDate = searchParams.get("startDate")
    ? new Date(searchParams.get("startDate")!)
    : undefined;
  const endDate = searchParams.get("endDate")
    ? new Date(searchParams.get("endDate")!)
    : undefined;
  const ordering = searchParams.get("ordering") || undefined;
  console.log("searchParams:", platforms);
  console.log("genreParams:", genre);
  console.log("storeParams:", store);

  const [currentPage, setCurrentPage] = useState(1);
  const { data, isPending, isError } = useFetchGames({
    genre,
    platforms,
    store,
    startDate,
    endDate,
    ordering,
    page: currentPage,
    page_size: 40,
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Update URL with new page number
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isPending) return <LoadingSpinner />;
  if (isError) return <div>Error loading data</div>;
  if (!data?.results)
    return (
      <div className="grid place-content-center w-full h-full">
        No Games found
      </div>
    );

  // API returns total count in data.count
  const totalPages = Math.ceil(data.count / data.results.length);

  return (
    <section className="grid max-w-7xl mx-auto grid-cols-gallery gap-4 pt-[var(--pageTopPadding)] px-4 h-auto dark:bg-gray-900">
      {data.results.map((game) => (
        <div
          key={game.id}
          className="group rounded-lg overflow-hidden shadow-lg hover:cursor-pointer hover:scale-[102%] dark:hover:border-gray-200 dark:hover:border hover:border-gray-800 hover:border transition-scale duration-100 bg-white dark:bg-gray-600 dark:text-gray-300"
          onClick={() => router.push(`/${game.id}`)}
        >
          <div className="relative h-48">
            <Image
              src={game.background_image}
              alt={game.name}
              fill
              sizes="100%"
              priority
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold">{game.name}</h2>
            <p>Released: {new Date(game.released).toLocaleDateString()}</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500">★</span>
              <span className="ml-1">{game.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      ))}
      <div className="w-full col-span-full">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default Gallery;
