import type { FormacionGeneralApiResponse } from './formacionGeneral.entity';

export interface FormacionGeneralRepository {
  getFormacionGeneral(): Promise<FormacionGeneralApiResponse>;
}
