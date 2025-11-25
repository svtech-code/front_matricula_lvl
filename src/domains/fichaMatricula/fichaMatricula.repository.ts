import type {
  CreateFichaMatriculaPayload,
  CreateFichaMatriculaResponse,
} from './fichaMatricula.entity';

export interface FichaMatriculaRepository {
  createFichaMatricula(
    payload: CreateFichaMatriculaPayload,
  ): Promise<CreateFichaMatriculaResponse>;
}
