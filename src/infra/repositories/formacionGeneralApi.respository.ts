import type { FormacionGeneralApiResponse } from '@/domains/formacionGeneral/formacionGeneral.entity';
import type { FormacionGeneralRepository } from '@/domains/formacionGeneral/formacionGeneral.repository';
import { formacionGeneralApiService } from '../http/formacionGeneral.api';

class FormacionGeneralApiRepository implements FormacionGeneralRepository {
  async getFormacionGeneral(): Promise<FormacionGeneralApiResponse> {
    const response = await formacionGeneralApiService.getFormacionGeneral();

    if (!response)
      throw new Error('Error al obtener lista de formaciones generales');

    return response;
  }
}

export const formacionGeneralApiRepository =
  new FormacionGeneralApiRepository();
