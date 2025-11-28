import { Button, Input, Switch } from '@heroui/react';
import { useEffect, useMemo, useState } from 'react';
import type { AntecedentesPersonalesProps } from '@/domains/fichaMatricula/fichaMatricula.entity';
import { useFichaMatricula } from '@/shared/hooks/useFichaMatricula';

export const AntecedentesPersonalesForm = () => {
  const {
    formData,
    updateSection,
    clearSection,
    setAntecedentesPersonalesValid,
  } = useFichaMatricula();
  const data: Partial<AntecedentesPersonalesProps> =
    formData.antecedentes_personales || {};

  const [touchedFields, setTouchedFields] = useState({
    numero_telefonico: false,
    numero_telefonico_emergencia: false,
    persona_convive: false,
  });

  const isFormValid = useMemo(() => {
    const numeroTelefonico = data.numero_telefonico?.trim() || '';
    const numeroEmergencia = data.numero_telefonico_emergencia?.trim() || '';
    const personaConvive = data.persona_convive?.trim() || '';

    return (
      numeroTelefonico.length === 8 &&
      numeroEmergencia.length === 8 &&
      personaConvive.length > 0
    );
  }, [
    data.numero_telefonico,
    data.numero_telefonico_emergencia,
    data.persona_convive,
  ]);

  useEffect(() => {
    setAntecedentesPersonalesValid(isFormValid);
  }, [isFormValid, setAntecedentesPersonalesValid]);

  const handleChange = (field: string, value: string | boolean) => {
    updateSection('antecedentes_personales', { [field]: value });
  };

  const handlePhoneChange = (field: string, value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 8) {
      handleChange(field, numericValue);
    }
  };

  const handleBlur = (field: keyof typeof touchedFields) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  const getErrorMessage = (field: keyof typeof touchedFields) => {
    if (!touchedFields[field]) return '';

    if (
      field === 'numero_telefonico' ||
      field === 'numero_telefonico_emergencia'
    ) {
      const value = data[field]?.trim() || '';
      if (value.length === 0) return 'Este campo es obligatorio';
      if (value.length < 8) return 'Debe tener 8 dígitos';
    }

    if (field === 'persona_convive') {
      const value = data.persona_convive?.trim() || '';
      if (value.length === 0) return 'Este campo es obligatorio';
    }

    return '';
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
              onBlur={() => handleBlur('numero_telefonico')}
              maxLength={8}
              isRequired
              isInvalid={!!getErrorMessage('numero_telefonico')}
              errorMessage={getErrorMessage('numero_telefonico')}
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
              onBlur={() => handleBlur('numero_telefonico_emergencia')}
              maxLength={8}
              isRequired
              isInvalid={!!getErrorMessage('numero_telefonico_emergencia')}
              errorMessage={getErrorMessage('numero_telefonico_emergencia')}
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
          label="Personas con quien vive"
          type="text"
          value={data.persona_convive || ''}
          onChange={(e) => handleChange('persona_convive', e.target.value)}
          onBlur={() => handleBlur('persona_convive')}
          isRequired
          isInvalid={!!getErrorMessage('persona_convive')}
          errorMessage={getErrorMessage('persona_convive')}
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
        ¿Pertenece o perteneció a programas de red <strong>SENAME</strong>?{' '}
        <span className="text-xs text-gray-600">
          (IPD, PPF, HOGAR DE MENORES, ETC.)
        </span>
      </Switch>
    </div>
  );
};
