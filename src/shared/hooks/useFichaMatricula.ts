import { useFichaMatriculaStore } from '../stores/fichaMatricula.store';

export const useFichaMatricula = () => {
  const formData = useFichaMatriculaStore((state) => state.formData);
  const currentStep = useFichaMatriculaStore((state) => state.currentStep);
  const generos = useFichaMatriculaStore((state) => state.generos);
  const tipoFamiliares = useFichaMatriculaStore(
    (state) => state.tipoFamiliares,
  );
  const formacionGeneral = useFichaMatriculaStore(
    (state) => state.formacionGeneral,
  );

  const setFormData = useFichaMatriculaStore((state) => state.setFormData);
  const updateSection = useFichaMatriculaStore((state) => state.updateSection);
  const clearSection = useFichaMatriculaStore((state) => state.clearSection);
  const setCurrentStep = useFichaMatriculaStore(
    (state) => state.setCurrentStep,
  );
  const resetForm = useFichaMatriculaStore((state) => state.resetForm);
  const nextStep = useFichaMatriculaStore((state) => state.nextStep);
  const previousStep = useFichaMatriculaStore((state) => state.previousStep);
  const canGoNext = useFichaMatriculaStore((state) => state.canGoNext);
  const canGoPrevious = useFichaMatriculaStore((state) => state.canGoPrevious);
  const getProgress = useFichaMatriculaStore((state) => state.getProgress);
  const setGeneros = useFichaMatriculaStore((state) => state.setGeneros);
  const setTipoFamiliares = useFichaMatriculaStore(
    (state) => state.setTipoFamiliares,
  );
  const setFormacionGeneral = useFichaMatriculaStore(
    (state) => state.setFormacionGeneral,
  );

  return {
    formData,
    currentStep,
    generos,
    tipoFamiliares,
    formacionGeneral,

    setFormData,
    updateSection,
    clearSection,
    setCurrentStep,
    resetForm,
    nextStep,
    previousStep,
    canGoNext,
    canGoPrevious,
    getProgress,
    setGeneros,
    setTipoFamiliares,
    setFormacionGeneral,
  };
};
