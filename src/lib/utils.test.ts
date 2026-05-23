import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn()", () => {
  it("concatena class names simples", () => {
    expect(cn("px-2", "py-4")).toBe("px-2 py-4");
  });

  it("resolve conflitos de utilidades Tailwind (último vence)", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
  });

  it("ignora valores falsy (false, null, undefined)", () => {
    expect(cn("base", false, null, undefined, "visible")).toBe("base visible");
  });

  it("suporta objetos condicionais", () => {
    expect(cn({ "font-bold": true, italic: false })).toBe("font-bold");
  });
});
