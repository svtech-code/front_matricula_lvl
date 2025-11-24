import type { GeneroApiResponse } from '@/domains/genero/genero.entity';
import type { GeneroRepository } from '@/domains/genero/genero.repository';

export class GetGeneroUseCase {
  private repository: GeneroRepository;

  constructor(repository: GeneroRepository) {
    this.repository = repository;
  }

  async execute(): Promise<GeneroApiResponse> {
    return await this.repository.getGenero();
  }
}
