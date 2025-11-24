import { Button, Input, Switch } from '@heroui/react';
import type { AntecedentesPersonalesProps } from '@/domains/fichaMatricula/fichaMatricula.entity';
import { useFichaMatricula } from '@/shared/hooks/useFichaMatricula';

export const AntecedentesPersonalesForm = () => {
  const { formData, updateSection, clearSection } = useFichaMatricula();
  const data: Partial<AntecedentesPersonalesProps> =
    formData.antecedentes_personales || {};

  const handleChange = (field: string, value: string | boolean) => {
    updateSection('antecedentes_personales', { [field]: value });
  };

  const handlePhoneChange = (field: string, value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 8) {
      handleChange(field, numericValue);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">
          Datos Personales del Estudiante
        </h3>
        <Button
          color="warning"
          variant="flat"
          size="sm"
          onPress={() => clearSection('antecedentes_personales')}
        >
          Limpiar Sección
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-3">
            <Input label="Código" value="+569" isDisabled />
          </div>
          <div className="col-span-9">
            <Input
              label="Número Telefónico"
              type="text"
              value={data.numero_telefonico || ''}
              onChange={(e) =>
                handlePhoneChange('numero_telefonico', e.target.value)
              }
              maxLength={8}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-3">
            <Input label="Código" value="+569" isDisabled />
          </div>
          <div className="col-span-9">
            <Input
              label="Número Emergencia"
              type="text"
              value={data.numero_telefonico_emergencia || ''}
              onChange={(e) =>
                handlePhoneChange(
                  'numero_telefonico_emergencia',
                  e.target.value,
                )
              }
              maxLength={8}
              required
            />
          </div>
        </div>
        <Input
          label="Email"
          type="email"
          value={data.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
        />

        <Input
          label="Persona con quien vive"
          type="text"
          value={data.persona_convive || ''}
          onChange={(e) => handleChange('persona_convive', e.target.value)}
        />
        <Input
          label="Talentos Académicos"
          value={data.talentos_academicos || ''}
          onChange={(e) => handleChange('talentos_academicos', e.target.value)}
        />
        <Input
          label="Disciplina Practicada"
          type="text"
          value={data.diciplina_practicada || ''}
          onChange={(e) => handleChange('diciplina_practicada', e.target.value)}
        />
      </div>
      <Switch
        isSelected={data.pertenece_programa_sename || false}
        onValueChange={(value) =>
          handleChange('pertenece_programa_sename', value)
        }
      >
        Pertenece a programa SENAME
      </Switch>
    </div>
  );
};
