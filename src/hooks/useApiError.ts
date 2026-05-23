import type { ApiError } from "@/api/client";

type UseApiErrorResult = {
  message: string;
  status: number | null;
  isServerError: boolean;
  isNetworkError: boolean;
  isTimeout: boolean;
};

/**
 * Normaliza qualquer erro em propriedades legíveis para a UI.
 *
 * Suporta:
 * - ApiError (status, code, etc.)
 * - Error genérico (message)
 * - Erros desconhecidos (fallback seguro)
 */
export function useApiError(error: unknown): UseApiErrorResult {
  if (isApiError(error)) {
    return {
      message: error.message,
      status: error.status,
      isServerError: error.isServerError,
      isNetworkError: error.isNetworkError,
      isTimeout: error.isTimeout,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      status: null,
      isServerError: false,
      isNetworkError: false,
      isTimeout: false,
    };
  }

  return {
    message: "An unexpected error occurred. Please try again.",
    status: null,
    isServerError: false,
    isNetworkError: false,
    isTimeout: false,
  };
}

function isApiError(err: unknown): err is ApiError {
  return err instanceof Error && err.name === "ApiError" && "status" in err;
}
