import { Button, Input, Switch } from '@heroui/react';
import { useEffect, useMemo, useState } from 'react';
import type { AntecedentesLocalidadProps } from '@/domains/fichaMatricula/fichaMatricula.entity';
import { useFichaMatricula } from '@/shared/hooks/useFichaMatricula';

export const AntecedentesLocalidadForm = () => {
  const {
    formData,
    updateSection,
    clearSection,
    setAntecedentesLocalidadValid,
  } = useFichaMatricula();
  const data: Partial<AntecedentesLocalidadProps> =
    formData.antecedentes_localidad || {};

  const [touchedFields, setTouchedFields] = useState({
    direccion: false,
    comuna: false,
  });

  const isFormValid = useMemo(() => {
    const direccion = data.direccion?.trim() || '';
    const comuna = data.comuna?.trim() || '';
    return direccion.length > 0 && comuna.length > 0;
  }, [data.direccion, data.comuna]);

  useEffect(() => {
    setAntecedentesLocalidadValid(isFormValid);
  }, [isFormValid, setAntecedentesLocalidadValid]);

  const handleChange = (field: string, value: string | boolean) => {
    updateSection('antecedentes_localidad', { [field]: value });
  };

  const handleBlur = (field: 'direccion' | 'comuna') => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  const getErrorMessage = (field: 'direccion' | 'comuna') => {
    if (!touchedFields[field]) return '';
    const value = data[field]?.trim() || '';
    if (value.length === 0) {
      return field === 'direccion'
        ? 'La dirección es requerida'
        : 'La comuna es requerida';
    }
    return '';
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
        onBlur={() => handleBlur('direccion')}
        isRequired
        isInvalid={!!getErrorMessage('direccion')}
        errorMessage={getErrorMessage('direccion')}
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
          onBlur={() => handleBlur('comuna')}
          isRequired
          isInvalid={!!getErrorMessage('comuna')}
          errorMessage={getErrorMessage('comuna')}
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
