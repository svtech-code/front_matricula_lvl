export const formatRutWithDash = (rut: string, dv: string): string => {
  if (!rut || !dv) return rut || '';
  return `${rut}-${dv}`;
};

// export const formatRut = (rut: number, dv: string): string => {
//   if (!rut || !dv) return '';
//   const rutString = rut.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
//   return `${rutString}-${dv}`;
// };
