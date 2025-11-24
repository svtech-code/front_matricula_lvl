import type {
  PreMatriculaApiResponse,
  PreMatriculaPayload,
} from './preMatricula.entity';

export interface PreMatriculaRepository {
  verifyPreMatricula(
    params: PreMatriculaPayload,
  ): Promise<PreMatriculaApiResponse>;
}
