"use client";

import { Genres, ApiResponse } from "@/app/lib/types";
import React, { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import LoadingElement from "../LoadingElement";

import Pagination from "../Pagination";
import { ChevronLeft } from "lucide-react";

type GenresGalleryProps = {
  data: ApiResponse<Genres> | undefined;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
};

function GenresGallery({
  data,
  isPending,
  isError,
  error,
}: GenresGalleryProps) {
  if (isPending) return <LoadingSpinner />;
  if (isError) return <div>Error loading data: {error?.message}</div>;
  if (!data?.results) return <div>No Genres found</div>;
  console.log("number of different genres", data.results.length);

  const searchParams = useSearchParams();
  const router = useRouter();
  // Initialize currentPage from URL or default to 1
  const [currentPage, setCurrentPage] = useState(1);
  // Update currentPage when searchParams changes
  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1");
    setCurrentPage(page);
  }, [searchParams]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isPending) return <LoadingSpinner />;
  if (isError)
    return (
      <div className="flex justify-center w-full items-center border border-red-500">
        Error loading data: {error?.message}
        <button onClick={() => router.back()} className="p-2">
          <ChevronLeft />
        </button>
      </div>
    );

  // console.log(data.results.length);
  // $ Calculate totalPages only when we have data
  const totalPages = Math.ceil((data.count || 0) / (data.results.length || 1));

  return (
    <>
      {data.results.map((genre) => (
        <div
          key={genre.id}
          className="group rounded-lg overflow-hidden shadow-lg hover:cursor-pointer  dark:hover:border-gray-200 dark:hover:border hover:border-gray-800 bg-white dark:bg-gray-600 dark:text-gray-300 hover:border transition-scale duration-100 transition-scale-[101%] h-auto"
          onClick={() => router.push(`/genres/${genre.id}`)}
        >
          <figure className="relative h-48 hover:scale-[105%]">
            <Image
              src={genre.image_background}
              alt={genre.name}
              fill
              sizes="100%"
              priority
            />
          </figure>
          <div className="p-4">
            <h2 className="text-xl font-bold">{genre.name}</h2>
          </div>
        </div>
      ))}
      {totalPages > 1 && (
        <div className="col-span-full mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
}
export default GenresGallery;
