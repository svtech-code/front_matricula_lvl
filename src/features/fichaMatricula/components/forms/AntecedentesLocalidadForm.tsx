import { Button, Input, Switch } from '@heroui/react';
import type { AntecedentesLocalidadProps } from '@/domains/fichaMatricula/fichaMatricula.entity';
import { useFichaMatricula } from '@/shared/hooks/useFichaMatricula';

export const AntecedentesLocalidadForm = () => {
  const { formData, updateSection, clearSection } = useFichaMatricula();
  const data: Partial<AntecedentesLocalidadProps> =
    formData.antecedentes_localidad || {};

  const handleChange = (field: string, value: string | boolean) => {
    updateSection('antecedentes_localidad', { [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Antecedentes de Localidad</h3>
        <Button
          color="warning"
          variant="flat"
          size="sm"
          onPress={() => clearSection('antecedentes_localidad')}
        >
          Limpiar Sección
        </Button>
      </div>
      <Input
        label="Dirección"
        value={data.direccion || ''}
        onChange={(e) => handleChange('direccion', e.target.value)}
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Input
            label="Referencia de Dirección"
            value={data.referencia_direccion || ''}
            onChange={(e) =>
              handleChange('referencia_direccion', e.target.value)
            }
          />
        </div>
        <Input
          label="Comuna"
          value={data.comuna || ''}
          onChange={(e) => handleChange('comuna', e.target.value)}
          required
        />
      </div>
      <div className="space-y-2 space-x-8">
        <Switch
          isSelected={data.vive_sector_rural || false}
          onValueChange={(value) => handleChange('vive_sector_rural', value)}
        >
          Vive en sector rural
        </Switch>
        <Switch
          isSelected={data.tiene_acceso_internet || false}
          onValueChange={(value) =>
            handleChange('tiene_acceso_internet', value)
          }
        >
          Tiene acceso a internet
        </Switch>
      </div>
    </div>
  );
};
