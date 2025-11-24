import { ApiEndPoint } from '@/domains/api/api.entity';
import type { FormacionGeneralApiResponse } from '@/domains/formacionGeneral/formacionGeneral.entity';
import { apiRequest } from './apiRequest';

class FormacionGeneralApiService {
  async getFormacionGeneral(): Promise<FormacionGeneralApiResponse> {
    const formacionGeneralResponse =
      await apiRequest.get<FormacionGeneralApiResponse>({
        route: ApiEndPoint.FORMACION_GENERAL,
      });

    return formacionGeneralResponse;
  }
}

export const formacionGeneralApiService = new FormacionGeneralApiService();
