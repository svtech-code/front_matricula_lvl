import { Button, Input, Switch } from '@heroui/react';
import type { AntecedentesJunaebProps } from '@/domains/fichaMatricula/fichaMatricula.entity';
import { useFichaMatricula } from '@/shared/hooks/useFichaMatricula';

export const AntecedentesJunaebForm = () => {
  const { formData, updateSection, clearSection } = useFichaMatricula();
  const data: Partial<AntecedentesJunaebProps> =
    formData.antecedentes_junaeb || {};

  const handleChange = (field: string, value: string | boolean) => {
    updateSection('antecedentes_junaeb', { [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Antecedentes JUNAEB</h3>
        <Button
          color="warning"
          variant="flat"
          size="sm"
          onPress={() => clearSection('antecedentes_junaeb')}
        >
          Limpiar Sección
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Etnia Perteneciente"
          value={data.etnia_perteneciente || ''}
          onChange={(e) => handleChange('etnia_perteneciente', e.target.value)}
        />
      </div>
      <div className="space-y-2 space-x-8">
        <Switch
          isSelected={data.beneficio_alimentacion || false}
          onValueChange={(value) =>
            handleChange('beneficio_alimentacion', value)
          }
        >
          Beneficio de alimentación
        </Switch>
        <Switch
          isSelected={data.pertenece_chile_solidario || false}
          onValueChange={(value) =>
            handleChange('pertenece_chile_solidario', value)
          }
        >
          Pertenece a Chile Solidario
        </Switch>
        <Switch
          isSelected={data.beca_indigena || false}
          onValueChange={(value) => handleChange('beca_indigena', value)}
        >
          Beca indígena
        </Switch>
        <Switch
          isSelected={data.beca_presidente_republica || false}
          onValueChange={(value) =>
            handleChange('beca_presidente_republica', value)
          }
        >
          Beca Presidente de la República
        </Switch>
      </div>
    </div>
  );
};
