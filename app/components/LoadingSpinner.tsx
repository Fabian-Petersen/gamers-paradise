import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/80 dark:bg-gray-900/80">
      <div className="relative w-24 h-24">
        <div className="absolute w-full h-full rounded-full border-8 border-yellow-200" />
        <div className="absolute w-full h-full rounded-full border-8 border-yellow-400 border-t-transparent animate-spin" />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
