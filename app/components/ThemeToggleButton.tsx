"use client";

import { Tooltip } from "flowbite-react";
import { Moon, Sun } from "lucide-react";
import Icon from "./Icon";
import { IconType } from "react-icons";
//import sun and moon icons from react-icons/fa
import { FaSun, FaMoon } from "react-icons/fa";
import { useGlobalContext } from "@/app/lib/useAppContext";
import { useEffect, useState } from "react";

type ToggleButtonProps = {
  icon: IconType;
};

const ThemeToggleButton = () => {
  const [theme, setTheme] = useState<string>("light");
  const { toggleTheme, setToggleTheme } = useGlobalContext() || {
    toggleTheme: false,
    setToggleTheme: () => {},
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save the theme in localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleClick = () => {
    setTheme(theme === "dark" ? "" : "dark");
    setToggleTheme(!toggleTheme);
  };

  return (
    <div className="mr-[1.5rem] size-4 md:size-5 lg:size-6 flex items-center justify-center rounded-full outline-2 outline-white hover:cursor-pointer bg-white dark:bg-gray-700 p-4">
      {toggleTheme ? (
        <Tooltip content="Light Theme" placement="bottom">
          <Sun size={24} onClick={handleClick} className="text-white" />
        </Tooltip>
      ) : (
        <Tooltip
          content="Dark Theme"
          placement="bottom"
          className="bg-gray-900"
        >
          <Moon size={24} onClick={handleClick} className="text-gray-700" />
        </Tooltip>
      )}
    </div>
  );
};

export default ThemeToggleButton;
