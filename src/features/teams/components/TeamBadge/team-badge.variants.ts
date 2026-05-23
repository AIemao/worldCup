import { cva, type VariantProps } from "class-variance-authority";

export const teamBadgeVariants = cva("object-contain flex-shrink-0", {
  variants: {
    size: {
      xs: "h-5 w-5",
      sm: "h-8 w-8",
      md: "h-12 w-12",
      lg: "h-16 w-16",
      xl: "h-24 w-24",
    },
  },
  defaultVariants: { size: "md" },
});

export type TeamBadgeVariants = VariantProps<typeof teamBadgeVariants>;
