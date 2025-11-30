import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useFichaMatricula } from '@/shared/hooks/useFichaMatricula';

export const usePreMatriculaState = () => {
  const location = useLocation();
  const { rutEstudiante, setRutEstudiante } = useFichaMatricula();

  useEffect(() => {
    const state = location.state as { rut?: number } | null;

    if (state?.rut) {
      setRutEstudiante(state.rut);
    } else {
      setRutEstudiante(null);
    }
  }, [location.state, setRutEstudiante]);

  const hasValidAccess = rutEstudiante !== null;

  return { hasValidAccess, rutRoute: location.state?.rut, setRutEstudiante };
};
