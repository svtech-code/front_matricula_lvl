import { useFichaMatriculaStore } from '../stores/fichaMatricula.store';

export const useFichaMatricula = () => {
  const formData = useFichaMatriculaStore((state) => state.formData);
  const currentStep = useFichaMatriculaStore((state) => state.currentStep);
  const maxStepReached = useFichaMatriculaStore(
    (state) => state.maxStepReached,
  );
  const generos = useFichaMatriculaStore((state) => state.generos);
  const tipoFamiliares = useFichaMatriculaStore(
    (state) => state.tipoFamiliares,
  );
  const formacionGeneral = useFichaMatriculaStore(
    (state) => state.formacionGeneral,
  );
  const estudianteValid = useFichaMatriculaStore(
    (state) => state.estudianteValid,
  );
  const antecedentesPersonalesValid = useFichaMatriculaStore(
    (state) => state.antecedentesPersonalesValid,
  );
  const antecedentesAcademicosValid = useFichaMatriculaStore(
    (state) => state.antecedentesAcademicosValid,
  );
  const antecedentesLocalidadValid = useFichaMatriculaStore(
    (state) => state.antecedentesLocalidadValid,
  );
  const antecedentesSocialesValid = useFichaMatriculaStore(
    (state) => state.antecedentesSocialesValid,
  );
  const antecedentesFamiliaresValid = useFichaMatriculaStore(
    (state) => state.antecedentesFamiliaresValid,
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
  const setEstudianteValid = useFichaMatriculaStore(
    (state) => state.setEstudianteValid,
  );
  const setAntecedentesPersonalesValid = useFichaMatriculaStore(
    (state) => state.setAntecedentesPersonalesValid,
  );
  const setAntecedentesAcademicosValid = useFichaMatriculaStore(
    (state) => state.setAntecedentesAcademicosValid,
  );
  const setAntecedentesLocalidadValid = useFichaMatriculaStore(
    (state) => state.setAntecedentesLocalidadValid,
  );
  const setAntecedentesSocialesValid = useFichaMatriculaStore(
    (state) => state.setAntecedentesSocialesValid,
  );
  const setAntecedentesFamiliaresValid = useFichaMatriculaStore(
    (state) => state.setAntecedentesFamiliaresValid,
  );

  return {
    formData,
    currentStep,
    maxStepReached,
    generos,
    tipoFamiliares,
    formacionGeneral,
    estudianteValid,
    antecedentesPersonalesValid,
    antecedentesAcademicosValid,
    antecedentesLocalidadValid,
    antecedentesSocialesValid,
    antecedentesFamiliaresValid,

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
    setEstudianteValid,
    setAntecedentesPersonalesValid,
    setAntecedentesAcademicosValid,
    setAntecedentesLocalidadValid,
    setAntecedentesSocialesValid,
    setAntecedentesFamiliaresValid,
  };
};
