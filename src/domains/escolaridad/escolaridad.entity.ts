export interface EscolatidadValor {
  cod_escolaridad: number;
  descripcion: string;
}

export interface EscolaridadResponse {
  escolaridades: EscolatidadValor[];
}

export interface EscolaridadApiResponse {
  success: boolean;
  message: string;
  data: EscolaridadResponse;
}
