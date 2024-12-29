"use client";
import { useQuery } from "@tanstack/react-query";
import customFetch from "./customFetch";
import axios from "axios";

// types.ts
export type Game = {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings: Rating[];
  stores: stores[];
  platforms: platforms[];
  short_screenshots: screenShots[];
  tags: tags[];
};

type platforms = {
  platform: {
    id: number;
    name: string;
    slug: string;
    image_background: string;
  };
  released_at: string;
  requirements_en: {
    minimum: string;
    recommended: string;
  };
};

type screenShots = {
  id: number;
  image: string;
};

type stores = {
  store: {
    id: number;
    name: string;
  };
};

type tags = {
  id: number;
  name: string;
  slug: string;
  language: string;
};

interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

export type GamesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
};

type FetchGamesParams = {
  path?: string;
  page?: number;
  genre?: string;
  platforms?: string;
  store?: string;
  startDate?: Date;
  endDate?: Date;
  ordering?: string;
  dates?: boolean;
  page_size?: number;
};

const NEXT_PUBLIC_API_KEY_RAWG = process.env.NEXT_PUBLIC_API_KEY as string;
const URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export function useFetchGames({
  page = 1,
  genre,
  platforms,
  store,
  dates,
  startDate,
  endDate,
  ordering,
  page_size = 40,
}: FetchGamesParams) {
  const { data, isPending, isError, error } = useQuery<GamesResponse>({
    queryKey: [page, genre, platforms, store, dates, ordering, page_size],
    queryFn: async () => {
      // let url = `${URL}/${path}?key=${NEXT_PUBLIC_API_KEY_RAWG}${
      //   page ? `&page=${page}` : ""
      // }`;

      let url = `${URL}/games?key=${NEXT_PUBLIC_API_KEY_RAWG}${
        page
          ? `&page=${page}`
          : platforms
          ? `&platforms=${platforms}`
          : store
          ? `&stores=${store}`
          : genre
          ? `&genre=${genre}`
          : ""
      }&page_size=${page_size}`;

      // Add Query Params if they exist
      if (genre) url += `&genre=${genre}`;
      if (platforms) url += `&platforms=${platforms}`;
      if (store) url += `&stores=${store}`;
      if (dates) url += `&dates=${startDate},${endDate}`;
      if (endDate) url += `&dates=${startDate},${endDate}`;
      if (ordering) url += `&ordering=${ordering}`;
      if (page > 1 && !url.includes("page")) url += `&page=${page}`;

      const { data } = await axios.get(url);
      // console.log(url);
      console.log("url:", url);
      return data;
    },
  });
  return { data, isPending, isError, error };
}
