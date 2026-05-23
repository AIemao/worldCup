import { cn } from "@/lib/utils";
import { GROUP_LETTERS, type GroupLetter } from "../../types/groups.types";

type GroupTabsProps = {
  activeGroup: GroupLetter;
  onGroupChange: (letter: GroupLetter) => void;
  className?: string;
};

/**
 * Tabs de navegação entre grupos A–H.
 *
 * Usa botões com role="tab" + aria-selected para acessibilidade.
 * O estado ativo é gerenciado pelo componente pai (GroupsPage via useSearchParams).
 */
export function GroupTabs({ activeGroup, onGroupChange, className }: GroupTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="World Cup Groups"
      className={cn(
        "border-border/40 bg-card/30 flex items-center gap-1 overflow-x-auto rounded-xl border p-1.5",
        "scrollbar-none",
        className
      )}
    >
      {GROUP_LETTERS.map((letter) => {
        const isActive = letter === activeGroup;
        return (
          <button
            key={letter}
            role="tab"
            aria-selected={isActive}
            aria-controls={`group-panel-${letter}`}
            aria-label={`Group ${letter}`}
            id={`group-tab-${letter}`}
            onClick={() => onGroupChange(letter)}
            className={cn(
              "flex-shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-all",
              "focus-visible:ring-brand/50 focus-visible:ring-2 focus-visible:outline-none",
              isActive
                ? "bg-brand/15 text-brand border-brand/25 border shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            )}
          >
            <span aria-hidden="true">Group </span>
            {letter}
          </button>
        );
      })}
    </div>
  );
}
