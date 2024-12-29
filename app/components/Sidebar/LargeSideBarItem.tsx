import { ElementType } from "react";
import { buttonStyles } from "./Button";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type LargeSidebarItemProps = {
  title: string;
  url?: string;
  type?: "genre" | "platforms" | "stores" | "dates" | "ordering";
  isActive?: boolean;
};

function LargeSidebarItem({
  title,
  type,
  isActive: defaultIsActive = false,
}: LargeSidebarItemProps) {
  const searchParams = useSearchParams();
  const currentPath = searchParams.get("path");

  // Check if this item is currently active
  const isActive = defaultIsActive && currentPath === type;

  // Create the URL with the appropriate query parameters
  const createUrl = () => {
    if (type) {
      const currentPath = searchParams.get("path") || "games";
      return `/?${currentPath}&${type}=${title.toLowerCase()}`;
    }
    return "/";
  };

  return (
    <Link
      href={createUrl()}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "w-full pl-11 rounded-lg tracking-wider text-clampBodyText dark:text-white dark:hover:bg-gray-500",
        isActive ? "font-bold bg-gray-200 hover:bg-gray-300 text-white" : ""
      )}
    >
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </Link>
  );
}

export default LargeSidebarItem;
