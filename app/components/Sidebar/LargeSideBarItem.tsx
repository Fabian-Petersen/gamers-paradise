"use client";

import { buttonStyles } from "./Button";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

type LargeSidebarItemProps = {
  title: string;
  path: string;
  id: string;
};

function LargeSidebarItem({ title, path, id }: LargeSidebarItemProps) {
  // Create the URL with the appropriate path structure
  const createUrl = () => {
    if (path === "games") return "/";
    //api.rawg.io/api/games?dates=2019-09-01,2019-09-30&platforms=18,1,7
    // $ Handle different path patterns according to the API Documents
    switch (path) {
      // case "platforms/lists/parents":
      //   return `/platforms?${id}`;
      // case "new_releases":
      //   return `/games?key=${API_KEY}&platforms=1,4,187,186,18&dates=2024-12-01,2024-12-30`;
      case "platforms":
        return `/${path}`;
      case "genres":
        return `/${path}`;
      // case "developers":
      //   return `/developers/${id}?key=${API_KEY}`;
      // case "stores":
      //   return `/stores/${id}?key=${API_KEY}`;
      default:
        return `/${path}`;
    }
  };

  return (
    <Link
      href={createUrl()}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "w-full pl-11 rounded-lg tracking-wider text-clampBodyText dark:text-white dark:hover:bg-gray-500"
      )}
    >
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </Link>
  );
}

export default LargeSidebarItem;
