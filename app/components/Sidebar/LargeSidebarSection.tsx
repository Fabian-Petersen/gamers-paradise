import React, { ElementType, useState } from "react";
import Button from "./Button";
import { ChevronUp, ChevronDown } from "lucide-react";

type LargeSidebarSectionProps = {
  children: React.ReactNode;
  title?: string;
  visibleItemCount?: number;
  Icon: ElementType;
};

function LargeSidebarSection({
  children,
  title,
  Icon,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = React.Children.toArray(children).flat();
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  const showExpandButton = childrenArray.length > visibleItemCount;
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div className="flex flex-col gap-2">
      {title && (
        <div className="flex gap-2 items-center ml-4 text-clampNavLinks dark:text-white">
          <Icon className="size-[1.2rem]" />
          {title}
        </div>
      )}
      {visibleChildren}
      {showExpandButton && (
        <Button
          variant="ghost"
          className="w-full flex gap-1 p-2 text-gray-900 items-center text-clampBodyText rounded-lg dark:text-white dark:hover:bg-gray-500"
          onClick={() => setIsExpanded((e) => !e)}
        >
          <ButtonIcon className="size-6" />
          <div>{isExpanded ? "Show Less" : "Show More"}</div>
        </Button>
      )}
    </div>
  );
}

export default LargeSidebarSection;
