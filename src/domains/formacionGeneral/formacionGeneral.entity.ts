export interface FormacionGeneralValor {
  cod_fg_opciones: number;
  nombre_asignatura: string;
  categoria: string;
}

export interface FormacionGeneralResponse {
  opciones: FormacionGeneralValor[];
}

export interface FormacionGeneralApiResponse {
  success: boolean;
  message: string;
  data: FormacionGeneralResponse;
}
