import { Button, Input, Switch } from '@heroui/react';
import type { AntecedentesPieProps } from '@/domains/fichaMatricula/fichaMatricula.entity';
import { useFichaMatricula } from '@/shared/hooks/useFichaMatricula';

export const AntecedentesPieForm = () => {
  const { formData, updateSection, clearSection } = useFichaMatricula();
  const data: Partial<AntecedentesPieProps> = formData.antecedentes_pie || {};

  const handleChange = (field: string, value: string | boolean) => {
    updateSection('antecedentes_pie', { [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Antecedentes PIE</h3>
        <Button
          color="warning"
          variant="flat"
          size="sm"
          onPress={() => clearSection('antecedentes_pie')}
        >
          Limpiar Sección
        </Button>
      </div>
      <div className="space-y-2 space-x-8 mb-4">
        <Switch
          isSelected={data.pertenecio_pie || false}
          onValueChange={(value) => handleChange('pertenecio_pie', value)}
        >
          Perteneció a PIE
        </Switch>
        <Switch
          isSelected={data.tiene_documentacion_pie || false}
          onValueChange={(value) =>
            handleChange('tiene_documentacion_pie', value)
          }
        >
          Tiene documentación PIE
        </Switch>
      </div>
      {data.pertenecio_pie && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Diagnóstico PIE"
            value={data.diagnostico_pie || ''}
            onChange={(e) => handleChange('diagnostico_pie', e.target.value)}
          />
          <Input
            label="Curso en el que estuvo en PIE"
            value={data.curso_estuvo_pie || ''}
            onChange={(e) => handleChange('curso_estuvo_pie', e.target.value)}
          />
          <Input
            label="Colegio donde estuvo en PIE"
            value={data.colegio_estuvo_pie || ''}
            onChange={(e) => handleChange('colegio_estuvo_pie', e.target.value)}
          />
        </div>
      )}
    </div>
  );
};
