export interface FamiliarValor {
  cod_familiar: number;
  run_familiar: number;
  dv_run_familiar: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string | null;
  direccion: string;
  comuna: string;
  actividad_laboral: string | null;
  cod_escolaridad: number;
  lugar_trabajo: string;
  email: string;
  numero_telefonico: string;
  cod_tipo_familiar: number;
  es_titular: boolean;
  es_suplente: boolean;
}

export interface FamiliarApiResponse {
  success: boolean;
  message: string;
  data: FamiliarValor;
}
