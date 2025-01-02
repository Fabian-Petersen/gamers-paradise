"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { Genres, Game, GamesByGenre } from "@/app/lib/types";
import { useFetchData } from "@/app/utils/useFetchData";
import Error from "./Error";
import SingleGenreGallery from "@/app/components/galleries/SingleGenreGallery";

const SingleGenrePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const {
    data: genreList,
    isPending: genresLoading,
    isError: genresError,
    error: genresErrorMessage,
  } = useFetchData<Genres>({
    path: "genres",
  });

  const {
    data: gamesList,
    isPending: gamesLoading,
    isError: gamesError,
    error: gamesErrorMessage,
  } = useFetchData<Game>({
    path: "games",
  });

  if (genresError) return <Error error={genresErrorMessage} />;
  if (gamesError) return <Error error={gamesErrorMessage} />;

  const genres = genreList?.results?.find(
    (genre: Genres) => String(genre.id) === id
  );
  // $ Get the list of Game Id's for a specific Genre
  const genreListGames = genres?.games;
  const count = genres?.games_count;
  const gameId = genreListGames?.map((game: GamesByGenre) => game.id);
  // console.log("list of genres game id's:", gameId);
  // $ Loop thorugh the games data to find the games that match the genre id
  const genreGames = gamesList?.results?.filter((game: Game) =>
    gameId?.includes(game.id)
  );

  // console.log("singleGenre games", JSON.stringify(genreGames, null, 2));
  console.log("number of games in genre", genreGames?.length);
  // console.log("games data:", gamesList);

  return (
    <div className="max-w-7xl border border-red-500 min-h-screen mx-auto py-2 relative w-full">
      <SingleGenreGallery
        data={genreGames}
        isPending={gamesLoading}
        isError={gamesError}
        error={gamesErrorMessage}
        count={count}
      />
    </div>
  );
};

export default SingleGenrePage;
