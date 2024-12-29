"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../lib/useAppContext";
import { Search, Search as SearchIcon, X } from "lucide-react";
import Button from "./Button";

const SearchForm = () => {
  const router = useRouter();
  const { search, setSearch } = useGlobalContext() || {
    search: "",
    setSearch: () => {},
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    console.log("Button clicked, showFullSearch is now:", true);
    setSearch("");
    //   router.push(`/${search}`);
  };

  return (
    <form className="gap-4 flex flex-grow justify-center">
      <div className="flex flex-grow max-w-[600px]">
        <input
          type="search"
          name="search"
          placeholder="Search"
          className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-clampBodyText w-full focus:border-blue-500 outline-none dark:text-bgDark"
        />

        <Button
          onClick={handleClick}
          className="py-2 px-4 rounded-r-full border-secondary-border border border-l-0 dark:text-bgDark"
        >
          <SearchIcon className="hover:scale-105 transform transition-transform duration-200" />
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
