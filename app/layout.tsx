import type { Metadata } from "next";
import "./globals.css";
import RootLayout from "./rootLayout";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header";
import ScrollToTopButton from "./components/ScrollToTopButton";

export const metadata: Metadata = {
  title: "Gamers Paradise",
  description: "All the best games in one place",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootLayout>
      <Header />
      <div className="grid grid-cols-[auto_1fr] mx-auto min-h-screen mt-[var(--navbarHeight)] dark:bg-gray-900">
        <Sidebar />
        <ScrollToTopButton />
        {children}
      </div>
    </RootLayout>
  );
}
