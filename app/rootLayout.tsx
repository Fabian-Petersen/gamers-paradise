"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import AppContextProvider from "./lib/useAppContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SidebarProvider } from "./components/Sidebar/context/SidebarContext";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  const queryClient = new QueryClient();
  return (
    <html lang="en" className="light">
      <body className="dark:bg-gray-900 dark:text-white">
        <QueryClientProvider client={queryClient}>
          <AppContextProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </AppContextProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
