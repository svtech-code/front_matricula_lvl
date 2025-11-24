import { Button, Input, Switch } from '@heroui/react';
import type { AntecedentesSocialesProps } from '@/domains/fichaMatricula/fichaMatricula.entity';
import { useFichaMatricula } from '@/shared/hooks/useFichaMatricula';

export const AntecedentesSocialesForm = () => {
  const { formData, updateSection, clearSection } = useFichaMatricula();
  const data: Partial<AntecedentesSocialesProps> =
    formData.antecedentes_sociales || {};

  const handleChange = (field: string, value: string | boolean | number) => {
    updateSection('antecedentes_sociales', { [field]: value });
  };

  const handleNumericChange = (field: string, value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const number = Number.parseInt(numericValue, 10) || 0;
    handleChange(field, number);
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
          required
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
          required
        />
        <Input
          label="Porcentaje Social de Hogares"
          type="text"
          value={
            data.porcentaje_social_hogares
              ? data.porcentaje_social_hogares.toString()
              : ''
          }
          onChange={(e) =>
            handleNumericChange('porcentaje_social_hogares', e.target.value)
          }
          required
        />
        <Input
          label="Previsión de Salud"
          value={data.prevision_salud || ''}
          onChange={(e) => handleChange('prevision_salud', e.target.value)}
          required
        />
        <Input
          label="Institución de Atención (Seguro)"
          value={data.institucion_atencion_seguro || ''}
          onChange={(e) =>
            handleChange('institucion_atencion_seguro', e.target.value)
          }
        />
        <Input
          label="Consultorio de Atención Primaria"
          value={data.consultorio_atencion_primaria || ''}
          onChange={(e) =>
            handleChange('consultorio_atencion_primaria', e.target.value)
          }
          required
        />
      </div>
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
    </div>
  );
};
