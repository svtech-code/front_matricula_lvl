export interface EstudianteProps {
  run_estudiante: number;
  dv_rut_estudiante: string;
  nombres: string;
  nombre_social?: string;
  apellido_paterno: string;
  apellido_materno?: string;
  fecha_nacimiento: string;
  nacionalidad?: string;
  cod_genero: number;
  curso_inscrito?: string;
}

export interface AntecedentesPersonalesProps {
  numero_telefonico?: string;
  numero_telefonico_emergencia: string;
  email?: string;
  persona_convive?: string;
  talentos_academicos?: string;
  diciplina_practicada?: string;
  pertenece_programa_sename: boolean;
}

export interface AntecedentesAcademicosProps {
  colegio_procedencia: string;
  cursos_reprobados: string;
  curso_periodo_anterior: string;
}

export interface AntecedentesLocalidadProps {
  direccion: string;
  referencia_direccion?: string;
  comuna: string;
  vive_sector_rural: boolean;
  tiene_acceso_internet: boolean;
}

export interface AntecedentesPieProps {
  pertenecio_pie: boolean;
  diagnostico_pie?: string;
  curso_estuvo_pie?: string;
  tiene_documentacion_pie: boolean;
  colegio_estuvo_pie?: string;
}

export interface AntecedentesSaludProps {
  enfermedad_diagnosticada?: string;
  documentacion_enfermedades: boolean;
  medicamentos_indicados?: string;
  medicamentos_contraindicados?: string;
  grupo_sanguineo?: string;
  atendido_psicologo: boolean;
  atendido_psiquiatra: boolean;
  atendido_psicopedagogo: boolean;
  atendido_fonoaudiologo: boolean;
  atendido_otro: boolean;
  nombre_especialista?: string;
  especialidad?: string;
}

export interface AntecedentesSocialesProps {
  numero_personas_casa: number;
  numero_dormitorios: number;
  tiene_agua_potable: boolean;
  tiene_luz_electrica: boolean;
  porcentaje_social_hogares: number;
  tiene_alcantarillado: boolean;
  prevision_salud: string;
  subsidio_familiar: boolean;
  seguro_complementario_salud: boolean;
  institucion_atencion_seguro?: string;
  consultorio_atencion_primaria: string;
}

export interface AntecedentesJunaebProps {
  beneficio_alimentacion: boolean;
  pertenece_chile_solidario: boolean;
  etnia_perteneciente?: string;
  beca_indigena: boolean;
  beca_presidente_republica: boolean;
}

export interface FamiliarProps {
  run_familiar: number;
  dv_run_familiar: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno?: string;
  direccion: string;
  comuna: string;
  actividad_laboral?: string;
  cod_escolaridad: number;
  lugar_trabajo: string;
  email: string;
  numero_telefonico: string;
  cod_tipo_familiar: number;
  es_titular: boolean;
  es_suplente: boolean;
}

export interface FichaMatriculaProps {
  periodo_lectivo: number;
  grado_a_matricularse: number;
  estudiante: EstudianteProps;
  antecedentes_personales: AntecedentesPersonalesProps;
  antecedentes_academicos: AntecedentesAcademicosProps;
  antecedentes_localidad: AntecedentesLocalidadProps;
  antecedentes_pie: AntecedentesPieProps;
  antecedentes_salud: AntecedentesSaludProps;
  antecedentes_sociales: AntecedentesSocialesProps;
  antecedentes_junaeb: AntecedentesJunaebProps;
  familiares: FamiliarProps[];
  formacion_general_opciones: number[];
}
