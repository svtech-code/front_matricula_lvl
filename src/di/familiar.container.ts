import { GetFamiliarUseCase } from '@/applications/familiar';
import { familiarApiRepository } from '@/infra';

let _getFamiliar: GetFamiliarUseCase | null = null;

export const getFamiliarUseCase = (): GetFamiliarUseCase => {
  if (!_getFamiliar)
    _getFamiliar = new GetFamiliarUseCase(familiarApiRepository);

  return _getFamiliar;
};

export const resetFamiliarContainer = (): void => {
  _getFamiliar = null;
};
