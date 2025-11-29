import { Button, Input, Select, SelectItem } from '@heroui/react';
import { useEffect, useMemo, useState } from 'react';
import type { EstudianteProps } from '@/domains/fichaMatricula/fichaMatricula.entity';
import { calcularDV } from '@/infra';
import { useFichaMatricula } from '@/shared/hooks/useFichaMatricula';
import { CURSO_MATRICULA } from '../../const/cursos.const';
import { useGetGeneros } from '../../hooks/useGetGeneros.hook';

export const EstudianteForm = () => {
  const { formData, updateSection, clearSection, setEstudianteValid } =
    useFichaMatricula();
  const { generos, isLoading } = useGetGeneros();

  const estudiante: Partial<EstudianteProps> = formData.estudiante || {};

  const [touchedFields, setTouchedFields] = useState({
    curso_inscrito: false,
    nombres: false,
    apellido_paterno: false,
    fecha_nacimiento: false,
    cod_genero: false,
  });

  const isValid = useMemo(() => {
    return !!(
      estudiante.curso_inscrito &&
      estudiante.nombres?.trim() &&
      estudiante.apellido_paterno?.trim() &&
      estudiante.fecha_nacimiento &&
      estudiante.cod_genero
    );
  }, [estudiante]);

  useEffect(() => {
    setEstudianteValid(isValid);
  }, [isValid, setEstudianteValid]);

  const handleFieldTouch = (field: keyof typeof touchedFields) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (field: string, value: string | number) => {
    updateSection('estudiante', { [field]: value });
    if (field in touchedFields) {
      handleFieldTouch(field as keyof typeof touchedFields);
    }
  };

  const handleRutChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const rut = Number.parseInt(numericValue, 10) || 0;
    const dv = rut > 0 ? calcularDV(rut) : '';
    updateSection('estudiante', {
      run_estudiante: rut,
      dv_rut_estudiante: dv,
    });
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
              isDisabled
              isRequired
            />
          </div>
          <div className="md:col-span-2">
            <Input
              label="DV"
              maxLength={1}
              value={estudiante.dv_rut_estudiante || ''}
              isDisabled
              isRequired
            />
          </div>
        </div>
        <div className="w-2/3">
          <Select
            label="Nivel a Matricularse"
            selectedKeys={
              estudiante.curso_inscrito ? [estudiante.curso_inscrito] : []
            }
            onSelectionChange={(keys) => {
              const value = Array.from(keys)[0] as string;
              handleChange('curso_inscrito', value);
            }}
            onClose={() => handleFieldTouch('curso_inscrito')}
            isRequired
            isInvalid={
              touchedFields.curso_inscrito && !estudiante.curso_inscrito
            }
            errorMessage={
              touchedFields.curso_inscrito &&
              !estudiante.curso_inscrito &&
              'Campo requerido'
            }
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
          onBlur={() => handleFieldTouch('nombres')}
          isRequired
          isInvalid={touchedFields.nombres && !estudiante.nombres?.trim()}
          errorMessage={
            touchedFields.nombres &&
            !estudiante.nombres?.trim() &&
            'Campo requerido'
          }
        />
        <Input
          label="Nombre Social (opcional)"
          value={estudiante.nombre_social || ''}
          onChange={(e) => handleChange('nombre_social', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Apellido 1"
          value={estudiante.apellido_paterno || ''}
          onChange={(e) => handleChange('apellido_paterno', e.target.value)}
          onBlur={() => handleFieldTouch('apellido_paterno')}
          isRequired
          isInvalid={
            touchedFields.apellido_paterno &&
            !estudiante.apellido_paterno?.trim()
          }
          errorMessage={
            touchedFields.apellido_paterno &&
            !estudiante.apellido_paterno?.trim() &&
            'Campo requerido'
          }
        />
        <Input
          label="Apellido 2"
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
            onBlur={() => handleFieldTouch('fecha_nacimiento')}
            isRequired
            isInvalid={
              touchedFields.fecha_nacimiento && !estudiante.fecha_nacimiento
            }
            errorMessage={
              touchedFields.fecha_nacimiento &&
              !estudiante.fecha_nacimiento &&
              'Campo requerido'
            }
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
            onClose={() => handleFieldTouch('cod_genero')}
            isLoading={isLoading}
            isRequired
            isInvalid={touchedFields.cod_genero && !estudiante.cod_genero}
            errorMessage={
              touchedFields.cod_genero &&
              !estudiante.cod_genero &&
              'Campo requerido'
            }
          >
            {generos?.map((genero) => (
              <SelectItem
                key={genero.cod_genero.toString()}
                className="capitalize"
              >
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
