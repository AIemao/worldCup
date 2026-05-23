import { cva, type VariantProps } from "class-variance-authority";

export const gridVariants = cva("grid", {
  variants: {
    cols: {
      "1": "grid-cols-1",
      "2": "grid-cols-1 sm:grid-cols-2",
      "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      auto: "grid-cols-[repeat(auto-fill,minmax(280px,1fr))]",
    },
    gap: {
      none: "gap-0",
      sm: "gap-3",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
  },
  defaultVariants: { cols: "1", gap: "md" },
});

export type GridVariants = VariantProps<typeof gridVariants>;
