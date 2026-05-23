import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";

// ─── Card (root) ────────────────────────────────────────────────────────────

const cardVariants = cva("rounded-xl border text-card-foreground transition-colors", {
  variants: {
    variant: {
      default: "bg-card border-border",
      glass: "bg-background/60 border-border/50 backdrop-blur-md text-foreground",
      elevated: "bg-card border-border/50 shadow-lg",
      ghost: "bg-transparent border-border/30 text-foreground",
    },
    hoverable: {
      true: "cursor-pointer hover:border-border/80 hover:bg-card/80 transition-colors",
      false: "",
    },
  },
  defaultVariants: { variant: "default", hoverable: false },
});

type CardProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>;

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

export { cardVariants };
