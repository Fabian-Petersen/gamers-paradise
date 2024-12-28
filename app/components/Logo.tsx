import React from "react";
import Link from "next/link";

type Props = {
  className?: string;
  setExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
  expanded?: boolean;
};

const Logo = ({ className, expanded }: Props) => {
  return (
    <div
      className={`${className} overflow-hidden transition-all ${
        expanded ? "w-full" : "w-0"
      }`}
    >
      <Link
        href="/"
        className="flex items-center space-x-3 rtl:space-x-reverse"
      >
        <p className="self-center text-clampLogo font-semibold whitespace-nowrap dark:text-white text-blue-800">
          Gamers Paradise
        </p>
      </Link>
    </div>
  );
};

export default Logo;
