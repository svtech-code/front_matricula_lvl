import { Button, Input, Select, SelectItem } from '@heroui/react';
import type { AntecedentesAcademicosProps } from '@/domains/fichaMatricula/fichaMatricula.entity';
import { useFichaMatricula } from '@/shared/hooks/useFichaMatricula';
import {
  CURSO_PERIODO_ANTERIOR,
  CURSOS_REPROBADOS,
} from '../../const/cursos.const';

export const AntecedentesAcademicosForm = () => {
  const { formData, updateSection, clearSection } = useFichaMatricula();
  const data: Partial<AntecedentesAcademicosProps> =
    formData.antecedentes_academicos || {};

  const handleChange = (field: string, value: string | string[]) => {
    updateSection('antecedentes_academicos', { [field]: value });
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
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Cursos Reprobados"
          selectionMode="multiple"
          selectedKeys={data.cursos_reprobados || []}
          onSelectionChange={(keys) => {
            const values = Array.from(keys) as string[];
            handleChange('cursos_reprobados', values);
          }}
          required
        >
          {CURSOS_REPROBADOS.map((curso) => (
            <SelectItem key={curso.key}>{curso.label}</SelectItem>
          ))}
        </Select>
        <Select
          label="Curso Período Anterior"
          selectedKeys={
            data.curso_periodo_anterior ? [data.curso_periodo_anterior] : []
          }
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string;
            handleChange('curso_periodo_anterior', value);
          }}
          required
        >
          {CURSO_PERIODO_ANTERIOR.map((curso) => (
            <SelectItem key={curso.key}>{curso.label}</SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};
