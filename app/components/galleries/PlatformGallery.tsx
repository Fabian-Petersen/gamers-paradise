"use client";

import {
  ApiResponse,
  ParentPlatformsResponse,
  PlatformItems,
  Platforms,
} from "@/app/lib/types";
import React, { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Pagination from "../Pagination";

type PlatformsGalleryProps = {
  data: ParentPlatformsResponse | undefined;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
};

function PlatformsGallery({
  data,
  isPending,
  isError,
  error,
}: PlatformsGalleryProps) {
  if (isPending) return <LoadingSpinner />;
  if (isError) return <div>Error loading data: {error?.message}</div>;
  if (!data) return <div>No Genres found</div>;
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
  if (isError) return <div>Error loading data: {error?.message}</div>;
  const count = 20;
  // console.log(data.results.length);
  // $ Calculate totalPages only when we have data
  const totalPages = Math.ceil((count || 0) / (data.results.length || 1));

  const platformsItemsArray = data.results;

  return (
    <>
      {platformsItemsArray.map((platformItem) => (
        <div
          key={platformItem.id}
          className="group rounded-lg overflow-hidden shadow-lg hover:cursor-pointer  dark:hover:border-gray-200 dark:hover:border hover:border-gray-800 bg-white dark:bg-gray-600 dark:text-gray-300 hover:border transition-scale duration-100 transition-scale-[101%] h-auto"
          onClick={() => router.push(`/platforms/${platformItem.id}`)}
        >
          <div className="relative h-48 hover:scale-[105%]">
            <Image
              src={platformItem.platforms.image_background}
              alt={platformItem.name}
              fill
              sizes="100%"
              priority
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold">{platformItem.name}</h2>
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
export default PlatformsGallery;
