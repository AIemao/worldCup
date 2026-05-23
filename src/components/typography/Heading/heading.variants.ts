import { cva, type VariantProps } from "class-variance-authority";

export const headingVariants = cva("tracking-tight", {
  variants: {
    size: {
      xs: "text-base font-semibold",
      sm: "text-lg font-semibold",
      md: "text-xl font-semibold",
      lg: "text-2xl font-bold lg:text-3xl",
      xl: "text-3xl font-bold lg:text-4xl",
      "2xl": "text-4xl font-bold lg:text-5xl",
      "3xl": "text-5xl font-extrabold lg:text-6xl xl:text-7xl",
    },
    intent: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      brand: "text-brand",
      gradient:
        "bg-gradient-to-br from-foreground via-foreground to-foreground/40 bg-clip-text text-transparent",
    },
  },
  defaultVariants: { size: "lg", intent: "default" },
});

export type HeadingVariants = VariantProps<typeof headingVariants>;

export type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
