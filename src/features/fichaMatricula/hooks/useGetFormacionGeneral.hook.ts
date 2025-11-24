import { useEffect, useRef, useState } from 'react';
import { getFormacionGeneralUseCase } from '@/di';
import { useFichaMatricula } from '@/shared/hooks/useFichaMatricula';

export const useGetFormacionGeneral = () => {
  const { formacionGeneral, setFormacionGeneral } = useFichaMatricula();
  const [isLoading, setIsLoading] = useState(false);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    if (isLoadedRef.current || formacionGeneral.length > 0) return;
    isLoadedRef.current = true;

    const loadFormacionGeneral = async () => {
      setIsLoading(true);

      try {
        const formacionGeneralResponse =
          await getFormacionGeneralUseCase().execute();

        console.log(formacionGeneralResponse);
        setFormacionGeneral(formacionGeneralResponse?.data.opciones || []);
      } catch (error) {
        console.error(error);
        throw new Error('Error al cargar formaciones generales');
      } finally {
        setIsLoading(false);
      }
    };

    loadFormacionGeneral();
  }, []);

  return { formacionGeneral, isLoading };
};
