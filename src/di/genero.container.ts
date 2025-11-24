import { GetGeneroUseCase } from '@/applications/genero';
import { generoApiRepository } from '@/infra';

// variables privadas de la feature
let _getGenero: GetGeneroUseCase | null = null;

export const getGeneroUseCase = (): GetGeneroUseCase => {
  if (!_getGenero) _getGenero = new GetGeneroUseCase(generoApiRepository);

  return _getGenero;
};

// función para resetear instancias
export const resetGeneroContainer = (): void => {
  _getGenero = null;
};
