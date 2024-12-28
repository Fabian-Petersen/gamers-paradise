"use client";

import React, { useContext, useState, createContext, ReactNode } from "react";
import { Photo } from "@/models/Images";
import { DefaultPhoto } from "@/models/Images";

type AppContextProviderProps = {
  children: ReactNode;
};

type ToggleThemeProps = {
  toggleTheme: boolean;
  setToggleTheme: React.Dispatch<React.SetStateAction<boolean>>;
};

// $ Props for the selected image once a user click on the gallery items.
type ContextSelectedImageProps = {
  selectedImage: Photo | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<Photo>>;
};

// $ Props for the search input
type SearchProps = {
  search: string | null;
  setSearch: React.Dispatch<React.SetStateAction<string | null>>;
};

type ContextValueProps = ContextSelectedImageProps &
  SearchProps &
  ToggleThemeProps;

const AppContext = createContext<ContextValueProps | null>(null);

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [toggleTheme, setToggleTheme] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Photo>(DefaultPhoto);
  const [search, setSearch] = useState<string | null>(null);

  const ctx: ContextValueProps = {
    selectedImage,
    setSelectedImage,
    search,
    setSearch,
    toggleTheme,
    setToggleTheme,
  };

  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppContextProvider;
