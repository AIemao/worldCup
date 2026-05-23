import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";
import { cardVariants, type CardVariants } from "./card.variants";

// ─── Card (root) ────────────────────────────────────────────────────────────

type CardProps = HTMLAttributes<HTMLDivElement> & CardVariants;

export function Card({ className, variant, hoverable, ...props }: CardProps) {
  return <div className={cn(cardVariants({ variant, hoverable, className }))} {...props} />;
}

// ─── CardHeader ─────────────────────────────────────────────────────────────

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />;
}

// ─── CardTitle ──────────────────────────────────────────────────────────────

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-foreground text-base leading-tight font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
}

// ─── CardDescription ────────────────────────────────────────────────────────

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-muted-foreground text-sm", className)} {...props} />;
}

// ─── CardContent ────────────────────────────────────────────────────────────

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

// ─── CardFooter ─────────────────────────────────────────────────────────────

type CardFooterProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function CardFooter({ className, ...props }: CardFooterProps) {
  return <div className={cn("flex items-center gap-3 p-6 pt-0", className)} {...props} />;
}
