"use client";

import { useFetchData } from "../../utils/useFetchData";
import { useSidebarContext } from "./context/SidebarContext";
import LargeSidebarItem from "./LargeSideBarItem";
import LargeSidebarSection from "./LargeSidebarSection";
import { Gamepad2, Home, Library, ShoppingCart } from "lucide-react";
import LoadingSpinner from "../LoadingSpinner";
import { Developers, Genres, ParentPlatform, Stores } from "@/app/lib/types";

const LargeSideBar = () => {
  const { isLargeOpen, isSmallOpen } = useSidebarContext();

  // Update the type parameter to ParentPlatform
  const { data: parentPlatformsData, isPending: platformsLoading } =
    useFetchData<ParentPlatform>({
      path: "platforms/lists/parents",
      page_size: 20,
    });

  const { data: developersData, isPending: developersLoading } =
    useFetchData<Developers>({
      path: "developers",
      page_size: 20,
    });

  const { data: genresData, isPending: genresLoading } = useFetchData<Genres>({
    path: "genres",
    page_size: 20,
  });

  const { data: storesData, isPending: storesLoading } = useFetchData<Stores>({
    path: "stores",
    page_size: 20,
  });

  if (platformsLoading || developersLoading || genresLoading || storesLoading) {
    return <LoadingSpinner />;
  }

  if (
    !parentPlatformsData?.results ||
    !developersData?.results ||
    !genresData?.results ||
    !storesData?.results
  ) {
    return <div>No data available</div>;
  }

  return (
    <aside
      className={`lg:sticky absolute overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 pl-2 pr-6 border-r-[0.5px] border-r-gray-200 border-opacity-80 dark:bg-gray-900 pt-[var(--pageTopPadding)] ${
        isLargeOpen ? "lg:flex" : "lg:hidden"
      } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
    >
      {/* https://api.rawg.io/api/games?dates=2019-10-10,2020-10-10&ordering=-added */}
      <LargeSidebarSection title="Top Picks" Icon={Home}>
        <LargeSidebarItem title="All Games" path="games" id="" />
        <LargeSidebarItem title="New Releases" path="new_releases" id="" />
        <LargeSidebarItem title="Upcoming Games" path="games" id="" />
      </LargeSidebarSection>

      <hr />

      <LargeSidebarSection visibleItemCount={2} title="Browse" Icon={Library}>
        <LargeSidebarItem title="Genres" path="genres" id="" />
        <LargeSidebarItem title="Platforms" path="platforms" id="" />
        <LargeSidebarItem title="Stores" path="stores" id="" />
        <LargeSidebarItem title="Developers" path="developers" id="" />
      </LargeSidebarSection>

      {/* <LargeSidebarSection visibleItemCount={2} title="Genres" Icon={Library}>
        {genresData.results.map((genre) => (
          <LargeSidebarItem
            key={genre.id}
            title={genre.name}
            path="genres"
            id={genre.id.toString()}
          />
        ))}
      </LargeSidebarSection> */}

      <hr />

      <LargeSidebarSection
        title="Platforms"
        visibleItemCount={2}
        Icon={Gamepad2}
      >
        {parentPlatformsData.results.map((platform) => (
          <LargeSidebarItem
            key={platform.id}
            title={platform.name}
            path="platforms"
            id={platform.id.toString()}
          />
        ))}
      </LargeSidebarSection>

      <hr />

      {/* <LargeSidebarSection
        title="Stores"
        visibleItemCount={2}
        Icon={ShoppingCart}
      >
        {storesData.results.map((store) => (
          <LargeSidebarItem
            key={store.id}
            title={store.name}
            path="stores"
            id={store.id.toString()}
          />
        ))}
      </LargeSidebarSection> */}

      {/* <LargeSidebarSection
        title="Developers"
        visibleItemCount={2}
        Icon={Gamepad2}
      >
        {developersData.results.map((developer) => (
          <LargeSidebarItem
            key={developer.id}
            title={developer.name}
            path="developers"
            id={developer.id.toString()}
          />
        ))}
      </LargeSidebarSection> */}
    </aside>
  );
};

export default LargeSideBar;
