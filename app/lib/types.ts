import exp from "constants";
import { Result } from "postcss";

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
  stores: Stores[];
  platforms: PlatformItems[];
  short_screenshots: screenShots[];
  tags: tags[];
};

// List of Parent Platforms
export type ParentPlatformsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ParentPlatform[];
};
export type ParentPlatform = {
  id: number;
  name: string;
  slug: string;
  platforms: {
    id: number;
    name: "string";
    slug: "string";
    games_count: number;
    image_background: string;
    image: string;
    year_start: string;
    year_end: string;
  };
};

// List of All Platforms
export type Platforms = {
  results: PlatformItems[];
  count: number;
};

export type PlatformItems = {
  id: 0;
  name: "string";
  slug: "string";
  games_count: 0;
  image_background: string;
  image: string;
  year_start: 0;
  year_end: 0;
};

export type screenShots = {
  id: number;
  image: string;
};

export type tags = {
  id: number;
  name: string;
  slug: string;
  language: string;
};

export type Rating = {
  id: number;
  title: string;
  count: number;
  percent: number;
};

export type ResponseData = {
  count: number;
  next: string | null;
  previous: string | null;
  results:
    | ParentPlatform[]
    | Game[]
    | Platforms[]
    | Stores[]
    | Genres[]
    | Developers[];
};

export type URLPath = {
  path:
    | "games"
    | "platforms/lists/parents"
    | "platforms"
    | "developers"
    | "stores"
    | "genres";
};

export type Developers = {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
  description: string;
  results: GamesByDeveloper[];
};

// $ Each Developer's Games
type GamesByDeveloper = {
  id: number;
  slug: string;
  name: string;
  image_background: string;
  games: DeveloperGames[];
  games_count: number;
};

// $ Array of Games by Developer
type DeveloperGames = {
  id: number;
  added: number;
  slug: string;
  name: string;
  background_image: string;
};

export type FetchGamesParams = {
  page?: number;
  genres?: string;
  platforms?: string;
  stores?: string;
  startDate?: string;
  endDate?: string;
  ordering?: string;
  dates?: boolean;
  page_size?: number;
};

export type ApiResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  seo_h1?: string;
  noindex?: boolean;
  nofollow?: boolean;
  description?: string;
  filters?: {
    years: Array<{
      from: number;
      to: number;
      filter: string;
      decade: number;
      years: Array<{
        year: number;
        count: number;
        nofollow: boolean;
      }>;
      count: number;
      nofollow: boolean;
    }>;
  };
  nofollow_collections?: string[];
};

export type Genres = {
  id: number;
  name: "string";
  slug: "string";
  games_count: number;
  image_background: string;
  description: "string";
  games: GamesByGenre[];
};

export type GamesByGenre = {
  id: number;
  slug: string;
  name: string;
  added: string;
};

export type Stores = {
  id: number;
  name: "string";
  domain: "string";
  slug: "string";
  games_count: number;
  image_background: string;
  description: "string";
};
