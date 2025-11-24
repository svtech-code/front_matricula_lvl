import type { TipoFamialiarApiResponse } from './tipoFamiliar.entity';

export interface TipoFamiliarRepository {
  getTipoFamiliar(): Promise<TipoFamialiarApiResponse>;
}
