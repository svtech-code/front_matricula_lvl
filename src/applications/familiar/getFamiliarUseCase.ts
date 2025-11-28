import type { FamiliarApiResponse } from '@/domains/familiar/familiar.entity';
import type { FamiliarRepository } from '@/domains/familiar/familiar.repository';

export class GetFamiliarUseCase {
  private repository: FamiliarRepository;

  constructor(repository: FamiliarRepository) {
    this.repository = repository;
  }

  async execute(run_familiar: number): Promise<FamiliarApiResponse> {
    return await this.repository.getFamiliar(run_familiar);
  }
}
