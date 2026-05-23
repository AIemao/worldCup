import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";
import { textVariants, type TextElement, type TextVariants } from "./text.variants";

type TextProps = HTMLAttributes<HTMLElement> &
  TextVariants & {
    as?: TextElement;
    children: ReactNode;
  };

export function Text({
  as: Tag = "p",
  size,
  intent,
  weight,
  leading,
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Tag className={cn(textVariants({ size, intent, weight, leading, className }))} {...props}>
      {children}
    </Tag>
  );
}
