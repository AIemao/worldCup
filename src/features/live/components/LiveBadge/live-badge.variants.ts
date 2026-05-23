import { cva, type VariantProps } from "class-variance-authority";

export const liveBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-semibold transition-colors",
  {
    variants: {
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-base",
      },
      variant: {
        default: "bg-red-500/20 text-red-400 border border-red-500/40",
        bright: "bg-red-500 text-white shadow-[0_0_12px_theme(colors.red.500/60%)]",
        subtle: "bg-red-500/10 text-red-400 border border-red-500/20",
      },
    },
    defaultVariants: { size: "md", variant: "default" },
  }
);

export type LiveBadgeVariants = VariantProps<typeof liveBadgeVariants>;
