import { NavLink } from "@/components/navigation/NavLink";
import { ROUTES } from "@/config/constants";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { to: ROUTES.MATCHES, label: "Matches" },
  { to: ROUTES.GROUPS, label: "Groups" },
  { to: ROUTES.TEAMS, label: "Teams" },
  { to: ROUTES.STANDINGS, label: "Standings" },
] as const;

type AppNavProps = {
  className?: string;
};

export function AppNav({ className }: AppNavProps) {
  return (
    <nav className={cn("flex items-center gap-6", className)} aria-label="Main navigation">
      {NAV_ITEMS.map((item) => (
        <NavLink key={item.to} to={item.to} className="text-sm font-medium">
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
