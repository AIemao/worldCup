import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PageWrapperProps = {
  // título acessível (renderizado como sr-only para screen readers)
  title: string;
  className?: string;
  children: ReactNode;
};

export function PageWrapper({ title, className, children }: PageWrapperProps) {
  return (
    <main className={cn("flex flex-1 flex-col", className)}>
      <h1 className="sr-only">{title}</h1>
      {children}
    </main>
  );
}
