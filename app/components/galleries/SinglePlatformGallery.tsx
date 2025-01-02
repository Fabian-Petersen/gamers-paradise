import React, { useState, useEffect } from "react";
import { Game, ApiResponse } from "@/app/lib/types";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingSpinner from "../LoadingSpinner";
import Pagination from "../Pagination";

type GamesGalleryProps = {
  data: Game[] | undefined;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  count: number | undefined;
};
// $ Pass the games data from the Galleries Component to the SinglePlatformGallery Component to render the games which belong to a specific platform
const SinglePlatformGallery = ({
  data,
  isPending,
  isError,
  error,
  count,
}: GamesGalleryProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize currentPage from URL or default to 1
  const [currentPage, setCurrentPage] = useState(1);
  // Update currentPage when searchParams changes
  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1");
    setCurrentPage(page);
  }, [searchParams]);

  // $ Handle the page change when the user clicks on the pagination buttons
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // $ Handle the loading state of the data
  if (isPending) return <LoadingSpinner />;
  if (isError) return <div>Error loading data: {error?.message}</div>;
  if (!data || data.length === 0)
    return (
      <div className="flex justify-center align-middle">No Games Found</div>
    );

  // $ Calculate totalPages only when we have data
  // ! Check the count data for the platform and ensure it is correctly calculated
  const totalPages = Math.ceil((count || 0) / (data.length || 1));

  // $ Render the games data for the specific platform
  return (
    <section className="grid grid-cols-gallery gap-4">
      {data?.map((game) => (
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
      {totalPages > 1 && (
        <div className="col-span-full mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
};

export default SinglePlatformGallery;
