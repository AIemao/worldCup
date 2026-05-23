import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";

const glassPanelVariants = cva("rounded-xl border transition-colors", {
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

type GlassPanelProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof glassPanelVariants> & {
    children: ReactNode;
  };

export function GlassPanel({ className, intensity, glow, children, ...props }: GlassPanelProps) {
  return (
    <div className={cn(glassPanelVariants({ intensity, glow, className }))} {...props}>
      {children}
    </div>
  );
}

export { glassPanelVariants };
