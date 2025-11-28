import { ApiEndPoint } from '@/domains/api/api.entity';
import type { FamiliarApiResponse } from '@/domains/familiar/familiar.entity';
import { apiRequest } from './apiRequest';

class FamiliarApiService {
  async getFamiliar(run_familiar: number): Promise<FamiliarApiResponse> {
    const familiarResponse = await apiRequest.get<FamiliarApiResponse>({
      route: ApiEndPoint.FAMILIAR,
      param: run_familiar,
    });

    return familiarResponse;
  }
}

export const familiarApiService = new FamiliarApiService();
