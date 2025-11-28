import type { FamiliarApiResponse } from '@/domains/familiar/familiar.entity';
import type { FamiliarRepository } from '@/domains/familiar/familiar.repository';
import { familiarApiService } from '../http/familiar.api';

class FamiliarApiRepository implements FamiliarRepository {
  async getFamiliar(run_familiar: number): Promise<FamiliarApiResponse> {
    const response = await familiarApiService.getFamiliar(run_familiar);

    if (!response) throw new Error('Error al obtener los datos del familiar');

    return response;
  }
}

export const familiarApiRepository = new FamiliarApiRepository();
