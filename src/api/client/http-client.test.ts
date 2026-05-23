import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";
import { afterEach, describe, expect, it } from "vitest";
import { ApiError } from "./api-error";
import { httpClient } from "./http-client";

afterEach(() => server.resetHandlers());

describe("httpClient", () => {
  it("retorna dados parseados em resposta 200", async () => {
    server.use(http.get("/test-endpoint", () => HttpResponse.json({ value: 42 })));

    const result = await httpClient<{ value: number }>("/test-endpoint");
    expect(result.value).toBe(42);
  });

  it("lança ApiError em resposta 4xx", async () => {
    server.use(http.get("/test-endpoint", () => new HttpResponse(null, { status: 403 })));

    const err = await httpClient("/test-endpoint").catch((e: unknown) => e);
    expect(err).toBeInstanceOf(ApiError);
    expect((err as ApiError).status).toBe(403);
  });

  it("lança ApiError em resposta 5xx", async () => {
    server.use(http.get("/test-endpoint", () => new HttpResponse(null, { status: 503 })));

    const err = await httpClient("/test-endpoint").catch((e: unknown) => e);
    expect(err).toBeInstanceOf(ApiError);
    expect((err as ApiError).isServerError).toBe(true);
  });

  it("lança ApiError com code NETWORK_ERROR em falha de rede", async () => {
    server.use(http.get("/test-endpoint", () => HttpResponse.error()));

    const err = await httpClient("/test-endpoint").catch((e: unknown) => e);
    expect(err).toBeInstanceOf(ApiError);
    expect((err as ApiError).code).toBe("NETWORK_ERROR");
  });

  it("lança ApiError com code INVALID_JSON para JSON malformado", async () => {
    server.use(
      http.get(
        "/test-endpoint",
        () =>
          new HttpResponse("not valid json |||", {
            status: 200,
            headers: { "Content-Type": "application/json" },
          })
      )
    );

    const err = await httpClient("/test-endpoint").catch((e: unknown) => e);
    expect(err).toBeInstanceOf(ApiError);
    expect((err as ApiError).code).toBe("INVALID_JSON");
  });

  it("lança ApiError com code TIMEOUT quando timeout é excedido", async () => {
    server.use(
      http.get("/test-endpoint", async () => {
        await new Promise((resolve) => setTimeout(resolve, 200));
        return HttpResponse.json({});
      })
    );

    const err = await httpClient("/test-endpoint", { timeout: 50 }).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(ApiError);
    expect((err as ApiError).code).toBe("TIMEOUT");
  });
});

describe("ApiError", () => {
  it("identifica client errors (4xx)", () => {
    const err = new ApiError("Not Found", { status: 404 });
    expect(err.isClientError).toBe(true);
    expect(err.isServerError).toBe(false);
  });

  it("identifica server errors (5xx)", () => {
    const err = new ApiError("Internal Server Error", { status: 500 });
    expect(err.isServerError).toBe(true);
    expect(err.isClientError).toBe(false);
  });

  it("identifica network errors (status 0)", () => {
    const err = new ApiError("Network failure", { status: 0 });
    expect(err.isNetworkError).toBe(true);
  });

  it("identifica timeout", () => {
    const err = new ApiError("Timed out", { status: 408, code: "TIMEOUT" });
    expect(err.isTimeout).toBe(true);
  });

  it("o name é ApiError", () => {
    const err = new ApiError("Test", { status: 400 });
    expect(err.name).toBe("ApiError");
    expect(err.message).toBe("Test");
  });
});
