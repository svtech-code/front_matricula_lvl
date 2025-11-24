import type {
  PreMatriculaApiResponse,
  PreMatriculaPayload,
} from '@/domains/preMatricula/preMatricula.entity';
import type { PreMatriculaRepository } from '@/domains/preMatricula/preMatricula.repository';
import { preMatriculaApiService } from '../http/preMatricula.api';

class PreMatriculaApiRepository implements PreMatriculaRepository {
  async verifyPreMatricula(
    params: PreMatriculaPayload,
  ): Promise<PreMatriculaApiResponse> {
    const response = await preMatriculaApiService.verifyPreMatricula(params);

    if (!response)
      throw new Error('Error al verificar la prematrícula del estudiante');

    return response;
  }
}

export const preMatriculaApiRepository = new PreMatriculaApiRepository();
