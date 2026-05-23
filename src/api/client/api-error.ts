/**
 * ApiError — erro normalizado para todas as falhas HTTP.
 *
 * Garante que qualquer erro proveniente do httpClient seja
 * uma instância estruturada com status, code e cause, independente
 * da origem (timeout, rede, 4xx, 5xx, JSON inválido).
 */
export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly cause?: unknown;
  readonly response?: Response;

  constructor(
    message: string,
    options: {
      status: number;
      code?: string;
      cause?: unknown;
      response?: Response;
    }
  ) {
    super(message);
    this.name = "ApiError";
    this.status = options.status;
    this.code = options.code;
    this.cause = options.cause;
    this.response = options.response;
  }

  get isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  get isServerError(): boolean {
    return this.status >= 500;
  }

  get isNetworkError(): boolean {
    return this.status === 0;
  }

  get isTimeout(): boolean {
    return this.code === "TIMEOUT";
  }
}
