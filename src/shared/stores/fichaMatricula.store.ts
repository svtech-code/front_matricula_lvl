import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CURSO_MATRICULA } from '@/features/fichaMatricula/const/cursos.const'; // Added this import
import type { FichaMatriculaProps } from '@/domains/fichaMatricula/fichaMatricula.entity';
import type { FichaMatriculaState } from '../models/fichaMatricula.model';

const initialFormData: Partial<FichaMatriculaProps> = {
  periodo_lectivo: 2,
  grado_a_matricularse: 0,
  estudiante: {
    run_estudiante: 0,
    dv_rut_estudiante: '',
    nombres: '',
    apellido_paterno: '',
    fecha_nacimiento: '',
    cod_genero: undefined as any,
  },
  antecedentes_personales: {
    numero_telefonico_emergencia: '',
    pertenece_programa_sename: false,
  },
  antecedentes_academicos: {
    colegio_procedencia: '',
    cursos_reprobados: '',
    curso_periodo_anterior: '',
  },
  antecedentes_localidad: {
    direccion: '',
    comuna: '',
    vive_sector_rural: false,
    tiene_acceso_internet: false,
  },
  antecedentes_pie: {
    pertenecio_pie: false,
    tiene_documentacion_pie: false,
  },
  antecedentes_salud: {
    documentacion_enfermedades: false,
    atendido_psicologo: false,
    atendido_psiquiatra: false,
    atendido_psicopedagogo: false,
    atendido_fonoaudiologo: false,
    atendido_otro: false,
  },
  antecedentes_sociales: {
    numero_personas_casa: 0,
    numero_dormitorios: 0,
    tiene_agua_potable: false,
    tiene_luz_electrica: false,
    porcentaje_social_hogares: 0,
    tiene_alcantarillado: false,
    prevision_salud: '',
    subsidio_familiar: false,
    seguro_complementario_salud: false,
    consultorio_atencion_primaria: '',
  },
  antecedentes_junaeb: {
    beneficio_alimentacion: false,
    pertenece_chile_solidario: false,
    beca_indigena: false,
    beca_presidente_republica: false,
  },
  familiares: [],
  formacion_general_opciones: [],
  autorizacion_uso_fotos: undefined,
  confirmacion_datos_entregados: false,
  enterado_envio_reglamento: false,
};

export const useFichaMatriculaStore = create<FichaMatriculaState>()(
  persist(
    (set, get) => ({
      formData: initialFormData,
      currentStep: 0,
      maxStepReached: 0,
      generos: [],
      tipoFamiliares: [],
      formacionGeneral: [],
      rutEstudiante: null,
      estudianteValid: false,
      antecedentesPersonalesValid: false,
      antecedentesAcademicosValid: false,
      antecedentesLocalidadValid: false,
      antecedentesSocialesValid: false,
      antecedentesFamiliaresValid: false,
      informacionGeneralValid: false,
      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),

      updateSection: (section, data) =>
        set((state) => {
          const currentSection = state.formData[section];
          const newFormData = {
            ...state.formData,
            [section]: Array.isArray(currentSection)
              ? data
              : { ...(currentSection as object), ...data },
          };

          if (section === 'estudiante' && 'curso_inscrito' in data) {
            const cursoInscritoValue = (data as { curso_inscrito: string })
              .curso_inscrito;
            const curso = CURSO_MATRICULA.find(
              (c) => c.key === cursoInscritoValue,
            );
            if (curso) {
              newFormData.grado_a_matricularse = parseInt(curso.key, 10);
            }
          }

          return {
            formData: newFormData,
          };
        }),

      clearSection: (section) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [section]: initialFormData[section],
          },
        })),

      setCurrentStep: (step) => {
        const maxStepReached = get().maxStepReached;
        if (step <= maxStepReached) {
          set({ currentStep: step });
        }
      },

      resetForm: () =>
        set({
          formData: initialFormData,
          currentStep: 0,
          maxStepReached: 0,
          rutEstudiante: null,
          estudianteValid: false,
          antecedentesPersonalesValid: false,
          antecedentesAcademicosValid: false,
          antecedentesLocalidadValid: false,
          antecedentesSocialesValid: false,
          antecedentesFamiliaresValid: false,
          informacionGeneralValid: false,
        }),

      nextStep: () =>
        set((state) => {
          const newStep = state.currentStep + 1;
          return {
            currentStep: newStep,
            maxStepReached: Math.max(state.maxStepReached, newStep),
          };
        }),

      previousStep: () =>
        set((state) => ({ currentStep: state.currentStep - 1 })),

      canGoNext: (totalSteps) => {
        const currentStep = get().currentStep;
        const estudianteValid = get().estudianteValid;
        const antecedentesPersonalesValid = get().antecedentesPersonalesValid;
        const antecedentesAcademicosValid = get().antecedentesAcademicosValid;
        const antecedentesLocalidadValid = get().antecedentesLocalidadValid;
        const antecedentesSocialesValid = get().antecedentesSocialesValid;
        const antecedentesFamiliaresValid = get().antecedentesFamiliaresValid;
        const informacionGeneralValid = get().informacionGeneralValid;

        if (currentStep === 0 && !estudianteValid) {
          return false;
        }

        if (currentStep === 1 && !antecedentesPersonalesValid) {
          return false;
        }

        if (currentStep === 2 && !antecedentesAcademicosValid) {
          return false;
        }

        if (currentStep === 3 && !antecedentesLocalidadValid) {
          return false;
        }

        if (currentStep === 6 && !antecedentesSocialesValid) {
          return false;
        }

        if (currentStep === 8 && !antecedentesFamiliaresValid) {
          return false;
        }

        if (currentStep === totalSteps - 1 && !informacionGeneralValid) {
          return false;
        }

        return currentStep < totalSteps - 1;
      },

      canGoPrevious: () => get().currentStep > 0,
      getProgress: (totalSteps) => ((get().currentStep + 1) / totalSteps) * 100,
      setGeneros: (generos) => set({ generos }),
      setTipoFamiliares: (tipoFamiliares) => set({ tipoFamiliares }),
      setFormacionGeneral: (formacionGeneral) => set({ formacionGeneral }),
      setRutEstudiante: (rut) => set({ rutEstudiante: rut }),
      setEstudianteValid: (valid) => set({ estudianteValid: valid }),
      setAntecedentesPersonalesValid: (valid) =>
        set({ antecedentesPersonalesValid: valid }),
      setAntecedentesAcademicosValid: (valid) =>
        set({ antecedentesAcademicosValid: valid }),
      setAntecedentesLocalidadValid: (valid) =>
        set({ antecedentesLocalidadValid: valid }),
      setAntecedentesSocialesValid: (valid) =>
        set({ antecedentesSocialesValid: valid }),
      setAntecedentesFamiliaresValid: (valid) =>
        set({ antecedentesFamiliaresValid: valid }),
      setInformacionGeneralValid: (valid) =>
        set({ informacionGeneralValid: valid }),
    }),
    {
      name: 'fichaMatricula-storage',
      partialize: (state) => ({
        formData: state.formData,
        currentStep: state.currentStep,
        maxStepReached: state.maxStepReached,
        rutEstudiante: state.rutEstudiante,
      }),
    },
  ),
);
