import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { groupStandingsMockData } from "../../data";
import { GroupTableRow } from "./GroupTableRow";

afterEach(() => cleanup());

const brazilStanding = groupStandingsMockData["A"][0]; // BRA, position 1, qualified
const cameroonStanding = groupStandingsMockData["A"][3]; // CMR, position 4, eliminated

describe("GroupTableRow", () => {
  it("exibe o nome abreviado do time", () => {
    render(
      <table>
        <tbody>
          <GroupTableRow standing={brazilStanding} />
        </tbody>
      </table>
    );
    expect(screen.getByText("BRA")).toBeInTheDocument();
  });

  it("exibe a posição do time", () => {
    render(
      <table>
        <tbody>
          <GroupTableRow standing={brazilStanding} />
        </tbody>
      </table>
    );
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("exibe os pontos corretamente", () => {
    render(
      <table>
        <tbody>
          <GroupTableRow standing={brazilStanding} />
        </tbody>
      </table>
    );
    expect(screen.getByText("9")).toBeInTheDocument();
  });

  it("tem aria-label descritivo na linha", () => {
    render(
      <table>
        <tbody>
          <GroupTableRow standing={brazilStanding} />
        </tbody>
      </table>
    );
    expect(screen.getByRole("row", { name: /Brazil.*position 1.*9 points/i })).toBeInTheDocument();
  });

  it("aplica classe de opacidade para times eliminados", () => {
    const { container } = render(
      <table>
        <tbody>
          <GroupTableRow standing={cameroonStanding} />
        </tbody>
      </table>
    );
    expect(container.querySelector("tr")).toHaveClass("opacity-50");
  });

  it("exibe emoji de bandeira com aria-label", () => {
    render(
      <table>
        <tbody>
          <GroupTableRow standing={brazilStanding} />
        </tbody>
      </table>
    );
    expect(screen.getByLabelText("Brazil flag")).toBeInTheDocument();
  });

  it("exibe QualificationBadge compacto", () => {
    render(
      <table>
        <tbody>
          <GroupTableRow standing={brazilStanding} />
        </tbody>
      </table>
    );
    expect(screen.getByLabelText("Qualified for knockout stage")).toBeInTheDocument();
  });
});
