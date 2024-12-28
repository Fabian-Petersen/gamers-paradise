"use client";

import React, { useState, useContext, createContext } from "react";
import Logo from "./Logo";
import { MenuIcon, MoreVertical } from "lucide-react";
import { siderLinksData } from "../lib/SiderLinksData";
import { SideBarLink } from "./SideBarLink";

type HeaderProps = {
  className?: string;
  children?: React.ReactNode;
};

const SidebarContext = createContext<
  | {
      expanded: boolean;
      setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

const SideBar = ({ className }: HeaderProps) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <aside className={`${className} h-screen`}>
      <nav className="h-full flex flex-col border-r-gray-500 bg-white shadow-sm space-y-4">
        <div className="flex justify-around items-center bg-gray-300 dark:bg-gray-800 h-[var(--navbarHeight)]">
          <Logo setExpanded={setExpanded} expanded={expanded} />
          <button onClick={() => setExpanded(!expanded)}>
            <MenuIcon className="w-8 h-8 hover:cursor-pointer dark:text-white" />
          </button>
        </div>
        <ul>
          {siderLinksData.map((link) => (
            <SideBarLink
              key={link.id}
              icon={<link.icon size={20} />}
              text={link.title}
              expanded={expanded}
            />
          ))}
        </ul>
        <div className="border-t flex justify-between p-3 gap-1">
          <img
            src="/images/avatar-unsplash.jpg"
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-full" : "w-0"
            } w-full border border-red-500`}
          >
            <div className="leading-4">
              <h4 className="font-semibold text-md">Fabian Petersen</h4>
              <span className="text-xs text-gray-600">fabian@gmail.com</span>
            </div>
            <button className="text-sm">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default SideBar;
