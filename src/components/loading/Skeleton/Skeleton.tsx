import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

/**
 * Bloco genérico de skeleton com shimmer (animate-pulse).
 * Use para compor layouts de loading state em qualquer componente.
 */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("bg-muted animate-pulse rounded-md", className)}
      {...props}
    />
  );
}
