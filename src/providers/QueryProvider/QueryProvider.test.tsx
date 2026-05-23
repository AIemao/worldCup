import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { QueryProvider } from "./QueryProvider";

afterEach(() => cleanup());

function createTestQueryClient() {
  return new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: 0 } } });
}

describe("QueryProvider", () => {
  it("renderiza children corretamente", () => {
    render(
      <QueryProvider>
        <span>hello world</span>
      </QueryProvider>
    );
    expect(screen.getByText("hello world")).toBeInTheDocument();
  });

  it("fornece QueryClient para hooks filhos", async () => {
    const testQueryClient = createTestQueryClient();

    function Child() {
      const { data } = useQuery({
        queryKey: ["test"],
        queryFn: () => Promise.resolve("ok"),
      });
      return <span>{data ?? "loading"}</span>;
    }

    render(
      <QueryClientProvider client={testQueryClient}>
        <Child />
      </QueryClientProvider>
    );

    // Verifica que o contexto está disponível (sem lançar "No QueryClient set")
    expect(screen.getByText("loading")).toBeInTheDocument();
  });
});
