import type {
  CreateFichaMatriculaPayload,
  CreateFichaMatriculaResponse,
} from '@/domains/fichaMatricula/fichaMatricula.entity';
import type { FichaMatriculaRepository } from '@/domains/fichaMatricula/fichaMatricula.repository';
import { fichaMatriculaApiService } from '../http/fichaMatricula.api';

class FichaMatriculaApiRepository implements FichaMatriculaRepository {
  async createFichaMatricula(
    payload: CreateFichaMatriculaPayload,
  ): Promise<CreateFichaMatriculaResponse> {
    const response =
      await fichaMatriculaApiService.createFichaMatricula(payload);

    if (!response) throw new Error('Error al creal la ficha de matrícula');

    return response;
  }
}

export const fichaMatriculaApiRepository = new FichaMatriculaApiRepository();
