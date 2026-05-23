import { queryKeys } from "@/api/queries";
import { getHomeData } from "@/api/services/home";
import { useQuery } from "@tanstack/react-query";
import type { HomeData } from "../types/home.types";

type UseHomeDataResult = {
  data: HomeData | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
};

/**
 * Acessa os dados da homepage via React Query.
 *
 * Interface pública estável — a implementação interna pode evoluir
 * (mock → useQuery → SSR) sem alterar os componentes consumidores.
 */
export function useHomeData(): UseHomeDataResult {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: queryKeys.home.data(),
    queryFn: getHomeData,
  });

  return { data, isLoading, isError, error, refetch };
}
