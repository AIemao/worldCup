import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
        primary: "bg-primary text-primary-foreground",
        brand: "bg-brand/15 text-brand border border-brand/25",
        success: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
        warning: "bg-amber-500/15 text-amber-400 border border-amber-500/25",
        destructive: "bg-destructive/15 text-destructive border border-destructive/25",
        outline: "border border-border text-foreground bg-transparent",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

type BadgeProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}

export { badgeVariants };
