import { useState } from 'react';
import { verifyPreMatriculaUseCase } from '@/di/preMatricula.container';
import type {
  PreMatriculaApiResponse,
  PreMatriculaPayload,
} from '@/domains/preMatricula/preMatricula.entity';

export const useVerifyPreMatricula = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyPreMatricula = async (
    payload: PreMatriculaPayload,
  ): Promise<PreMatriculaApiResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await verifyPreMatriculaUseCase().execute(payload);
      return response;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error al verificar pre-matrícula';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    verifyPreMatricula,
    isLoading,
    error,
  };
};
