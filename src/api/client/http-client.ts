import { API_BASE_URL, API_TIMEOUT_MS } from "@/api/config/api.config";
import { ApiError } from "./api-error";

type HttpClientInit = RequestInit & {
  /** Override timeout in ms. Defaults to API_TIMEOUT_MS. */
  timeout?: number;
};

/**
 * Typed fetch wrapper — único ponto de saída de todas as chamadas HTTP.
 *
 * Responsabilidades:
 * - Constrói URL completa (base + path)
 * - Aplica headers padrão (Content-Type, Accept)
 * - Cancela a requisição após timeout via AbortController
 * - Combina o signal externo (se fornecido) com o signal de timeout
 * - Normaliza todos os erros para ApiError
 * - Valida a resposta (ok?) antes de parsear
 * - Parsea JSON com tratamento de JSON malformado
 *
 * Não usa axios — fetch nativo com AbortSignal para cancelamento.
 */
export async function httpClient<T>(input: RequestInfo, init: HttpClientInit = {}): Promise<T> {
  const { timeout = API_TIMEOUT_MS, signal: externalSignal, ...requestInit } = init;

  // Timeout via AbortController
  const timeoutController = new AbortController();
  const timeoutId = setTimeout(() => timeoutController.abort("timeout"), timeout);

  // Combina o signal externo (se houver) com o signal de timeout.
  // AbortSignal.any() aborta assim que qualquer signal for acionado.
  const signals: AbortSignal[] = [timeoutController.signal];
  if (externalSignal) {
    signals.push(externalSignal as AbortSignal);
  }
  const signal = AbortSignal.any(signals);

  const url =
    typeof input === "string" && !input.startsWith("http") ? `${API_BASE_URL}${input}` : input;

  try {
    const response = await fetch(url, {
      ...requestInit,
      signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(requestInit.headers ?? {}),
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new ApiError(`HTTP ${response.status}: ${response.statusText}`, {
        status: response.status,
        response,
      });
    }

    // Resposta vazia (204 No Content, etc.)
    const text = await response.text();
    if (!text) {
      return undefined as T;
    }

    try {
      return JSON.parse(text) as T;
    } catch {
      throw new ApiError("Invalid JSON in response body", {
        status: response.status,
        code: "INVALID_JSON",
        response,
      });
    }
  } catch (err) {
    clearTimeout(timeoutId);

    if (err instanceof ApiError) throw err;

    // Timeout check FIRST: garante o code correto independente do tipo de erro
    // que o fetch lança ao ser abortado (DOMException em browsers, TypeError em Node/jsdom).
    if (timeoutController.signal.aborted) {
      throw new ApiError(`Request timed out after ${timeout}ms`, {
        status: 408,
        code: "TIMEOUT",
      });
    }

    if (err instanceof Error && err.name === "AbortError") {
      throw new ApiError("Request was cancelled", {
        status: 0,
        code: "ABORTED",
      });
    }

    throw new ApiError("Network request failed", {
      status: 0,
      code: "NETWORK_ERROR",
      cause: err,
    });
  }
}
