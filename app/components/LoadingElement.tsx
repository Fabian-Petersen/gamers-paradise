import React from "react";
import LoadingSpinner from "./LoadingSpinner";

type LoadingElementProps = {
  isPending: boolean;
  isError: boolean;
  error?: string;
};
const LoadingElement = ({ isPending, isError, error }: LoadingElementProps) => {
  if (isPending) return <LoadingSpinner />;
  if (isError)
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <p>{error}</p>
        <span className="sr-only">{error}</span>
      </div>
    );

  return <LoadingSpinner />;
};

export default LoadingElement;
