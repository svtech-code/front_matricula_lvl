import { GetTipoFamiliarUseCase } from '@/applications/tipoFamiliar';
import { tipoFamiliarApiRepository } from '@/infra';

// variables privadas de la feature
let _getTipoFamiliar: GetTipoFamiliarUseCase | null = null;

export const getTipoFamiliarUseCase = (): GetTipoFamiliarUseCase => {
  if (!_getTipoFamiliar)
    _getTipoFamiliar = new GetTipoFamiliarUseCase(tipoFamiliarApiRepository);

  return _getTipoFamiliar;
};

// función para resetear instancias
export const resetTipoFamiliarContainer = (): void => {
  _getTipoFamiliar = null;
};
