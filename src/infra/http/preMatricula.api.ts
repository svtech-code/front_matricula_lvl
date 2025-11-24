import { ApiEndPoint } from '@/domains/api/api.entity';
import type {
  PreMatriculaApiResponse,
  PreMatriculaPayload,
} from '@/domains/preMatricula/preMatricula.entity';
import { apiRequest } from './apiRequest';

class PreMatriculaApiService {
  async verifyPreMatricula(
    params: PreMatriculaPayload,
  ): Promise<PreMatriculaApiResponse> {
    const verifyPreMatriculaResponse = await apiRequest.get<
      PreMatriculaApiResponse,
      undefined,
      PreMatriculaPayload
    >({
      route: ApiEndPoint.VERIFY_PRE_MATRICULA,
      params: params,
    });

    return verifyPreMatriculaResponse;
  }
}

export const preMatriculaApiService = new PreMatriculaApiService();
