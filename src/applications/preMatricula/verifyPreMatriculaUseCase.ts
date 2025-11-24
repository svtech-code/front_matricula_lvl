import type {
  PreMatriculaApiResponse,
  PreMatriculaPayload,
} from '@/domains/preMatricula/preMatricula.entity';
import type { PreMatriculaRepository } from '@/domains/preMatricula/preMatricula.repository';

export class VerifyPreMatriculaUseCase {
  private repository: PreMatriculaRepository;

  constructor(repository: PreMatriculaRepository) {
    this.repository = repository;
  }

  async execute(params: PreMatriculaPayload): Promise<PreMatriculaApiResponse> {
    return await this.repository.verifyPreMatricula(params);
  }
}
