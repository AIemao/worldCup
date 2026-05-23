import { homeMockData } from "../data/home.mock";
import type { HomeData } from "../types/home.types";

type UseHomeDataResult = {
  data: HomeData;
  isLoading: boolean;
  isError: boolean;
};

/**
 * Camada de acesso aos dados da homepage.
 *
 * Hoje retorna mock data diretamente.
 * Na Etapa 06 (Data Layer), este hook será substituído por
 * useQuery + serviço de API + MSW handlers, sem alterar a
 * interface consumida pelos componentes de seção.
 */
export function useHomeData(): UseHomeDataResult {
  return {
    data: homeMockData,
    isLoading: false,
    isError: false,
  };
}
