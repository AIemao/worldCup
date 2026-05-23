import { cva, type VariantProps } from "class-variance-authority";

export const textVariants = cva("", {
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
  defaultVariants: { size: "base", intent: "default", weight: "normal", leading: "normal" },
});

export type TextVariants = VariantProps<typeof textVariants>;

export type TextElement = "p" | "span" | "div" | "label" | "strong" | "em" | "small";
