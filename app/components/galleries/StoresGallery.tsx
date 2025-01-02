"use client";

import { Stores, ApiResponse } from "@/app/lib/types";
import React from "react";
import LoadingSpinner from "../LoadingSpinner";

type StoresGalleryProps = {
  data: ApiResponse<Stores> | undefined;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
};

function StoresGallery({
  data,
  isPending,
  isError,
  error,
}: StoresGalleryProps) {
  if (isPending) return <LoadingSpinner />;
  if (isError) return <div>Error loading data: {error?.message}</div>;
  if (!data?.results) return <div>No stores found</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data.results.map((store) => (
        <div key={store.id} className="p-4 border rounded-lg">
          <h2 className="text-xl font-bold">{store.name}</h2>
          <p>{store.slug}</p>
        </div>
      ))}
    </div>
  );
}

export default StoresGallery;
