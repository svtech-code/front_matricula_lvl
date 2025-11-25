import { useEffect, useRef, useState } from 'react';
import { getGeneroUseCase } from '@/di';
import { useFichaMatricula } from '@/shared/hooks/useFichaMatricula';

export const useGetGeneros = () => {
  const { generos, setGeneros } = useFichaMatricula();
  const [isLoading, setIsLoading] = useState(false);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    if (isLoadedRef.current || generos.length > 0) return;
    isLoadedRef.current = true;

    const loadGeneros = async () => {
      setIsLoading(true);

      try {
        const respuestaGeneros = await getGeneroUseCase().execute();
        setGeneros(respuestaGeneros?.data.generos || []);
      } catch (error) {
        console.error(error);
        throw new Error('Error al cargar los generos');
      } finally {
        setIsLoading(false);
      }
    };

    loadGeneros();
  }, [generos.length, setGeneros]);

  return { generos, isLoading };
};
