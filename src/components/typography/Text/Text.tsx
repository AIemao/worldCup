import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";

const textVariants = cva("", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
    intent: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      brand: "text-brand",
      destructive: "text-destructive",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    leading: {
      tight: "leading-tight",
      normal: "leading-normal",
      relaxed: "leading-relaxed",
    },
  },
  defaultVariants: {
    size: "base",
    intent: "default",
    weight: "normal",
    leading: "normal",
  },
});

type TextElement = "p" | "span" | "div" | "label" | "strong" | "em" | "small";

type TextProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof textVariants> & {
    as?: TextElement;
    children: ReactNode;
  };

export function Text({
  as: Tag = "p",
  size,
  intent,
  weight,
  leading,
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Tag className={cn(textVariants({ size, intent, weight, leading, className }))} {...props}>
      {children}
    </Tag>
  );
}

export { textVariants };
