import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

const sizeClasses: Record<ContainerSize, string> = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-7xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
};

type ContainerProps = {
  size?: ContainerSize;
  className?: string;
  children: ReactNode;
  as?: ElementType;
};

export function Container({ size = "xl", className, children, as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizeClasses[size], className)}>
      {children}
    </Tag>
  );
}
