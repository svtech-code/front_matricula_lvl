export interface TipoFamiliarValor {
  cod_tipo_familiar: number;
  descripcion_familiar: string;
}

export interface TipoFamiliarResponse {
  tipos_familiares: TipoFamiliarValor[];
}

export interface TipoFamialiarApiResponse {
  success: boolean;
  message: string;
  data: TipoFamiliarResponse;
}
