import { ApiEndPoint } from '@/domains/api/api.entity';
import type {
  CreateFichaMatriculaPayload,
  CreateFichaMatriculaResponse,
} from '@/domains/fichaMatricula/fichaMatricula.entity';
import { apiRequest } from './apiRequest';

class FihaMatriculaApiService {
  async createFichaMatricula(
    payload: CreateFichaMatriculaPayload,
  ): Promise<CreateFichaMatriculaResponse> {
    const createFichaMatriculaResponse = await apiRequest.post<
      CreateFichaMatriculaResponse,
      CreateFichaMatriculaPayload
    >({
      route: ApiEndPoint.FICHA_MATRICULA,
      payload: payload,
    });

    return createFichaMatriculaResponse;
  }
}

export const fichaMatriculaApiService = new FihaMatriculaApiService();
