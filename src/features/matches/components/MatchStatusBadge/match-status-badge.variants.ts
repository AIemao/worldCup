import { cva, type VariantProps } from "class-variance-authority";

export const matchStatusBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      status: {
        upcoming: "bg-brand/15 text-brand border border-brand/25",
        live: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
        finished: "bg-secondary text-secondary-foreground border border-border/40",
      },
    },
    defaultVariants: { status: "upcoming" },
  }
);

export type MatchStatusBadgeVariants = VariantProps<typeof matchStatusBadgeVariants>;
