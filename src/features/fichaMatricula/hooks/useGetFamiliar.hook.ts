import { useState } from 'react';
import { getFamiliarUseCase } from '@/di/familiar.container';
import type { FamiliarApiResponse } from '@/domains/familiar/familiar.entity';

export const useGetFamiliar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFamiliar = async (
    run_familiar: number,
  ): Promise<FamiliarApiResponse | null> => {
    if (!run_familiar || run_familiar === 0) return null;

    setIsLoading(true);
    setError(null);

    try {
      const useCase = getFamiliarUseCase();
      const response = await useCase.execute(run_familiar);
      return response;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error al buscar familiar';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getFamiliar,
    isLoading,
    error,
  };
};
