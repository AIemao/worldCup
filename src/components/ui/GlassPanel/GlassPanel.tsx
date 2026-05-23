import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";
import { glassPanelVariants, type GlassPanelVariants } from "./glass-panel.variants";

type GlassPanelProps = HTMLAttributes<HTMLDivElement> &
  GlassPanelVariants & {
    children: ReactNode;
  };

export function GlassPanel({ className, intensity, glow, children, ...props }: GlassPanelProps) {
  return (
    <div className={cn(glassPanelVariants({ intensity, glow, className }))} {...props}>
      {children}
    </div>
  );
}
