export const formatRutWithDash = (rut: string, dv: string): string => {
  if (!rut || !dv) return rut || '';
  return `${rut}-${dv}`;
};
