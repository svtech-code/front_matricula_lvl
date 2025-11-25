import { Button, Chip, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { calcularDV } from '@/infra/services/calculateDV.service';

const verifyRutSchema = z.object({
  rut: z
    .string()
    .min(7, 'El RUT debe tener al menos 7 dígitos')
    .max(9, 'El RUT debe tener máximo 9 dígitos')
    .regex(/^\d+$/, 'El RUT solo debe contener números'),
});

type VerifyRutFormData = z.infer<typeof verifyRutSchema>;

interface VerifyRutFormProps {
  onSubmit: (rut: number, dv: string) => void;
  isLoading?: boolean;
}

const formatRutWithDash = (rut: string, dv: string): string => {
  if (!rut || !dv) return rut || '';
  return `${rut}-${dv}`;
};

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
    const calculatedDv = calcularDV(rutNumber);
    onSubmit(rutNumber, calculatedDv);
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

      {rutValue && rutValue.length >= 7 && (
        <div className="flex items-center justify-between gap-2 px-1 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <title>Check</title>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>

            <span className="text-sm text-gray-600">
              RUT completo:{' '}
              <span className="font-semibold text-gray-800">
                {formattedRut}
              </span>
            </span>
          </div>
          {isExtranjero && (
            <Chip size="sm" color="primary" variant="flat">
              RUT Extranjero
            </Chip>
          )}
        </div>
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
