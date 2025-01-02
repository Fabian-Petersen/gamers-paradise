"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import {
  PlatformItems,
  Game,
  GamesByGenre,
  ApiResponse,
} from "@/app/lib/types";
import { useFetchData } from "@/app/utils/useFetchData";
import Error from "./Error";
import SinglePlatformGallery from "@/components/galleries/SinglePlatformGallery";
import { platform } from "os";

const SingleGenrePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const {
    data: games,
    isPending,
    isError,
    error,
  } = useFetchData<Game>({
    path: "games",
  });

  if (isError) return <Error error={error} />;

  // $ Get the list of Games for a specific platform using the id to filter through the games.
  const gameList = games?.results;

  // $ Loop thorugh the games data to find the games that match the platform id
  const platformGamesList = gameList?.find((game) =>
    game.platforms.map((p) => p.toString() === id)
  );
  // console.log("platforms", game.platforms);
  console.log("platform id param:", id);

  //   const platformName = platformQuery.data?.platforms.find(
  //     p => p.id.toString() === platformId
  //   )?.name || 'Platform';

  // console.log("singleGenre games", JSON.stringify(genreGames, null, 2));
  console.log("games list in a platform", platformGamesList);

  const count = games?.count;

  return (
    <div className="max-w-7xl border border-red-500 min-h-screen mx-auto py-2 relative w-full">
      <SinglePlatformGallery
        data={platformGamesList}
        isPending={isPending}
        isError={isError}
        error={error}
        count={count}
      />
    </div>
  );
};

export default SingleGenrePage;
