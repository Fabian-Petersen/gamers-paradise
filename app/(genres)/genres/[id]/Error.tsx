"use client";
import { useRouter } from "next/navigation";

const Error = ({ error }: { error: Error }) => {
  const router = useRouter();
  return (
    <div>
      <h2>Error loading game: {error.message}</h2>
      <button onClick={() => router.push("/")}>Return</button>
    </div>
  );
};

export default Error;
