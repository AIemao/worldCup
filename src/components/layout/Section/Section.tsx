import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionSpacing = "sm" | "md" | "lg" | "xl";

const spacingClasses: Record<SectionSpacing, string> = {
  sm: "py-8",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-24",
  xl: "py-24 md:py-32",
};

type SectionProps = {
  spacing?: SectionSpacing;
  className?: string;
  children: ReactNode;
  id?: string;
};

export function Section({ spacing = "md", className, children, id }: SectionProps) {
  return (
    <section id={id} className={cn(spacingClasses[spacing], className)}>
      {children}
    </section>
  );
}
