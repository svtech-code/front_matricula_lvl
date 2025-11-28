import { Button, Input, Select, SelectItem, Switch } from '@heroui/react';
import { useEffect, useMemo, useState } from 'react';
import type { AntecedentesSocialesProps } from '@/domains/fichaMatricula/fichaMatricula.entity';
import { useFichaMatricula } from '@/shared/hooks/useFichaMatricula';

const PORCENTAJES = [
  { key: 10, label: '10 %' },
  { key: 20, label: '20 %' },
  { key: 30, label: '30 %' },
  { key: 40, label: '40 %' },
  { key: 50, label: '50 %' },
  { key: 60, label: '60 %' },
  { key: 70, label: '70 %' },
  { key: 80, label: '80 %' },
  { key: 90, label: '90 %' },
  { key: 100, label: '100 %' },
];

export const AntecedentesSocialesForm = () => {
  const {
    formData,
    updateSection,
    clearSection,
    setAntecedentesSocialesValid,
  } = useFichaMatricula();
  const data: Partial<AntecedentesSocialesProps> =
    formData.antecedentes_sociales || {};

  const [touchedFields, setTouchedFields] = useState({
    numero_personas_casa: false,
    numero_dormitorios: false,
    porcentaje_social_hogares: false,
    prevision_salud: false,
    consultorio_atencion_primaria: false,
  });

  const isFormValid = useMemo(() => {
    const numeroPersonasCasa = data.numero_personas_casa || 0;
    const numeroDormitorios = data.numero_dormitorios || 0;
    const porcentajeSocialHogares = data.porcentaje_social_hogares || 0;
    const previsionSalud = data.prevision_salud?.trim() || '';
    const consultorioAtencionPrimaria =
      data.consultorio_atencion_primaria?.trim() || '';

    return (
      numeroPersonasCasa > 0 &&
      numeroDormitorios > 0 &&
      porcentajeSocialHogares > 0 &&
      previsionSalud.length > 0 &&
      consultorioAtencionPrimaria.length > 0
    );
  }, [
    data.numero_personas_casa,
    data.numero_dormitorios,
    data.porcentaje_social_hogares,
    data.prevision_salud,
    data.consultorio_atencion_primaria,
  ]);

  useEffect(() => {
    setAntecedentesSocialesValid(isFormValid);
  }, [isFormValid, setAntecedentesSocialesValid]);

  const handleChange = (field: string, value: string | boolean | number) => {
    updateSection('antecedentes_sociales', { [field]: value });
  };

  const handleNumericChange = (field: string, value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const number = Number.parseInt(numericValue, 10) || 0;
    handleChange(field, number);
  };

  const handleBlur = (field: keyof typeof touchedFields) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  const getErrorMessage = (field: keyof typeof touchedFields) => {
    if (!touchedFields[field]) return '';

    if (field === 'numero_personas_casa') {
      const value = data.numero_personas_casa || 0;
      if (value === 0) return 'El número de personas en casa es requerido';
    }

    if (field === 'numero_dormitorios') {
      const value = data.numero_dormitorios || 0;
      if (value === 0) return 'El número de dormitorios es requerido';
    }

    if (field === 'porcentaje_social_hogares') {
      const value = data.porcentaje_social_hogares || 0;
      if (value === 0) return 'El porcentaje social de hogares es requerido';
    }

    if (field === 'prevision_salud') {
      const value = data.prevision_salud?.trim() || '';
      if (value.length === 0) return 'La previsión de salud es requerida';
    }

    if (field === 'consultorio_atencion_primaria') {
      const value = data.consultorio_atencion_primaria?.trim() || '';
      if (value.length === 0)
        return 'El consultorio de atención primaria es requerido';
    }

    return '';
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Antecedentes Sociales</h3>
        <Button
          color="warning"
          variant="flat"
          size="sm"
          onPress={() => clearSection('antecedentes_sociales')}
        >
          Limpiar Sección
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Número de Personas en Casa"
          type="text"
          value={
            data.numero_personas_casa
              ? data.numero_personas_casa.toString()
              : ''
          }
          onChange={(e) =>
            handleNumericChange('numero_personas_casa', e.target.value)
          }
          onBlur={() => handleBlur('numero_personas_casa')}
          isRequired
          isInvalid={!!getErrorMessage('numero_personas_casa')}
          errorMessage={getErrorMessage('numero_personas_casa')}
        />
        <Input
          label="Número de Dormitorios"
          type="text"
          value={
            data.numero_dormitorios ? data.numero_dormitorios.toString() : ''
          }
          onChange={(e) =>
            handleNumericChange('numero_dormitorios', e.target.value)
          }
          onBlur={() => handleBlur('numero_dormitorios')}
          isRequired
          isInvalid={!!getErrorMessage('numero_dormitorios')}
          errorMessage={getErrorMessage('numero_dormitorios')}
        />
        <Select
          label="Porcentaje Social de Hogares"
          selectedKeys={
            data.porcentaje_social_hogares
              ? [data.porcentaje_social_hogares.toString()]
              : []
          }
          onSelectionChange={(keys) => {
            const selectedKey = Array.from(keys)[0];
            if (selectedKey) {
              handleChange('porcentaje_social_hogares', Number(selectedKey));
            }
          }}
          onClose={() => handleBlur('porcentaje_social_hogares')}
          isRequired
          isInvalid={!!getErrorMessage('porcentaje_social_hogares')}
          errorMessage={getErrorMessage('porcentaje_social_hogares')}
        >
          {PORCENTAJES.map((porcentaje) => (
            <SelectItem key={porcentaje.key}>{porcentaje.label}</SelectItem>
          ))}
        </Select>
        <Input
          label="Previsión de Salud"
          value={data.prevision_salud || ''}
          onChange={(e) => handleChange('prevision_salud', e.target.value)}
          onBlur={() => handleBlur('prevision_salud')}
          isRequired
          isInvalid={!!getErrorMessage('prevision_salud')}
          errorMessage={getErrorMessage('prevision_salud')}
        />
      </div>
      <Input
        label="Consultorio de Atención Primaria"
        value={data.consultorio_atencion_primaria || ''}
        onChange={(e) =>
          handleChange('consultorio_atencion_primaria', e.target.value)
        }
        onBlur={() => handleBlur('consultorio_atencion_primaria')}
        isRequired
        isInvalid={!!getErrorMessage('consultorio_atencion_primaria')}
        errorMessage={getErrorMessage('consultorio_atencion_primaria')}
      />
      <div className="space-y-2 space-x-8">
        <Switch
          isSelected={data.tiene_agua_potable || false}
          onValueChange={(value) => handleChange('tiene_agua_potable', value)}
        >
          Tiene agua potable
        </Switch>
        <Switch
          isSelected={data.tiene_luz_electrica || false}
          onValueChange={(value) => handleChange('tiene_luz_electrica', value)}
        >
          Tiene luz eléctrica
        </Switch>
        <Switch
          isSelected={data.tiene_alcantarillado || false}
          onValueChange={(value) => handleChange('tiene_alcantarillado', value)}
        >
          Tiene alcantarillado
        </Switch>
        <Switch
          isSelected={data.subsidio_familiar || false}
          onValueChange={(value) => handleChange('subsidio_familiar', value)}
        >
          Subsidio familiar
        </Switch>
        <Switch
          isSelected={data.seguro_complementario_salud || false}
          onValueChange={(value) =>
            handleChange('seguro_complementario_salud', value)
          }
        >
          Seguro complementario de salud
        </Switch>
      </div>
      {data.seguro_complementario_salud && (
        <Input
          label="Institución de Atención del seguro complementario"
          value={data.institucion_atencion_seguro || ''}
          onChange={(e) =>
            handleChange('institucion_atencion_seguro', e.target.value)
          }
        />
      )}
    </div>
  );
};
