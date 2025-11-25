import { useState } from 'react';
import { createFichaMatriculaUseCase } from '@/di/fichaMatricula.container';
import type {
  CreateFichaMatriculaPayload,
  CreateFichaMatriculaResponse,
} from '@/domains/fichaMatricula/fichaMatricula.entity';

export const useCreateFichaMatricula = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CreateFichaMatriculaResponse | null>(null);

  const createFichaMatricula = async (payload: CreateFichaMatriculaPayload) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await createFichaMatriculaUseCase().execute(payload);
      setData(response);
      return response;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createFichaMatricula,
    isLoading,
    error,
    data,
  };
};
