import { cn } from "@/lib/utils";
import {
  NavLink as RouterNavLink,
  type NavLinkProps as RouterNavLinkProps,
} from "react-router-dom";

type NavLinkProps = Omit<RouterNavLinkProps, "className"> & {
  className?: string;
};

/**
 * Wrapper sobre o NavLink do React Router com active state styling.
 * Aplica text-foreground quando ativo e text-muted-foreground quando inativo.
 * Suporta className adicional para estilos específicos de contexto.
 */
export function NavLink({ className, children, ...props }: NavLinkProps) {
  return (
    <RouterNavLink
      className={({ isActive }) =>
        cn(
          "hover:text-foreground text-sm font-medium transition-colors",
          isActive ? "text-foreground" : "text-muted-foreground",
          className
        )
      }
      {...props}
    >
      {children}
    </RouterNavLink>
  );
}
