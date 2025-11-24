import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FichaMatriculaProps } from '@/domains/fichaMatricula/fichaMatricula.entity';
import type { FichaMatriculaState } from '../models/fichaMatricula.model';

const initialFormData: Partial<FichaMatriculaProps> = {
  periodo_lectivo: new Date().getFullYear(),
  grado_a_matricularse: 1,
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
};

export const useFichaMatriculaStore = create<FichaMatriculaState>()(
  persist(
    (set, get) => ({
      formData: initialFormData,
      currentStep: 0,
      generos: [],
      tipoFamiliares: [],
      formacionGeneral: [],
      rutEstudiante: null,
      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      updateSection: (section, data) =>
        set((state) => {
          const currentSection = state.formData[section];
          return {
            formData: {
              ...state.formData,
              [section]: Array.isArray(currentSection)
                ? data
                : { ...(currentSection as object), ...data },
            },
          };
        }),
      clearSection: (section) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [section]: initialFormData[section],
          },
        })),
      setCurrentStep: (step) => set({ currentStep: step }),
      resetForm: () =>
        set({ formData: initialFormData, currentStep: 0, rutEstudiante: null }),
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      previousStep: () =>
        set((state) => ({ currentStep: state.currentStep - 1 })),
      canGoNext: (totalSteps) => get().currentStep < totalSteps - 1,
      canGoPrevious: () => get().currentStep > 0,
      getProgress: (totalSteps) => ((get().currentStep + 1) / totalSteps) * 100,
      setGeneros: (generos) => set({ generos }),
      setTipoFamiliares: (tipoFamiliares) => set({ tipoFamiliares }),
      setFormacionGeneral: (formacionGeneral) => set({ formacionGeneral }),
      setRutEstudiante: (rut) => set({ rutEstudiante: rut }),
    }),
    {
      name: 'fichaMatricula-storage',
      partialize: (state) => ({
        formData: state.formData,
        currentStep: state.currentStep,
        rutEstudiante: state.rutEstudiante,
      }),
    },
  ),
);
