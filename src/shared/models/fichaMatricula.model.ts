import type { FichaMatriculaProps } from '@/domains/fichaMatricula/fichaMatricula.entity';
import type { FormacionGeneralValor } from '@/domains/formacionGeneral/formacionGeneral.entity';
import type { GeneroValor } from '@/domains/genero/genero.entity';
import type { TipoFamiliarValor } from '@/domains/tipoFamiliar/tipoFamiliar.entity';

export interface FichaMatriculaState {
  formData: Partial<FichaMatriculaProps>;
  currentStep: number;
  maxStepReached: number;
  generos: GeneroValor[];
  tipoFamiliares: TipoFamiliarValor[];
  formacionGeneral: FormacionGeneralValor[];
  rutEstudiante: number | null;
  estudianteValid: boolean;
  antecedentesPersonalesValid: boolean;
  antecedentesAcademicosValid: boolean;
  antecedentesLocalidadValid: boolean;
  antecedentesSocialesValid: boolean;
  antecedentesFamiliaresValid: boolean;
  setFormData: (data: Partial<FichaMatriculaProps>) => void;
  updateSection: <K extends keyof FichaMatriculaProps>(
    section: K,
    data: Partial<FichaMatriculaProps[K]>,
  ) => void;
  clearSection: <K extends keyof FichaMatriculaProps>(section: K) => void;
  setCurrentStep: (step: number) => void;
  resetForm: () => void;
  nextStep: () => void;
  previousStep: () => void;
  canGoNext: (totalSteps: number) => boolean;
  canGoPrevious: () => boolean;
  getProgress: (totalSteps: number) => number;
  setGeneros: (generos: GeneroValor[]) => void;
  setTipoFamiliares: (tipoFamiliares: TipoFamiliarValor[]) => void;
  setFormacionGeneral: (formacionGeneral: FormacionGeneralValor[]) => void;
  setRutEstudiante: (rut: number) => void;
  setEstudianteValid: (valid: boolean) => void;
  setAntecedentesPersonalesValid: (valid: boolean) => void;
  setAntecedentesAcademicosValid: (valid: boolean) => void;
  setAntecedentesLocalidadValid: (valid: boolean) => void;
  setAntecedentesSocialesValid: (valid: boolean) => void;
  setAntecedentesFamiliaresValid: (valid: boolean) => void;
}
