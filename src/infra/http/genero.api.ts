import { ApiEndPoint } from '@/domains/api/api.entity';
import type { GeneroApiResponse } from '@/domains/genero/genero.entity';
import { apiRequest } from './apiRequest';

class GeneroApiService {
  async getGenero(): Promise<GeneroApiResponse> {
    const generoResponse = await apiRequest.get<GeneroApiResponse>({
      route: ApiEndPoint.GENERO,
    });

    return generoResponse;
  }
}

export const generoApiService = new GeneroApiService();
