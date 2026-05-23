import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";
import { badgeVariants, type BadgeVariants } from "./badge.variants";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & BadgeVariants;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}
