"use client";

import { useFetchData } from "../utils/useFetchData";
import GamesGallery from "./galleries/GamesGallery";
import PlatformGallery from "./galleries/PlatformGallery";
import GenresGallery from "./galleries/GenresGallery";
import SingleGenreGallery from "./galleries/SingleGenreGallery";
// import StoresGallery from "./galleries/StoresGallery";
// import DevGallery from "./galleries/DevGallery";

import {
  Game,
  Platforms,
  Developers,
  Genres,
  Stores,
  PlatformItems,
} from "../lib/types";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const Gallery = () => {
  // const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  //% console.log("Gallery Component - Current pathname:", pathname); // Debug log

  // $ Use Pathname to determine the current view
  const getViewFromPath = () => {
    //% console.log("function getViewFromPath():", pathname); // Debug log
    const path = pathname.toLowerCase();
    if (path === "/") return "games";
    if (path === "/platforms") return "platforms";
    if (path === "/genres") return "genres";
    return "games"; // default fallback
  };

  // Determine the current view based on URL parameters
  // let currentView = "games"; // default view
  // if (searchParams.has("platforms")) currentView = "platforms";
  // if (searchParams.has("genres")) currentView = "genres";
  //% console.log("pathname:", pathname);
  // if (searchParams.has("developers")) currentView = "developers";
  // if (searchParams.has("stores")) currentView = "stores";

  // const genres = searchParams.get("genres") || undefined;
  // const platforms = searchParams.get("platforms") || undefined;
  // const stores = searchParams.get("stores") || undefined;
  // const startDate = searchParams.get("startDate")
  //   ? new Date(searchParams.get("startDate")!)
  //   : undefined;
  // const endDate = searchParams.get("endDate")
  //   ? new Date(searchParams.get("endDate")!)
  //   : undefined;
  // const ordering = searchParams.get("ordering") || undefined;

  const gamesQuery = useFetchData<Game>({
    path: "games",
    page: currentPage,
    page_size: 40,
  });

  // const platformsParentQuery = useFetchData<PlatformItems>({
  //   path: "platforms/lists/parents",
  //   page: currentPage,
  //   page_size: 5,
  // });

  const platformsQuery = useFetchData<Platforms>({
    path: "platforms/lists/parents",
    page: currentPage,
    page_size: 20,
  });

  // const developersQuery = useFetchData<Developers>({
  //   path: "developers",
  //   page: currentPage,
  //   page_size: 10,
  // });

  const genresQuery = useFetchData<Genres>({
    path: "genres",
    page: currentPage,
    page_size: 40,
  });

  //% console.log("genresData:", genresQuery);

  // const storesQuery = useFetchData<Stores>({
  //   path: "stores",
  //   page: currentPage,
  //   page_size: 20,
  // });

  // Add console logs for debugging
  //% console.log("Current genres:", genres);
  //% console.log("Current platforms:", platforms);
  //% console.log("Current stores:", stores);
  //% console.log("Search params:", Object.fromEntries(searchParams.entries()));
  const currentView = getViewFromPath();
  //% console.log("Current view:", currentView);
  //% console.log("Current pathname:", pathname);

  const renderContent = () => {
    switch (currentView) {
      case "platforms":
        return <PlatformGallery {...platformsQuery} />;
      case "genres":
        return <GenresGallery {...genresQuery} />;
      default:
        return <GamesGallery {...gamesQuery} />;
    }
  };

  return (
    <section className="grid max-w-7xl mx-auto grid-cols-gallery gap-4 pt-[var(--pageTopPadding)] px-4 h-auto dark:bg-gray-900 border border-blue-500">
      {renderContent()}
    </section>
  );
};

// switch (currentView) {
//   case "platforms":
//     return <PlatformGallery {...platformsQuery} />;
//   case "developers":
//     return <DevGallery {...developersQuery} />;
//   case "genres":
//     return <GenresGallery {...genresQuery} />;
//   case "stores":
//     return <StoresGallery {...storesQuery} />;
//   default:
//     return <GamesGallery {...gamesQuery} />;
// }
// };

// switch (currentView) {
//   case "platforms":
//     return <PlatformGallery {...platformsQuery} />;
//   case "developers":
//     return <DevGallery {...developersQuery} />;
//   case "genres":
//     return <GenresGallery {...genresQuery} />;
//   case "stores":
//     return <StoresGallery {...storesQuery} />;
//   default:
//     return <GamesGallery {...gamesQuery} />;
// }
// };

export default Gallery;
