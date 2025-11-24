import { Input } from '@heroui/react';

interface RutInputProps {
  rut: number;
  dv: string;
  onRutChange: (value: string) => void;
}

export const RutInput = ({ rut, dv, onRutChange }: RutInputProps) => {
  return (
    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-9">
        <Input
          label="RUT del Estudiante"
          type="text"
          placeholder="Ej: 12345678"
          value={rut ? rut.toString() : ''}
          onChange={(e) => onRutChange(e.target.value)}
          size="md"
          variant="bordered"
          required
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
          required
          classNames={{
            input: 'text-base text-center',
            label: 'text-sm',
          }}
        />
      </div>
    </div>
  );
};
