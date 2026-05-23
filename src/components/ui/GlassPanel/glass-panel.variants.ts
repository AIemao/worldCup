import { cva, type VariantProps } from "class-variance-authority";

export const glassPanelVariants = cva("rounded-xl border transition-colors", {
  variants: {
    intensity: {
      low: "bg-background/80 backdrop-blur-sm border-border/30",
      medium: "bg-background/60 backdrop-blur-md border-border/50",
      high: "bg-background/40 backdrop-blur-xl border-white/10",
    },
    glow: {
      none: "",
      sm: "shadow-glow-sm",
      md: "shadow-glow",
      lg: "shadow-glow-lg",
    },
  },
  defaultVariants: { intensity: "medium", glow: "none" },
});

export type GlassPanelVariants = VariantProps<typeof glassPanelVariants>;
