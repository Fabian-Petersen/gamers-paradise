import { ElementType } from "react";
import { buttonStyles } from "./Button";
import { twMerge } from "tailwind-merge";

type SmallSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};

function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "flex flex-col gap-2 items-center rounded-lg"
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
}

export default SmallSidebarItem;
