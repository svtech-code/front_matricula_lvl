export interface PreMatriculaResponse {
  estado_ficha_matricula: number;
  fecha_prematricula: string;
}

export interface PreMatriculaApiResponse {
  success: boolean;
  existe_prematricula: string;
  data: PreMatriculaResponse;
}

export interface PreMatriculaPayload {
  rut: number;
  periodo_lectivo: number;
  estado: number;
}
