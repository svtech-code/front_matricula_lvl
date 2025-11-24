import type { FichaMatriculaProps } from '@/domains/fichaMatricula/fichaMatricula.entity';
import type { FormacionGeneralValor } from '@/domains/formacionGeneral/formacionGeneral.entity';
import type { GeneroValor } from '@/domains/genero/genero.entity';
import type { TipoFamiliarValor } from '@/domains/tipoFamiliar/tipoFamiliar.entity';

export interface FichaMatriculaState {
  formData: Partial<FichaMatriculaProps>;
  currentStep: number;
  generos: GeneroValor[];
  tipoFamiliares: TipoFamiliarValor[];
  formacionGeneral: FormacionGeneralValor[];
  rutEstudiante: number | null;
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
}
