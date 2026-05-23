import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionHeaderProps = {
  label?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  label,
  title,
  description,
  action,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {label && (
        <span className="text-brand text-xs font-semibold tracking-widest uppercase">{label}</span>
      )}

      <h2 className="text-foreground text-2xl font-bold tracking-tight lg:text-3xl">{title}</h2>

      {description && <p className="text-muted-foreground max-w-prose text-base">{description}</p>}

      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
