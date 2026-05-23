import type { ReactNode } from "react";

// Tipos utilitários comuns usados nos components e layouts

export type WithChildren = {
    children: ReactNode;
};

export type WithClassName = {
    className?: string;
};

export type PropsWithClassName<T = object> = T & WithClassName;

export type Nullable<T> = T | null;

export type Theme = "dark" | "light" | "system";

export type ResolvedTheme = "dark" | "light";
