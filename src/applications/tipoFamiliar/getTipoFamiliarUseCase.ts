import type { TipoFamialiarApiResponse } from '@/domains/tipoFamiliar/tipoFamiliar.entity';
import type { TipoFamiliarRepository } from '@/domains/tipoFamiliar/tipoFamiliar.repository';

export class GetTipoFamiliarUseCase {
  private repository: TipoFamiliarRepository;

  constructor(repository: TipoFamiliarRepository) {
    this.repository = repository;
  }

  async execute(): Promise<TipoFamialiarApiResponse> {
    return await this.repository.getTipoFamiliar();
  }
}
