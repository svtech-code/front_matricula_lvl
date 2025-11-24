import { Button, Input, Select, SelectItem } from '@heroui/react';
import type { EstudianteProps } from '@/domains/fichaMatricula/fichaMatricula.entity';
import { calcularDV } from '@/infra';
import { useFichaMatricula } from '@/shared/hooks/useFichaMatricula';
import { CURSO_MATRICULA } from '../../const/cursos.const';
import { useGetGeneros } from '../../hooks/useGetGeneros.hook';

export const EstudianteForm = () => {
  const { formData, updateSection, clearSection } = useFichaMatricula();
  const { generos, isLoading } = useGetGeneros();

  const estudiante: Partial<EstudianteProps> = formData.estudiante || {};

  const handleChange = (field: string, value: string | number) => {
    updateSection('estudiante', { [field]: value });
  };

  const handleRutChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const rut = Number.parseInt(numericValue, 10) || 0;
    const dv = rut > 0 ? calcularDV(rut) : '';
    updateSection('estudiante', { run_estudiante: rut, dv_rut_estudiante: dv });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Datos del Estudiante</h3>
        <Button
          color="warning"
          variant="flat"
          size="sm"
          onPress={() => clearSection('estudiante')}
        >
          Limpiar Sección
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6">
            <Input
              label="RUN"
              type="text"
              value={
                estudiante.run_estudiante
                  ? estudiante.run_estudiante.toString()
                  : ''
              }
              onChange={(e) => handleRutChange(e.target.value)}
              required
            />
          </div>
          <div className="md:col-span-2">
            <Input
              label="DV"
              maxLength={1}
              value={estudiante.dv_rut_estudiante || ''}
              isDisabled
              required
            />
          </div>
        </div>
        <div className="w-1/3">
          <Select
            label="Grado a Matricularse"
            selectedKeys={
              estudiante.curso_inscrito ? [estudiante.curso_inscrito] : []
            }
            onSelectionChange={(keys) => {
              const value = Array.from(keys)[0] as string;
              handleChange('curso_inscrito', value);
            }}
            required
          >
            {CURSO_MATRICULA.map((curso) => (
              <SelectItem key={curso.key}>{curso.label}</SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombres"
          value={estudiante.nombres || ''}
          onChange={(e) => handleChange('nombres', e.target.value)}
          required
        />
        <Input
          label="Nombre Social (opcional)"
          value={estudiante.nombre_social || ''}
          onChange={(e) => handleChange('nombre_social', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Apellido Paterno"
          value={estudiante.apellido_paterno || ''}
          onChange={(e) => handleChange('apellido_paterno', e.target.value)}
          required
        />
        <Input
          label="Apellido Materno"
          value={estudiante.apellido_materno || ''}
          onChange={(e) => handleChange('apellido_materno', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Fecha de Nacimiento"
            type="date"
            value={estudiante.fecha_nacimiento || ''}
            onChange={(e) => handleChange('fecha_nacimiento', e.target.value)}
            required
          />
          <Select
            label="Género"
            selectedKeys={
              estudiante.cod_genero ? [estudiante.cod_genero.toString()] : []
            }
            onSelectionChange={(keys) => {
              const value = Number.parseInt(Array.from(keys)[0] as string, 10);
              handleChange('cod_genero', value);
            }}
            isLoading={isLoading}
            required
          >
            {generos?.map((genero) => (
              <SelectItem key={genero.cod_genero.toString()}>
                {genero.descripcion}
              </SelectItem>
            ))}
          </Select>
        </div>
        <Input
          label="Nacionalidad"
          value={estudiante.nacionalidad || ''}
          onChange={(e) => handleChange('nacionalidad', e.target.value)}
        />
      </div>
    </div>
  );
};
