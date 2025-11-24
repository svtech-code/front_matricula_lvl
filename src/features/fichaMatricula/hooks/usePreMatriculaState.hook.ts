import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useFichaMatriculaStore } from '@/shared/stores/fichaMatricula.store';

export const usePreMatriculaState = () => {
  const location = useLocation();
  const { setRutEstudiante, rutEstudiante } = useFichaMatriculaStore();

  useEffect(() => {
    const state = location.state as { rut?: number } | null;
    if (state?.rut) {
      setRutEstudiante(state.rut);
    }
  }, [location.state, setRutEstudiante]);

  const hasValidAccess = () => {
    return rutEstudiante !== null;
  };

  return { hasValidAccess };
};
