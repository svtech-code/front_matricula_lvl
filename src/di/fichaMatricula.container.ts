import { CreateFichaMatriculaUseCase } from '@/applications/fichaMatricula';
import { fichaMatriculaApiRepository } from '@/infra/repositories/fichaMatriculaApi.repository';

// variables privadas de la feature
let _createFichaMatricula: CreateFichaMatriculaUseCase | null = null;

export const createFichaMatriculaUseCase = (): CreateFichaMatriculaUseCase => {
  if (!_createFichaMatricula)
    _createFichaMatricula = new CreateFichaMatriculaUseCase(
      fichaMatriculaApiRepository,
    );

  return _createFichaMatricula;
};

// función para resetear instancias
export const resetFichaMatriculaContainer = (): void => {
  _createFichaMatricula = null;
};
