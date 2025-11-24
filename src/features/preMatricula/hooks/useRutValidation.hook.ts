import { useState } from 'react';
import { calcularDV } from '@/infra';

export interface RutData {
  rut: number;
  dv: string;
}

export const useRutValidation = () => {
  const [rutData, setRutData] = useState<RutData>({ rut: 0, dv: '' });

  const handleRutChange = (value: string): void => {
    const numericValue = value.replace(/\D/g, '');
    const rutNumber = Number.parseInt(numericValue, 10) || 0;
    const dvCalculated = rutNumber > 0 ? calcularDV(rutNumber) : '';

    setRutData({ rut: rutNumber, dv: dvCalculated });
  };

  const isValidRut = (): boolean => {
    return rutData.rut > 0 && rutData.dv !== '';
  };

  const getFormattedRut = (): string => {
    return rutData.rut > 0 ? `${rutData.rut}-${rutData.dv}` : '';
  };

  return {
    rutData,
    handleRutChange,
    isValidRut,
    getFormattedRut,
  };
};
