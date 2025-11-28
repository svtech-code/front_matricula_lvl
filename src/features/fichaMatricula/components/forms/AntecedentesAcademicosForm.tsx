import { Button, Input, Select, SelectItem } from '@heroui/react';
import { useEffect, useMemo, useState } from 'react';
import type { AntecedentesAcademicosProps } from '@/domains/fichaMatricula/fichaMatricula.entity';
import { useFichaMatricula } from '@/shared/hooks/useFichaMatricula';
import {
  CURSO_PERIODO_ANTERIOR,
  CURSOS_REPROBADOS,
} from '../../const/cursos.const';

export const AntecedentesAcademicosForm = () => {
  const {
    formData,
    updateSection,
    clearSection,
    setAntecedentesAcademicosValid,
  } = useFichaMatricula();
  const data: Partial<AntecedentesAcademicosProps> =
    formData.antecedentes_academicos || {};

  const [touchedFields, setTouchedFields] = useState({
    colegio_procedencia: false,
    curso_periodo_anterior: false,
    cursos_reprobados: false,
  });

  const isFormValid = useMemo(() => {
    const colegioProcedencia = data.colegio_procedencia?.trim() || '';
    const cursoPeriodoAnterior = data.curso_periodo_anterior?.trim() || '';
    const cursosReprobados = data.cursos_reprobados || [];

    return (
      colegioProcedencia.length > 0 &&
      cursoPeriodoAnterior.length > 0 &&
      cursosReprobados.length > 0
    );
  }, [
    data.colegio_procedencia,
    data.curso_periodo_anterior,
    data.cursos_reprobados,
  ]);

  useEffect(() => {
    setAntecedentesAcademicosValid(isFormValid);
  }, [isFormValid, setAntecedentesAcademicosValid]);

  const handleChange = (field: string, value: string | string[]) => {
    updateSection('antecedentes_academicos', { [field]: value });
  };

  const handleBlur = (field: keyof typeof touchedFields) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleSelectClose = (field: keyof typeof touchedFields) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  const getErrorMessage = (field: keyof typeof touchedFields) => {
    if (!touchedFields[field]) return '';

    if (field === 'colegio_procedencia') {
      const value = data.colegio_procedencia?.trim() || '';
      if (value.length === 0) return 'Este campo es obligatorio';
    }

    if (field === 'curso_periodo_anterior') {
      const value = data.curso_periodo_anterior?.trim() || '';
      if (value.length === 0) return 'Debe seleccionar un curso';
    }

    if (field === 'cursos_reprobados') {
      const value = data.cursos_reprobados || [];
      if (value.length === 0) return 'Debe seleccionar al menos un curso';
    }

    return '';
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">
          Datos Académicos del Estudiante
        </h3>
        <Button
          color="warning"
          variant="flat"
          size="sm"
          onPress={() => clearSection('antecedentes_academicos')}
        >
          Limpiar Sección
        </Button>
      </div>
      <Input
        label="Colegio de Procedencia"
        value={data.colegio_procedencia || ''}
        onChange={(e) => handleChange('colegio_procedencia', e.target.value)}
        onBlur={() => handleBlur('colegio_procedencia')}
        isRequired
        isInvalid={!!getErrorMessage('colegio_procedencia')}
        errorMessage={getErrorMessage('colegio_procedencia')}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Seleccionar cursos que ha reprobado"
          selectionMode="multiple"
          selectedKeys={data.cursos_reprobados || []}
          onSelectionChange={(keys) => {
            const values = Array.from(keys) as string[];
            handleChange('cursos_reprobados', values);
          }}
          onClose={() => handleSelectClose('cursos_reprobados')}
          isRequired
          isInvalid={!!getErrorMessage('cursos_reprobados')}
          errorMessage={getErrorMessage('cursos_reprobados')}
        >
          {CURSOS_REPROBADOS.map((curso) => (
            <SelectItem key={curso.key}>{curso.label}</SelectItem>
          ))}
        </Select>
        <Select
          label="Curso año 2025"
          selectedKeys={
            data.curso_periodo_anterior ? [data.curso_periodo_anterior] : []
          }
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string;
            handleChange('curso_periodo_anterior', value);
          }}
          onClose={() => handleSelectClose('curso_periodo_anterior')}
          isRequired
          isInvalid={!!getErrorMessage('curso_periodo_anterior')}
          errorMessage={getErrorMessage('curso_periodo_anterior')}
        >
          {CURSO_PERIODO_ANTERIOR.map((curso) => (
            <SelectItem key={curso.key}>{curso.label}</SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};
