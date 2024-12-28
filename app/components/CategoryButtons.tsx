import Button from "./Button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type CategoriesProps = {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const TRANSLATE_AMOUNT = 100;

const CategoryButtons = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoriesProps) => {
  const [translate, setTranslate] = useState(0);
  const [isLeftSideVisible, setIsLeftSideVisible] = useState(false);
  const [isRightSideVisible, setIsRightSideVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current == null) return;
    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;
      if (container == null) return;

      setIsLeftSideVisible(translate > 0);
      setIsRightSideVisible(
        translate + container.clientWidth < container.scrollWidth
      );
    });

    return observer.observe(containerRef.current);
  }, [categories, translate]);

  return (
    <div className="overflow-x-hidden relative" ref={containerRef}>
      <div
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? "dark" : "default"}
            className="py-1 px-3 rounded-lg whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>
      {isLeftSideVisible && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-gray-100 from-50% to-transparent w-24 h-full">
          <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
            onClick={() => {
              setTranslate((translate) => {
                const newTranslate = translate - TRANSLATE_AMOUNT;
                if (newTranslate <= 0) return 0;
                return newTranslate;
              });
            }}
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      {isRightSideVisible && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-gray-100 from-50% to-transparent w-24 h-full flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
            onClick={() => {
              setTranslate((translate) => {
                if (containerRef.current == null) {
                  return translate;
                }
                const newTranslate = translate + TRANSLATE_AMOUNT;
                const fullWidth = containerRef.current?.scrollWidth ?? 0;
                const visibleWidth = containerRef.current?.clientWidth ?? 0;
                if (newTranslate + visibleWidth >= fullWidth) {
                  return fullWidth - visibleWidth;
                }
                return newTranslate;
              });
            }}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryButtons;
