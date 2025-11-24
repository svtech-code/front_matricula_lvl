import { ApiEndPoint } from '@/domains/api/api.entity';
import type { TipoFamialiarApiResponse } from '@/domains/tipoFamiliar/tipoFamiliar.entity';
import { apiRequest } from './apiRequest';

class TipoFamiliarApiService {
  async getTipoFamiliar(): Promise<TipoFamialiarApiResponse> {
    const tipoFamiliarResponse = await apiRequest.get<TipoFamialiarApiResponse>(
      {
        route: ApiEndPoint.TIPO_FAMILIAR,
      },
    );

    return tipoFamiliarResponse;
  }
}

export const tipoFamiliarApiService = new TipoFamiliarApiService();
