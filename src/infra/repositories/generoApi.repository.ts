import type { GeneroApiResponse } from '@/domains/genero/genero.entity';
import type { GeneroRepository } from '@/domains/genero/genero.repository';
import { generoApiService } from '../http/genero.api';

class GeneroApiRepository implements GeneroRepository {
  async getGenero(): Promise<GeneroApiResponse> {
    const response = await generoApiService.getGenero();

    if (!response) throw new Error('Error al obtener lista de generos');

    return response;
  }
}

export const generoApiRepository = new GeneroApiRepository();
