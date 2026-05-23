import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType, HTMLAttributes, ReactNode } from "react";

const gridVariants = cva("grid", {
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

type GridProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof gridVariants> & {
    children: ReactNode;
    as?: ElementType;
  };

export function Grid({ cols, gap, className, children, as: Tag = "div", ...props }: GridProps) {
  return (
    <Tag className={cn(gridVariants({ cols, gap, className }))} {...props}>
      {children}
    </Tag>
  );
}

export { gridVariants };
