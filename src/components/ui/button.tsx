import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  /* `rounded-sm` is 12px in this project's scale (--radius is 1.25rem), and that
     is deliberate rather than a small corner picked at random. The radius has to
     be under half the button's height or the browser clamps it and the button
     renders as a pill anyway — and the smallest button here is `sm` at 32px, so
     anything at 16px (rounded-md) or above would leave the header and filter
     buttons looking exactly as they did. 12px reads as a rectangle on every size,
     and it is a token, so it still tracks --radius. */
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-semibold transition-[transform,box-shadow,background-color,border-color,color] duration-200 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 shrink-0 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-soft hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0",
        brand:
          "bg-cta text-cta-foreground shadow-soft hover:bg-cta/90 hover:shadow-lift hover:-translate-y-0.5 active:translate-y-0",
        secondary:
          "bg-secondary text-secondary-foreground shadow-soft hover:shadow-lift hover:-translate-y-0.5 active:translate-y-0",
        outline:
          "border-2 border-border bg-transparent hover:border-primary hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        subtle: "bg-muted text-foreground hover:bg-accent",
        link: "text-primary underline-offset-4 hover:underline",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        default: "h-10 px-5 py-2 has-[>svg]:px-4",
        sm: "h-8 gap-1.5 px-3.5 text-[13px] has-[>svg]:px-3",
        lg: "h-12 px-7 text-base has-[>svg]:px-6",
        xl: "h-14 px-9 text-lg has-[>svg]:px-8",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
