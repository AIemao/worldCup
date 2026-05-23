import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";
import { headingVariants, type HeadingElement, type HeadingVariants } from "./heading.variants";

type HeadingProps = HTMLAttributes<HTMLHeadingElement> &
  HeadingVariants & {
    as?: HeadingElement;
    children: ReactNode;
  };

export function Heading({
  as: Tag = "h2",
  size,
  intent,
  className,
  children,
  ...props
}: HeadingProps) {
  return (
    <Tag className={cn(headingVariants({ size, intent, className }))} {...props}>
      {children}
    </Tag>
  );
}
