import { cn } from "@/lib/utils";
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { gridVariants, type GridVariants } from "./grid.variants";

type GridProps = HTMLAttributes<HTMLElement> &
  GridVariants & {
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
