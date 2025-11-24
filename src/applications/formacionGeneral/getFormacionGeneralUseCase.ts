import type { FormacionGeneralApiResponse } from '@/domains/formacionGeneral/formacionGeneral.entity';
import type { FormacionGeneralRepository } from '@/domains/formacionGeneral/formacionGeneral.repository';

export class GetFormacionGeneralUseCase {
  private repository: FormacionGeneralRepository;

  constructor(repository: FormacionGeneralRepository) {
    this.repository = repository;
  }

  async execute(): Promise<FormacionGeneralApiResponse> {
    return await this.repository.getFormacionGeneral();
  }
}
