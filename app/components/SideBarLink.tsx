type SideBarLinkProps = {
  className?: string;
  icon: React.ReactNode;
  text: string;
  alert?: boolean;
  active?: boolean;
  expanded?: boolean;
};

import collectDataKeys from "../utils/collectDataKeys";
import { useFetchGames } from "../utils/useFetchItems";
import { GameDataType } from "../utils/collectDataKeys";
// Sidebar Links Component

export const SideBarLink = ({
  icon,
  text,
  active,
  alert,
  expanded,
}: SideBarLinkProps) => {
  const { data, isPending, isError } = useFetchGames("games");
  if (data) {
    // console.log(data);
  }
  const keys = collectDataKeys(data?.results as GameDataType[]);
  console.log(keys);
  return (
    <li
      className={`relative flex items-center py-2 px-4 my-1 font-medium rounded-md cursor-pointer transition-colors duration-200 ${
        active ? "bg-gray-100" : "hover:bg-gray-400"
      }`}
    >
      {icon}
      <span className={`${expanded ? "w-full ml-3" : "hidden"}`}>{text}</span>
      {alert && (
        <span className="absolute top-[50%] translate-y-[-50%] right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      )}
    </li>
  );
};
