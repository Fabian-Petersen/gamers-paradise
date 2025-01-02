"use client";
import React, { useState, useEffect, useRef } from "react";
import { useFetchData } from "../../utils/useFetchData";
import { useParams } from "next/navigation";
import LoadingSpinner from "../../components/LoadingSpinner";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Button from "../../components/Button";
import { ApiResponse, Game } from "../../lib/types";
import Error from "./Error";

const Page = () => {
  const { id } = useParams();
  const { data, isPending, isError } = useFetchData<Game>({
    path: "games",
  });
  // const game = singleGameData; // Sample Data
  const game = data?.results?.find((game: Game) => String(game.id) === id);
  // console.log("game data:", game);

  const TRANSLATE_AMOUNT = 100;
  const [translate, setTranslate] = useState(0);
  const [isLeftSideVisible, setIsLeftSideVisible] = useState(false);
  const [isRightSideVisible, setIsRightSideVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  // console.log(containerRef);
  useEffect(() => {
    if (containerRef.current == null) return;
    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;
      if (container == null) return;

      setIsLeftSideVisible(translate > 0);
      setIsRightSideVisible(
        translate + container.clientWidth < container.scrollWidth
      );
      // console.log("left:", isLeftSideVisible, "right:", isRightSideVisible);
    });
    return observer.observe(containerRef.current);
  }, [translate]);

  if (isPending) return <LoadingSpinner />;
  if (isError) return <Error />;

  return (
    <main className="md:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl min-h-screen mx-auto py-2 relative w-full">
      {game ? (
        <section className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-2 h-auto">
            {/* // % Game Information */}
            <div className="flex flex-col gap-2 bg-gray-200 p-2 rounded-lg">
              {/* // % Title */}
              <h1 className="text-clampH2 text-heading">{`Title: ${game.name}`}</h1>
              {/* // % Released Date */}
              <div className="flex gap-2">
                <h3 className="font-semibold text-heading tracking-wide">
                  Release Date:
                </h3>
                {new Date(game.released).toLocaleDateString()}
              </div>
              {/* // % Rating */}
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="ml-1">{game.rating.toFixed(1)}</span>
              </div>
              {/* // % Ratings */}
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-heading">Ratings</h3>
                <ul className="flex gap-4">
                  {game.ratings.map((rating) => (
                    <li className="capitalize text-[0.9rem]" key={rating.id}>
                      {rating.title}: {rating.percent}%
                    </li>
                  ))}
                </ul>
              </div>
              {/* // % Stores */}
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-heading">Available At</h3>
                <ul className="flex gap-2 flex-wrap">
                  {game.stores.map((stores) => (
                    <li
                      className="text-clampBodyText capitalize bg-sky-600 text-white rounded-md px-3 py-1"
                      key={stores.id}
                    >
                      {stores.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* // %  Game Image */}
            <div>
              <Image
                className="object-cover w-full h-full rounded-lg"
                src={game.background_image}
                alt={game.name}
                objectFit="cover"
                width={600}
                height={600}
              />
            </div>
          </div>

          {/* //$ Screenshots */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-heading">ScreenShots</h3>
            <div className="overflow-x-hidden relative" ref={containerRef}>
              <div
                className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
                style={{ transform: `translateX(-${translate}px)` }}
              >
                {game.short_screenshots.map((item) => (
                  <Image
                    key={item.id}
                    src={item.image}
                    alt={game.name}
                    width={200}
                    height={200}
                  />
                ))}
              </div>
              {isLeftSideVisible && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-gray-200 absolute left-0 top-[50%] transform -translate-y-1/2 z-[100]"
                  onClick={() => {
                    setTranslate((translate) => {
                      const newTranslate = translate - TRANSLATE_AMOUNT;
                      if (newTranslate <= 0) return 0;
                      return newTranslate;
                    });
                    // console.log({ translate });
                  }}
                >
                  <ChevronLeft />
                </Button>
              )}
              {isRightSideVisible && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-gray-200 absolute top-[50%] right-0 transform -translate-y-1/2 z-[100]"
                  onClick={() => {
                    setTranslate((translate) => {
                      if (containerRef.current == null) {
                        return translate;
                      }
                      const newTranslate = translate + TRANSLATE_AMOUNT;
                      const fullWidth = containerRef.current?.scrollWidth ?? 0;
                      const visibleWidth =
                        containerRef.current?.clientWidth ?? 0;
                      if (newTranslate + visibleWidth >= fullWidth) {
                        return fullWidth - visibleWidth;
                      }
                      return newTranslate;
                    });
                    // console.log("Move Right:", translate);
                  }}
                >
                  <ChevronRight />
                </Button>
              )}
            </div>
          </div>
          {/* //$ Categories */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-heading">Categories</h3>
            <ul className="flex gap-2 flex-wrap">
              {game.tags.map((genre) => (
                // Destructure the genre object
                <li
                  key={genre.id}
                  className="bg-categories text-white text-clampBodyText rounded-md py-1 px-4"
                >
                  {genre.name}
                </li>
              ))}
            </ul>
          </div>

          {/* // $ Available Platforms Section */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-heading">Available On</h3>
            <ul className="flex flex-wrap gap-4">
              {game.platforms.map((platform) => (
                <li
                  className="bg-availableOn rounded-md py-1 px-3 text-white text-clampBodyText"
                  key={platform.id}
                >
                  {platform.name}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <div className="w-full text-clampH3 absolute grid place-content-center h-full">
          Game not found...
        </div>
      )}
    </main>
  );
};

export default Page;
