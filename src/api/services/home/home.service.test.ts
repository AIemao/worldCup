import { ApiError } from "@/api/client";
import { homeMockData } from "@/features/home/data/home.mock";
import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";
import { afterEach, describe, expect, it } from "vitest";
import { getHomeData } from "./home.service";

afterEach(() => server.resetHandlers());

describe("getHomeData", () => {
  it("retorna HomeData válido quando o servidor responde com sucesso", async () => {
    server.use(http.get("/home", () => HttpResponse.json(homeMockData)));

    const data = await getHomeData();

    expect(data.featuredMatch?.id).toBe("wc26-opening-match");
    expect(data.stats).toHaveLength(4);
    expect(data.stats[0].label).toBe("Teams");
  });

  it("lança erro quando o schema é inválido (Zod)", async () => {
    server.use(http.get("/home", () => HttpResponse.json({ invalid: true })));

    await expect(getHomeData()).rejects.toThrow();
  });

  it("lança ApiError em resposta 500", async () => {
    server.use(http.get("/home", () => new HttpResponse(null, { status: 500 })));

    await expect(getHomeData()).rejects.toBeInstanceOf(ApiError);
  });

  it("lança ApiError em resposta 404", async () => {
    server.use(http.get("/home", () => new HttpResponse(null, { status: 404 })));

    const err = await getHomeData().catch((e: unknown) => e);
    expect(err).toBeInstanceOf(ApiError);
    expect((err as ApiError).status).toBe(404);
  });

  it("lança ApiError quando a resposta contém JSON malformado", async () => {
    server.use(
      http.get(
        "/home",
        () =>
          new HttpResponse("{ malformed json ::::", {
            status: 200,
            headers: { "Content-Type": "application/json" },
          })
      )
    );

    const err = await getHomeData().catch((e: unknown) => e);
    expect(err).toBeInstanceOf(ApiError);
    expect((err as ApiError).code).toBe("INVALID_JSON");
  });

  it("lança ApiError em falha de rede", async () => {
    server.use(http.get("/home", () => HttpResponse.error()));

    const err = await getHomeData().catch((e: unknown) => e);
    expect(err).toBeInstanceOf(ApiError);
    expect((err as ApiError).code).toBe("NETWORK_ERROR");
  });
});
