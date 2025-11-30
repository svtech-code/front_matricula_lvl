export interface PreMatriculaResponse {
  estado_ficha_matricula: number;
  fecha_prematricula: string;
  grado_a_matricularse: number;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
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
