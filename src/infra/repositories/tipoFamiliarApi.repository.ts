import type { TipoFamialiarApiResponse } from '@/domains/tipoFamiliar/tipoFamiliar.entity';
import type { TipoFamiliarRepository } from '@/domains/tipoFamiliar/tipoFamiliar.repository';
import { tipoFamiliarApiService } from '../http/tipoFamiliar.api';

class TipoFamiliarApiRepository implements TipoFamiliarRepository {
  async getTipoFamiliar(): Promise<TipoFamialiarApiResponse> {
    const response = await tipoFamiliarApiService.getTipoFamiliar();

    if (!response)
      throw new Error('Error al obtener lista de tipos de familiar');

    return response;
  }
}

export const tipoFamiliarApiRepository = new TipoFamiliarApiRepository();
