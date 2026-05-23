import { cva, type VariantProps } from "class-variance-authority";

export const cardVariants = cva("rounded-xl border text-card-foreground transition-colors", {
  variants: {
    variant: {
      default: "bg-card border-border",
      glass: "bg-background/60 border-border/50 backdrop-blur-md text-foreground",
      elevated: "bg-card border-border/50 shadow-lg",
      ghost: "bg-transparent border-border/30 text-foreground",
    },
    hoverable: {
      true: "cursor-pointer hover:border-border/80 hover:bg-card/80 transition-colors",
      false: "",
    },
  },
  defaultVariants: { variant: "default", hoverable: false },
});

export type CardVariants = VariantProps<typeof cardVariants>;
