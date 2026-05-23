import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GroupTabs } from "./GroupTabs";

afterEach(() => cleanup());

describe("GroupTabs", () => {
  it("exibe todas as 8 abas de grupos", () => {
    render(<GroupTabs activeGroup="A" onGroupChange={vi.fn()} />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(8);
  });

  it("marca a aba ativa com aria-selected=true", () => {
    render(<GroupTabs activeGroup="C" onGroupChange={vi.fn()} />);
    const activeTab = screen.getByRole("tab", { name: /Group C/i });
    expect(activeTab).toHaveAttribute("aria-selected", "true");
  });

  it("demais abas têm aria-selected=false", () => {
    render(<GroupTabs activeGroup="A" onGroupChange={vi.fn()} />);
    const inactiveTab = screen.getByRole("tab", { name: /Group B/i });
    expect(inactiveTab).toHaveAttribute("aria-selected", "false");
  });

  it("chama onGroupChange ao clicar em uma aba", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<GroupTabs activeGroup="A" onGroupChange={onChange} />);
    await user.click(screen.getByRole("tab", { name: /Group D/i }));
    expect(onChange).toHaveBeenCalledWith("D");
  });

  it("tem role='tablist' com aria-label", () => {
    render(<GroupTabs activeGroup="A" onGroupChange={vi.fn()} />);
    expect(screen.getByRole("tablist", { name: /World Cup Groups/i })).toBeInTheDocument();
  });

  it("cada aba tem aria-controls", () => {
    render(<GroupTabs activeGroup="A" onGroupChange={vi.fn()} />);
    const tabA = screen.getByRole("tab", { name: /Group A/i });
    expect(tabA).toHaveAttribute("aria-controls", "group-panel-A");
  });
});
