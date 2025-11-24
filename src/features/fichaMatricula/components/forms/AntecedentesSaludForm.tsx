import { Button, Input, Switch } from '@heroui/react';
import type { AntecedentesSaludProps } from '@/domains/fichaMatricula/fichaMatricula.entity';
import { useFichaMatricula } from '@/shared/hooks/useFichaMatricula';

export const AntecedentesSaludForm = () => {
  const { formData, updateSection, clearSection } = useFichaMatricula();
  const data: Partial<AntecedentesSaludProps> =
    formData.antecedentes_salud || {};

  const handleChange = (field: string, value: string | boolean) => {
    updateSection('antecedentes_salud', { [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Antecedentes de Salud</h3>
        <Button
          color="warning"
          variant="flat"
          size="sm"
          onPress={() => clearSection('antecedentes_salud')}
        >
          Limpiar Sección
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Enfermedad Diagnosticada"
          value={data.enfermedad_diagnosticada || ''}
          onChange={(e) =>
            handleChange('enfermedad_diagnosticada', e.target.value)
          }
        />
        <Input
          label="Grupo Sanguíneo"
          value={data.grupo_sanguineo || ''}
          onChange={(e) => handleChange('grupo_sanguineo', e.target.value)}
        />
        <Input
          label="Medicamentos Indicados"
          value={data.medicamentos_indicados || ''}
          onChange={(e) =>
            handleChange('medicamentos_indicados', e.target.value)
          }
        />
        <Input
          label="Medicamentos Contraindicados"
          value={data.medicamentos_contraindicados || ''}
          onChange={(e) =>
            handleChange('medicamentos_contraindicados', e.target.value)
          }
        />
      </div>
      <div className="space-y-2">
        <Switch
          isSelected={data.documentacion_enfermedades || false}
          onValueChange={(value) =>
            handleChange('documentacion_enfermedades', value)
          }
        >
          Tiene documentación de enfermedades
        </Switch>
      </div>
      <h4 className="font-semibold mt-4">Atención por Especialistas</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Switch
          isSelected={data.atendido_psicologo || false}
          onValueChange={(value) => handleChange('atendido_psicologo', value)}
        >
          Atendido por Psicólogo
        </Switch>
        <Switch
          isSelected={data.atendido_psiquiatra || false}
          onValueChange={(value) => handleChange('atendido_psiquiatra', value)}
        >
          Atendido por Psiquiatra
        </Switch>
        <Switch
          isSelected={data.atendido_psicopedagogo || false}
          onValueChange={(value) =>
            handleChange('atendido_psicopedagogo', value)
          }
        >
          Atendido por Psicopedagogo
        </Switch>
        <Switch
          isSelected={data.atendido_fonoaudiologo || false}
          onValueChange={(value) =>
            handleChange('atendido_fonoaudiologo', value)
          }
        >
          Atendido por Fonoaudiólogo
        </Switch>
        <Switch
          isSelected={data.atendido_otro || false}
          onValueChange={(value) => handleChange('atendido_otro', value)}
        >
          Atendido por Otro Especialista
        </Switch>
      </div>
      {data.atendido_otro && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Input
            label="Nombre del Especialista"
            value={data.nombre_especialista || ''}
            onChange={(e) =>
              handleChange('nombre_especialista', e.target.value)
            }
          />
          <Input
            label="Especialidad"
            value={data.especialidad || ''}
            onChange={(e) => handleChange('especialidad', e.target.value)}
          />
        </div>
      )}
    </div>
  );
};
