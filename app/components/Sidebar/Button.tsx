import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const buttonStyles = cva(
  ["hover:bg-secondary-hover", "transition-colors"],
  {
    variants: {
      variant: {
        default: ["bg-gray-200", "hover:bg-secondary-hover"],
        ghost: ["hover:bg-gray-200"],
        dark: ["bg-black", "text-white", "hover:bg-gray-800"],
      },
      size: {
        default: ["rounded", "p-2"],
        icon: [
          "rounded-full",
          "size-10",
          "flex",
          "items-center",
          "justify-center",
          "p-2.5",
        ],
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">;

const Button = ({ variant, size, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(buttonStyles({ variant, size }), className)}
    />
  );
};

export default Button;
