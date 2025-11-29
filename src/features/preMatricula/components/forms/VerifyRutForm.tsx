import { Button, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { calcularDV } from '@/infra/services/calculateDV.service';
import {
  type VerifyRutFormData,
  type VerifyRutFormProps,
  verifyRutSchema,
} from '../../models/verifyRut.model';
import { formatRutWithDash } from '../../utils/formatRut.util';
import RutVisualization from '../ui/RutVisualization';

export const VerifyRutForm = ({
  onSubmit,
  isLoading = false,
}: VerifyRutFormProps) => {
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<VerifyRutFormData>({
    resolver: zodResolver(verifyRutSchema),
    mode: 'onChange',
  });

  const rutValue = watch('rut');
  const rutNumber = rutValue ? Number.parseInt(rutValue, 10) : 0;
  const dv = rutNumber > 0 ? calcularDV(rutNumber) : '';
  const formattedRut = formatRutWithDash(rutValue || '', dv);
  const isExtranjero = rutNumber >= 100000000;

  const handleRutChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    setValue('rut', numericValue, { shouldValidate: true });
  };

  const handleFormSubmit = (data: VerifyRutFormData) => {
    const rutNumber = Number.parseInt(data.rut, 10);
    onSubmit(rutNumber);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-4 max-w-md flex justify-center items-center flex-col"
    >
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-9">
          <Input
            label="RUT del Estudiante"
            type="text"
            placeholder="Ej: 12345678"
            size="md"
            variant="bordered"
            value={rutValue || ''}
            isInvalid={!!errors.rut}
            errorMessage={errors.rut?.message}
            onChange={(e) => handleRutChange(e.target.value)}
            classNames={{
              input: 'text-base',
              label: 'text-sm',
            }}
          />
        </div>

        <div className="col-span-3">
          <Input
            label="DV"
            maxLength={1}
            value={dv}
            isDisabled
            size="md"
            variant="bordered"
            classNames={{
              input: 'text-base text-center',
              label: 'text-sm',
            }}
          />
        </div>
      </div>

      {rutValue && rutValue.length >= 8 && rutValue.length <= 9 && (
        <RutVisualization
          formattedRut={formattedRut}
          isExtranjero={isExtranjero}
        />
      )}

      <Button
        type="submit"
        color="primary"
        size="lg"
        className="font-medium"
        isDisabled={!isValid || isLoading}
        isLoading={isLoading}
      >
        Verificar y Continuar
      </Button>
    </form>
  );
};
