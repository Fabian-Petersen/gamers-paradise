import { Home, Gamepad, ShoppingCart, Clipboard, IconNode } from "lucide-react";
import { v4 as uuid } from "uuid";
import { useFetchGames } from "../utils/useFetchData";
import extractNames from "../utils/collectDataKeys";

export type SiderLink = {
  title: string;
  href: string;
  icon: IconNode;
};

export const siderLinksData = [
  { id: uuid(), title: "Home", href: "/", icon: Home },
  {
    title: "All Games",
    href: "/games",
    icon: Gamepad,
  },
  { id: uuid(), title: "Platform", href: "/platform", icon: Gamepad },

  { Id: uuid(), title: "Genre", href: "/genre", icon: Gamepad },

  { id: uuid(), title: "Store", href: "/store", icon: ShoppingCart },
];
