"use client";

import { Clapperboard, Home, Repeat, Library } from "lucide-react";

import { useSidebarContext } from "./context/SidebarContext";
import SmallSidebarItem from "./SmallSideBarItem";

const SmallSideBar = () => {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();
  {
    isSmallOpen && (
      <div
        onClick={close}
        className="lg:hidden fixed inset-0 z-[999] bg-dark opacity-50"
      />
    );
  }
  return (
    <aside
      className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${
        isLargeOpen ? "lg:hidden" : "lg:flex"
      }`}
    >
      <SmallSidebarItem Icon={Home} title="Home" url="/" />
      <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
      <SmallSidebarItem
        Icon={Clapperboard}
        title="Subscriptions"
        url="/subscriptions"
      />
      <SmallSidebarItem Icon={Library} title="Library" url="/library" />
    </aside>
  );
};

export default SmallSideBar;
