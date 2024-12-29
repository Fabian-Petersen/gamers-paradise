"use client";

import { IoIosArrowDropupCircle } from "react-icons/io";
import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div
      className={`${
        isScrolled && "opacity-100"
      } fixed left-[95%] top-[89%] -translate-x-[50%] z-[1000] opacity-0 md:block transition-opacity duration-200 hover:cursor-pointer"`}
    >
      <button
        className="text-white flex items-center justify-center rounded-full dark:bg-white dark:text-blue-500 bg-blue-500 hover:scale-105 transform transition-transform duration-200"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <IoIosArrowDropupCircle className="text-5xl w-10 h-10" />
      </button>
    </div>
  );
};

export default ScrollToTopButton;
