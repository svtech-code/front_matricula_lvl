export interface GeneroValor {
  cod_genero: number;
  descripcion: string;
}

export interface GeneroResponse {
  generos: GeneroValor[];
}

export interface GeneroApiResponse {
  success: boolean;
  message: string;
  data: GeneroResponse;
}
