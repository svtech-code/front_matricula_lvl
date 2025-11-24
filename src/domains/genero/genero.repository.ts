import type { GeneroApiResponse } from './genero.entity';

export interface GeneroRepository {
  getGenero(): Promise<GeneroApiResponse>;
}
