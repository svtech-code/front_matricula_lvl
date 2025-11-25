import { z } from 'zod';

export const estudianteSchema = z.object({
  run_estudiante: z.number().min(1, 'RUN es requerido'),
  dv_rut_estudiante: z.string().min(1, 'DV es requerido'),
  nombres: z.string().min(1, 'Nombres son requeridos'),
  nombre_social: z.string().optional(),
  apellido_paterno: z.string().min(1, 'Apellido paterno es requerido'),
  apellido_materno: z.string().optional(),
  fecha_nacimiento: z.string().min(1, 'Fecha de nacimiento es requerida'),
  nacionalidad: z.string().optional(),
  cod_genero: z.number().min(1, 'Género es requerido'),
  curso_inscrito: z.string().min(1, 'Curso es requerido'),
});

export const antecedentesPersonalesSchema = z.object({
  numero_telefonico: z.string().optional(),
  numero_telefonico_emergencia: z
    .string()
    .min(1, 'Teléfono de emergencia es requerido'),
  email: z
    .string()
    .refine((val) => !val || z.string().email().safeParse(val).success, {
      message: 'Email inválido',
    })
    .optional(),
  persona_convive: z.string().optional(),
  talentos_academicos: z.string().optional(),
  diciplina_practicada: z.string().optional(),
  pertenece_programa_sename: z.boolean(),
});

export const antecedentesAcademicosSchema = z.object({
  colegio_procedencia: z.string().min(1, 'Colegio de procedencia es requerido'),
  cursos_reprobados: z.string().min(1, 'Cursos reprobados es requerido'),
  curso_periodo_anterior: z
    .string()
    .min(1, 'Curso del período anterior es requerido'),
});

export const antecedentesLocalidadSchema = z.object({
  direccion: z.string().min(1, 'Dirección es requerida'),
  referencia_direccion: z.string().optional(),
  comuna: z.string().min(1, 'Comuna es requerida'),
  vive_sector_rural: z.boolean(),
  tiene_acceso_internet: z.boolean(),
});

export const antecedentesPieSchema = z.object({
  pertenecio_pie: z.boolean(),
  diagnostico_pie: z.string().optional(),
  curso_estuvo_pie: z.string().optional(),
  tiene_documentacion_pie: z.boolean(),
  colegio_estuvo_pie: z.string().optional(),
});

export const antecedentesSaludSchema = z.object({
  enfermedad_diagnosticada: z.string().optional(),
  documentacion_enfermedades: z.boolean(),
  medicamentos_indicados: z.string().optional(),
  medicamentos_contraindicados: z.string().optional(),
  grupo_sanguineo: z.string().optional(),
  atendido_psicologo: z.boolean(),
  atendido_psiquiatra: z.boolean(),
  atendido_psicopedagogo: z.boolean(),
  atendido_fonoaudiologo: z.boolean(),
  atendido_otro: z.boolean(),
  nombre_especialista: z.string().optional(),
  especialidad: z.string().optional(),
});

export const antecedentesSocialesSchema = z.object({
  numero_personas_casa: z.number().min(1, 'Número de personas es requerido'),
  numero_dormitorios: z.number().min(1, 'Número de dormitorios es requerido'),
  tiene_agua_potable: z.boolean(),
  tiene_luz_electrica: z.boolean(),
  porcentaje_social_hogares: z.number().min(0).max(100),
  tiene_alcantarillado: z.boolean(),
  prevision_salud: z.string().min(1, 'Previsión de salud es requerida'),
  subsidio_familiar: z.boolean(),
  seguro_complementario_salud: z.boolean(),
  institucion_atencion_seguro: z.string().optional(),
  consultorio_atencion_primaria: z.string().min(1, 'Consultorio es requerido'),
});

export const antecedentesJunaebSchema = z.object({
  beneficio_alimentacion: z.boolean(),
  pertenece_chile_solidario: z.boolean(),
  etnia_perteneciente: z.string().optional(),
  beca_indigena: z.boolean(),
  beca_presidente_republica: z.boolean(),
});

export const familiarSchema = z.object({
  run_familiar: z.number().min(1, 'RUN del familiar es requerido'),
  dv_run_familiar: z.string().min(1, 'DV es requerido'),
  nombres: z.string().min(1, 'Nombres son requeridos'),
  apellido_paterno: z.string().min(1, 'Apellido paterno es requerido'),
  apellido_materno: z.string().optional(),
  direccion: z.string().min(1, 'Dirección es requerida'),
  comuna: z.string().min(1, 'Comuna es requerida'),
  actividad_laboral: z.string().optional(),
  cod_escolaridad: z.number().min(1, 'Escolaridad es requerida'),
  lugar_trabajo: z.string().min(1, 'Lugar de trabajo es requerido'),
  email: z
    .string()
    .refine((val) => !val || z.string().email().safeParse(val).success, {
      message: 'Email inválido',
    }),
  numero_telefonico: z.string().min(1, 'Teléfono es requerido'),
  cod_tipo_familiar: z.number().min(1, 'Tipo de familiar es requerido'),
  es_titular: z.boolean(),
  es_suplente: z.boolean(),
});

export const fichaMatriculaSchema = z.object({
  periodo_lectivo: z.number(),
  grado_a_matricularse: z.number(),
  estudiante: estudianteSchema,
  antecedentes_personales: antecedentesPersonalesSchema,
  antecedentes_academicos: antecedentesAcademicosSchema,
  antecedentes_localidad: antecedentesLocalidadSchema,
  antecedentes_pie: antecedentesPieSchema,
  antecedentes_salud: antecedentesSaludSchema,
  antecedentes_sociales: antecedentesSocialesSchema,
  antecedentes_junaeb: antecedentesJunaebSchema,
  familiares: z
    .array(familiarSchema)
    .min(1, 'Al menos un familiar es requerido'),
  formacion_general_opciones: z.array(z.number()).optional(),
});

export type FichaMatriculaFormData = z.infer<typeof fichaMatriculaSchema>;
