"use client";

import { Developers, ApiResponse } from "@/app/lib/types";
import React from "react";
import LoadingSpinner from "../LoadingSpinner";

type DevGalleryProps = {
  data: ApiResponse<Developers> | undefined;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
};

function DevelopersGallery({
  data,
  isPending,
  isError,
  error,
}: DevGalleryProps) {
  if (isPending) return <LoadingSpinner />;
  if (isError) return <div>Error loading data: {error?.message}</div>;
  if (!data?.results) return <div>No developers found</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data.results.map((developer) => (
        <div key={developer.id} className="p-4 border rounded-lg">
          <h2 className="text-xl font-bold">{developer.name}</h2>
          <p>{developer.slug}</p>
        </div>
      ))}
    </div>
  );
}

export default DevelopersGallery;
