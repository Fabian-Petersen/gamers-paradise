"use client";

import { useState } from "react";
import { useFetchGames } from "../utils/useFetchItems";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";

const Gallery = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre") || undefined;
  const platform = searchParams.get("platform") || undefined;
  const store = searchParams.get("store") || undefined;
  const startDate = searchParams.get("startDate")
    ? new Date(searchParams.get("startDate")!)
    : undefined;
  const endDate = searchParams.get("endDate")
    ? new Date(searchParams.get("endDate")!)
    : undefined;
  const ordering = searchParams.get("ordering") || undefined;

  const [page, setPage] = useState(1);
  const { data, isPending, isError } = useFetchGames({
    path: "games",
    genre,
    platform,
    store,
    startDate,
    endDate,
    ordering,
    page,
  });

  if (isPending) return <LoadingSpinner />;
  if (isError) return <div>Error loading data</div>;
  if (!data?.results) return <div>No data found</div>;

  return (
    <section className="grid max-w-7xl mx-auto grid-cols-gallery gap-4 py-4 px-4">
      {data.results.map((game) => (
        <div
          key={game.id}
          className="group rounded-lg overflow-hidden shadow-lg hover:cursor-pointer hover:scale-[102%] hover:border-gray-200 transition-all duration-300 bg-white"
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
    </section>
  );
};

export default Gallery;
