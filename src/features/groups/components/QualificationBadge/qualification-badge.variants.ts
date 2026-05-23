import { cva, type VariantProps } from "class-variance-authority";

export const qualificationBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      status: {
        qualified: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
        playoff: "bg-amber-500/15 text-amber-400 border border-amber-500/25",
        eliminated: "bg-muted/50 text-muted-foreground border border-border/40 opacity-60",
        pending: "bg-secondary text-secondary-foreground border border-border/40",
      },
    },
    defaultVariants: { status: "pending" },
  }
);

export type QualificationBadgeVariants = VariantProps<typeof qualificationBadgeVariants>;
