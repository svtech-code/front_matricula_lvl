import type { EscolaridadApiResponse } from './escolaridad.entity';

export interface EscolaridadRepository {
  getEscolaridad(): Promise<EscolaridadApiResponse>;
}
