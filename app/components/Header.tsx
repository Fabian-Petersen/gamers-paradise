import Link from "next/link";
import SearchForm from "./SearchForm";
import { MenuSquare, LucideMenu, MenuIcon } from "lucide-react";
// import { Theme } from "react-daisyui";
import ThemeToggleButton from "./ThemeToggleButton";

type HeaderProps = {
  className?: string;
};

const Header = ({ className }: HeaderProps) => {
  return (
    <header
      id="navbar"
      className={`${className} fixed top-0 dark:bg-gray-700 text-gray-70 bg-gray-300 z-[1000] h-[var(--navbarHeight)] w-full`}
    >
      <nav className="w-full h-full py-2 px-4 flex justify-end items-center gap-4">
        <SearchForm />
        <ThemeToggleButton />
      </nav>
    </header>
  );
};

export default Header;
