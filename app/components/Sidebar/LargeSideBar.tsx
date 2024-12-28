"use client";

import React from "react";

import { games } from "../../lib/sampleGamesData";
import { useSidebarContext } from "./context/SidebarContext";
import LargeSidebarItem from "./LargeSideBarItem";
import LargeSidebarSection from "./LargeSidebarSection";
import { Gamepad2, Home, Library, ShoppingCart } from "lucide-react";

const LargeSideBar = () => {
  const { isLargeOpen, isSmallOpen } = useSidebarContext();
  const genres = games?.results.flatMap((game) => game.genres);
  const stores = games?.results.flatMap((game) => game.stores);
  const platforms = games?.results.flatMap((game) =>
    game.platforms.map((platform) => platform.platform)
  );

  //Genres for the Sidebar.
  const uniqueGenres = [...new Set(genres.map((item) => item.name))];
  const uniqueStores = [...new Set(stores.map((store) => store.store.name))];
  const uniquePlatformsName = [
    ...new Set(platforms.map((platform) => platform.name)),
  ];

  return (
    <aside
      className={`lg:sticky absolute overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 pl-2 pr-6 border-r-2 ${
        isLargeOpen ? "lg:flex" : "lg:hidden"
      } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
    >
      <LargeSidebarSection title="Games" Icon={Home}>
        <LargeSidebarItem title="All Games" path="games" />
      </LargeSidebarSection>
      <hr />
      <LargeSidebarSection visibleItemCount={2} title="Genres" Icon={Library}>
        {uniqueGenres.map((genre, index) => (
          <LargeSidebarItem key={index} title={genre} type="genre" />
        ))}
      </LargeSidebarSection>
      <hr />
      <LargeSidebarSection
        title="Stores"
        visibleItemCount={2}
        Icon={ShoppingCart}
      >
        {uniqueStores.map((store, index) => (
          <LargeSidebarItem key={index} title={store} type="stores" />
        ))}
      </LargeSidebarSection>
      <hr />
      <LargeSidebarSection
        title="Platforms"
        visibleItemCount={2}
        Icon={Gamepad2}
      >
        {uniquePlatformsName.map((platform, index) => (
          <LargeSidebarItem key={index} title={platform} type="platform" />
        ))}
      </LargeSidebarSection>
    </aside>
  );
};

export default LargeSideBar;
