import type {
  CreateFichaMatriculaPayload,
  CreateFichaMatriculaResponse,
} from '@/domains/fichaMatricula/fichaMatricula.entity';
import type { FichaMatriculaRepository } from '@/domains/fichaMatricula/fichaMatricula.repository';

export class CreateFichaMatriculaUseCase {
  private repository: FichaMatriculaRepository;

  constructor(repository: FichaMatriculaRepository) {
    this.repository = repository;
  }

  async execute(
    payload: CreateFichaMatriculaPayload,
  ): Promise<CreateFichaMatriculaResponse> {
    return await this.repository.createFichaMatricula(payload);
  }
}
