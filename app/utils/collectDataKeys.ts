import { useFetchGames } from "./useFetchItems";

export type GameDataType = {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings: {
    id: number;
    title: string;
    count: number;
    percent: number;
  }[];
  ratings_count: number;
  reviews_text_count: number;
  added: number;
  added_by_status: {
    yet: number;
    owned: number;
    beaten: number;
    toplay: number;
    dropped: number;
    playing: number;
  };
  metacritic: number;
  playtime: number;
  suggestions_count: number;
  updated: string;
  user_game: null;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  platforms: {
    platform: {
      id: number;
      name: string;
      slug: string;
      image: null;
      year_end: null;
      year_start: null;
      games_count: number;
      image_background: string;
    };
    released_at: string;
    requirements_en: {
      minimum: string;
      recommended: string;
    };
    requirements_ru: null;
  }[];
  parent_platforms: {
    platform: {
      id: number;
      name: string;
      slug: string;
    };
  }[];
  genres: {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
  }[];
  stores: {
    id: number;
    store: {
      id: number;
      name: string;
      slug: string;
      domain: string;
      games_count: number;
      image_background: string;
    };
  }[];
  clip: null;
  tags: {
    id: number;
    name: string;
    slug: string;
  };
};

function extractNames(data: GameDataType[]) {
  const names: Set<string> = new Set();

  function recurse(obj: any) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        names.add(key);
        if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
          recurse(obj[key]);
        }
      }
    }
  }

  data?.forEach((item) => recurse(item));
  return Array.from(names);
}

export default extractNames;

//   // Example usage
//   const sampleData: SampleGameType = {
//     // ... your sample data here
//   };

//   const names = extractNames(sampleData);
//   console.log(names);
