import { GetFormacionGeneralUseCase } from '@/applications/formacionGeneral';
import { formacionGeneralApiRepository } from '@/infra';

// variables privadas de la feature
let _getFormacionGeneral: GetFormacionGeneralUseCase | null = null;

export const getFormacionGeneralUseCase = (): GetFormacionGeneralUseCase => {
  if (!_getFormacionGeneral)
    _getFormacionGeneral = new GetFormacionGeneralUseCase(
      formacionGeneralApiRepository,
    );

  return _getFormacionGeneral;
};

// función para resetear instancias
export const resetFormacionGeneralContainer = (): void => {
  _getFormacionGeneral = null;
};
