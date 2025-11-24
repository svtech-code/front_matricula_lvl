export const calcularDV = (rut: number): string => {
  if (!rut || rut === 0) return '';

  let suma = 0;
  let multiplicador = 2;
  const rutStr = rut.toString();

  for (let i = rutStr.length - 1; i >= 0; i--) {
    suma += Number.parseInt(rutStr[i], 10) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = suma % 11;
  const dv = 11 - resto;

  if (dv === 11) return '0';
  if (dv === 10) return 'K';
  return dv.toString();
};
