import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold select-none transition-[transform,opacity,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-fg shadow-border hover:opacity-95",
        secondary: "bg-surface text-ink shadow-border hover:shadow-border-hover",
        soft: "bg-primary-soft text-primary",
        ghost: "bg-transparent text-ink hover:bg-primary-soft",
        success: "bg-success text-success-fg",
        danger: "bg-danger-soft text-danger",
      },
      size: {
        sm: "h-10 rounded-sm px-3 text-sm",
        md: "h-12 rounded-md px-4 text-sm",
        lg: "h-14 w-full rounded-lg px-5 text-base",
        icon: "size-11 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };
