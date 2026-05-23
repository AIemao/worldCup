import { cn } from "@/lib/utils";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useCallback, useId } from "react";
import type { MatchFilters, MatchStage, MatchStatus } from "../../types/match.types";
import { STAGE_LABELS } from "../../types/match.types";

type MatchFiltersProps = {
  filters: MatchFilters;
  onChange: (updates: Partial<MatchFilters>) => void;
  onReset: () => void;
  className?: string;
};

const STATUS_OPTIONS: { value: MatchStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "upcoming", label: "Upcoming" },
  { value: "live", label: "Live" },
  { value: "finished", label: "Final" },
];

const STAGE_OPTIONS: { value: MatchStage | "all"; label: string }[] = [
  { value: "all", label: "All Stages" },
  { value: "group_a", label: "Group A" },
  { value: "group_b", label: "Group B" },
  { value: "group_c", label: "Group C" },
  { value: "group_d", label: "Group D" },
  { value: "group_e", label: "Group E" },
  { value: "group_f", label: "Group F" },
  { value: "group_g", label: "Group G" },
  { value: "group_h", label: "Group H" },
  { value: "round_of_32", label: STAGE_LABELS.round_of_32 },
  { value: "round_of_16", label: STAGE_LABELS.round_of_16 },
  { value: "quarter_final", label: STAGE_LABELS.quarter_final },
  { value: "semi_final", label: STAGE_LABELS.semi_final },
  { value: "third_place", label: STAGE_LABELS.third_place },
  { value: "final", label: STAGE_LABELS.final },
];

const hasActiveFilters = (filters: MatchFilters) =>
  filters.status !== "all" ||
  filters.stage !== "all" ||
  filters.search.trim() !== "" ||
  filters.team !== "";

/**
 * Painel de filtros para a lista de partidas.
 *
 * Filtros controlados externamente via props — sem estado interno.
 * Suporta: status, stage, busca livre e reset completo.
 */
export function MatchFilters({ filters, onChange, onReset, className }: MatchFiltersProps) {
  const searchId = useId();
  const statusId = useId();
  const stageId = useId();

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange({ search: e.target.value }),
    [onChange]
  );

  const handleStatus = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      onChange({ status: e.target.value as MatchStatus | "all" }),
    [onChange]
  );

  const handleStage = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      onChange({ stage: e.target.value as MatchStage | "all" }),
    [onChange]
  );

  const active = hasActiveFilters(filters);

  return (
    <div
      className={cn("flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center", className)}
      role="search"
      aria-label="Filter matches"
    >
      <div className="text-muted-foreground flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="text-sm font-medium">Filters</span>
      </div>

      {/* Search */}
      <div className="relative min-w-48 flex-1">
        <label htmlFor={searchId} className="sr-only">
          Search matches
        </label>
        <Search
          className="text-muted-foreground absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2"
          aria-hidden="true"
        />
        <input
          id={searchId}
          type="search"
          placeholder="Search teams, venue..."
          value={filters.search}
          onChange={handleSearch}
          className="bg-background/60 border-border/50 focus:border-brand/50 focus:ring-brand/20 w-full rounded-md border py-2 pr-3 pl-9 text-sm transition-colors outline-none focus:ring-1"
        />
      </div>

      {/* Status filter */}
      <div className="flex flex-col gap-1">
        <label htmlFor={statusId} className="sr-only">
          Filter by status
        </label>
        <select
          id={statusId}
          value={filters.status}
          onChange={handleStatus}
          className="bg-background/60 border-border/50 focus:border-brand/50 cursor-pointer rounded-md border px-3 py-2 text-sm transition-colors outline-none"
          aria-label="Filter by match status"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Stage filter */}
      <div className="flex flex-col gap-1">
        <label htmlFor={stageId} className="sr-only">
          Filter by stage
        </label>
        <select
          id={stageId}
          value={filters.stage}
          onChange={handleStage}
          className="bg-background/60 border-border/50 focus:border-brand/50 cursor-pointer rounded-md border px-3 py-2 text-sm transition-colors outline-none"
          aria-label="Filter by match stage"
        >
          {STAGE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Reset */}
      {active && (
        <button
          type="button"
          onClick={onReset}
          className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-sm transition-colors"
          aria-label="Clear all filters"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
          Clear
        </button>
      )}
    </div>
  );
}
