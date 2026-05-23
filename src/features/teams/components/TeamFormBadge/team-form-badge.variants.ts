import { cva, type VariantProps } from "class-variance-authority";

export const teamFormResultVariants = cva(
  "inline-flex h-6 w-6 items-center justify-center rounded text-xs font-bold tabular-nums",
  {
    variants: {
      result: {
        W: "border border-emerald-500/30 bg-emerald-500/20 text-emerald-400",
        D: "border border-amber-500/30 bg-amber-500/20 text-amber-400",
        L: "border border-red-500/30 bg-red-500/20 text-red-400",
      },
    },
    defaultVariants: { result: "D" },
  }
);

export type TeamFormResultVariants = VariantProps<typeof teamFormResultVariants>;
