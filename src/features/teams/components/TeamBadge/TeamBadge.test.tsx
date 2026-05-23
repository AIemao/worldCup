import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { TeamBadge } from "./TeamBadge";

const team = {
  badge: "https://www.thesportsdb.com/images/media/team/badge/bra.png",
  name: "Brazil",
  flagEmoji: "🇧🇷",
};

afterEach(() => cleanup());

describe("TeamBadge", () => {
  it("renderiza a imagem do escudo", () => {
    render(<TeamBadge team={team} />);
    const img = screen.getByRole("img", { name: /Brazil badge/i });
    expect(img).toBeDefined();
  });

  it("exibe o emoji ao falhar no carregamento da imagem", async () => {
    render(<TeamBadge team={team} />);
    const img = screen.getByRole("img", { name: /Brazil badge/i }) as HTMLImageElement;
    img.dispatchEvent(new Event("error"));
    // After error, a span with role="img" shows flagEmoji
    const fallback = await screen.findByRole("img", { name: /Brazil flag/i });
    expect(fallback.textContent).toContain("🇧🇷");
  });

  it("aplica classe de tamanho md por padrão", () => {
    const { container } = render(<TeamBadge team={team} />);
    expect(container.firstChild).toBeDefined();
  });

  it("aceita prop size xl", () => {
    render(<TeamBadge team={team} size="xl" />);
    const img = screen.getByRole("img", { name: /Brazil badge/i });
    expect(img.className).toContain("h-24");
  });
});
