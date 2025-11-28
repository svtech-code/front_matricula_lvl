export enum ApiEndPoint {
  PRE_MATRICULA = 'pre-matricula',
  FICHA_MATRICULA = 'ficha-matricula',
  VERIFY_PRE_MATRICULA = 'ficha-matricula/verificar',
  GENERO = 'generos',
  TIPO_FAMILIAR = 'tipos-familiares',
  FORMACION_GENERAL = 'formacion-general-opciones',
  FAMILIAR = 'familiares',
}

export interface ApiRequestParams<T, K extends object | undefined = undefined> {
  route: ApiEndPoint;
  payload?: T;
  param?: string | number;
  params?: K;
}
