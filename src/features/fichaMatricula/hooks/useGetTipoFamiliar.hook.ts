import { useEffect, useRef, useState } from 'react';
import { getTipoFamiliarUseCase } from '@/di';
import { useFichaMatricula } from '@/shared/hooks/useFichaMatricula';

export const useGetTipoFamiliar = () => {
  const { tipoFamiliares, setTipoFamiliares } = useFichaMatricula();
  const [isLoading, setIsLoading] = useState(false);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    if (isLoadedRef.current || tipoFamiliares.length > 0) return;
    isLoadedRef.current = true;

    const loadTipoFamiliares = async () => {
      setIsLoading(true);

      try {
        const tipoFamiliarResponse = await getTipoFamiliarUseCase().execute();
        setTipoFamiliares(tipoFamiliarResponse?.data.tipos_familiares || []);
      } catch (error) {
        console.error(error);
        throw new Error('Error al cargar los tipos de familiares');
      } finally {
        setIsLoading(false);
      }
    };

    loadTipoFamiliares();
  }, [setTipoFamiliares, tipoFamiliares.length]);

  return { tipoFamiliares, isLoading };
};
