import { VerifyPreMatriculaUseCase } from '@/applications/preMatricula/verifyPreMatriculaUseCase';
import { preMatriculaApiRepository } from '@/infra';

// variables privadas de la feature
let _verifyPreMatricula: VerifyPreMatriculaUseCase | null = null;

export const verifyPreMatriculaUseCase = (): VerifyPreMatriculaUseCase => {
  if (!_verifyPreMatricula)
    _verifyPreMatricula = new VerifyPreMatriculaUseCase(
      preMatriculaApiRepository,
    );

  return _verifyPreMatricula;
};

// función para resetear instancias
export const resetPreMatriculaContainer = (): void => {
  _verifyPreMatricula = null;
};
