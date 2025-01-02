import { useQuery } from "@tanstack/react-query";
import customFetch from "./customFetch";
import { FetchGamesParams, ApiResponse, URLPath } from "@/app/lib/types";

export function useFetchData<T>({
  page = 1,
  genres,
  platforms,
  stores,
  dates,
  startDate,
  endDate,
  ordering,
  page_size = 40,
  path = "games",
}: FetchGamesParams & URLPath) {
  return useQuery<ApiResponse<T>>({
    queryKey: [
      path,
      page,
      genres,
      platforms,
      stores,
      dates,
      ordering,
      page_size,
    ],
    queryFn: async () => {
      // Build the query parameters
      const params: Record<string, string | number> = {
        path, // Include the path as a param
        page_size,
        page,
      };

      // Add optional parameters if they exist
      if (genres) params.genres = genres;
      if (platforms) params.platforms = platforms;
      if (stores) params.stores = stores;
      if (dates) params.dates = `${startDate},${endDate}`;
      if (ordering) params.ordering = ordering;

      // Make the request to our Next.js API route
      const { data } = await customFetch.get("/games", { params });
      // console.log("data:", data);
      return data;
    },
  });
}
