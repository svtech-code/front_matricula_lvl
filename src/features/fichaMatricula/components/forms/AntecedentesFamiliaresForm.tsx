import { Button, Input, Select, SelectItem, Switch } from '@heroui/react';
import { useState } from 'react';
import type { FamiliarProps } from '@/domains/fichaMatricula/fichaMatricula.entity';
import { calcularDV } from '@/infra';
import { useFichaMatricula } from '@/shared/hooks/useFichaMatricula';
import { useGetTipoFamiliar } from '../../hooks/useGetTipoFamiliar.hook';

export const AntecedentesFamiliaresForm = () => {
  const { formData, updateSection } = useFichaMatricula();

  const { tipoFamiliares, isLoading } = useGetTipoFamiliar();

  const familiares = formData.familiares || [];
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [currentFamiliar, setCurrentFamiliar] = useState<
    Partial<FamiliarProps>
  >({
    run_familiar: 0,
    dv_run_familiar: '',
    nombres: '',
    apellido_paterno: '',
    direccion: '',
    comuna: '',
    cod_escolaridad: 1,
    lugar_trabajo: '',
    email: '',
    numero_telefonico: '',
    cod_tipo_familiar: undefined as any,
    es_titular: false,
    es_suplente: false,
  });

  const handleRutChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const rut = Number.parseInt(numericValue, 10) || 0;
    const dv = rut > 0 ? calcularDV(rut) : '';
    setCurrentFamiliar({
      ...currentFamiliar,
      run_familiar: rut,
      dv_run_familiar: dv,
    });
  };

  const handlePhoneChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 8) {
      setCurrentFamiliar({
        ...currentFamiliar,
        numero_telefonico: numericValue,
      });
    }
  };

  const handleAddOrUpdate = () => {
    const otherFamiliares =
      editingIndex !== null
        ? familiares.filter((_, i) => i !== editingIndex)
        : familiares;

    const hasPadre = otherFamiliares.some((f) => f.cod_tipo_familiar === 1);
    const hasMadre = otherFamiliares.some((f) => f.cod_tipo_familiar === 2);
    const hasTitular = otherFamiliares.some((f) => f.es_titular);
    const hasSuplente = otherFamiliares.some((f) => f.es_suplente);

    if (currentFamiliar.cod_tipo_familiar === 1 && hasPadre) {
      alert('Ya existe un Padre registrado');
      return;
    }
    if (currentFamiliar.cod_tipo_familiar === 2 && hasMadre) {
      alert('Ya existe una Madre registrada');
      return;
    }
    if (currentFamiliar.es_titular && hasTitular) {
      alert('Ya existe un apoderado titular');
      return;
    }
    if (currentFamiliar.es_suplente && hasSuplente) {
      alert('Ya existe un apoderado suplente');
      return;
    }

    if (editingIndex !== null) {
      const updated = [...familiares];
      updated[editingIndex] = currentFamiliar as Familiar;
      updateSection('familiares', updated);
      setEditingIndex(null);
    } else {
      updateSection('familiares', [...familiares, currentFamiliar as Familiar]);
    }
    resetForm();
  };

  const handleEdit = (index: number) => {
    setCurrentFamiliar(familiares[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const updated = familiares.filter((_, i) => i !== index);
    updateSection('familiares', updated);
  };

  const resetForm = () => {
    setCurrentFamiliar({
      run_familiar: 0,
      dv_run_familiar: '',
      nombres: '',
      apellido_paterno: '',
      direccion: '',
      comuna: '',
      cod_escolaridad: 1,
      lugar_trabajo: '',
      email: '',
      numero_telefonico: '',
      cod_tipo_familiar: undefined as any,
      es_titular: false,
      es_suplente: false,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Antecedentes Familiares</h3>
        <Button color="warning" variant="flat" size="sm" onPress={resetForm}>
          Limpiar Formulario
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-3">
          <Input
            label="RUN Familiar"
            type="text"
            value={
              currentFamiliar.run_familiar
                ? currentFamiliar.run_familiar.toString()
                : ''
            }
            onChange={(e) => handleRutChange(e.target.value)}
          />
        </div>
        <div className="md:col-span-1">
          <Input
            label="DV"
            maxLength={1}
            value={currentFamiliar.dv_run_familiar || ''}
            isDisabled
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombres"
          value={currentFamiliar.nombres || ''}
          onChange={(e) =>
            setCurrentFamiliar({ ...currentFamiliar, nombres: e.target.value })
          }
        />
        <Input
          label="Apellido Paterno"
          value={currentFamiliar.apellido_paterno || ''}
          onChange={(e) =>
            setCurrentFamiliar({
              ...currentFamiliar,
              apellido_paterno: e.target.value,
            })
          }
        />
        <Input
          label="Apellido Materno"
          value={currentFamiliar.apellido_materno || ''}
          onChange={(e) =>
            setCurrentFamiliar({
              ...currentFamiliar,
              apellido_materno: e.target.value,
            })
          }
        />
        <Select
          label="Tipo de Familiar"
          isLoading={isLoading}
          selectedKeys={
            currentFamiliar.cod_tipo_familiar
              ? [currentFamiliar.cod_tipo_familiar.toString()]
              : []
          }
          onSelectionChange={(keys) => {
            const value = Number.parseInt(Array.from(keys)[0] as string, 10);
            setCurrentFamiliar({
              ...currentFamiliar,
              cod_tipo_familiar: value,
            });
          }}
        >
          {tipoFamiliares.map((tipo) => (
            <SelectItem key={tipo.cod_tipo_familiar.toString()}>
              {tipo.descripcion_familiar}
            </SelectItem>
          ))}
        </Select>
        <Input
          label="Dirección"
          value={currentFamiliar.direccion || ''}
          onChange={(e) =>
            setCurrentFamiliar({
              ...currentFamiliar,
              direccion: e.target.value,
            })
          }
        />
        <Input
          label="Comuna"
          value={currentFamiliar.comuna || ''}
          onChange={(e) =>
            setCurrentFamiliar({ ...currentFamiliar, comuna: e.target.value })
          }
        />
        <Input
          label="Actividad Laboral"
          value={currentFamiliar.actividad_laboral || ''}
          onChange={(e) =>
            setCurrentFamiliar({
              ...currentFamiliar,
              actividad_laboral: e.target.value,
            })
          }
        />
        <Input
          label="Lugar de Trabajo"
          value={currentFamiliar.lugar_trabajo || ''}
          onChange={(e) =>
            setCurrentFamiliar({
              ...currentFamiliar,
              lugar_trabajo: e.target.value,
            })
          }
        />
        <Input
          label="Email"
          type="email"
          value={currentFamiliar.email || ''}
          onChange={(e) =>
            setCurrentFamiliar({ ...currentFamiliar, email: e.target.value })
          }
        />
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-3">
            <Input label="Código" value="+569" isDisabled />
          </div>
          <div className="col-span-9">
            <Input
              label="Número Telefónico"
              type="text"
              value={currentFamiliar.numero_telefonico || ''}
              onChange={(e) => handlePhoneChange(e.target.value)}
              maxLength={8}
            />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Switch
          isSelected={currentFamiliar.es_titular || false}
          onValueChange={(value) =>
            setCurrentFamiliar({
              ...currentFamiliar,
              es_titular: value,
              es_suplente: value ? false : currentFamiliar.es_suplente,
            })
          }
        >
          Es titular
        </Switch>
        <Switch
          isSelected={currentFamiliar.es_suplente || false}
          onValueChange={(value) =>
            setCurrentFamiliar({
              ...currentFamiliar,
              es_suplente: value,
              es_titular: value ? false : currentFamiliar.es_titular,
            })
          }
        >
          Es suplente
        </Switch>
      </div>
      <Button color="primary" onPress={handleAddOrUpdate}>
        {editingIndex !== null ? 'Actualizar Familiar' : 'Agregar Familiar'}
      </Button>
      {editingIndex !== null && (
        <Button
          color="default"
          onPress={() => {
            setEditingIndex(null);
            resetForm();
          }}
          className="ml-2"
        >
          Cancelar
        </Button>
      )}

      <div className="mt-6">
        <h4 className="font-semibold mb-2">Familiares Registrados</h4>
        {familiares.length === 0 ? (
          <p className="text-gray-500">No hay familiares registrados</p>
        ) : (
          <div className="space-y-2">
            {familiares.map((familiar, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">
                    {familiar.nombres} {familiar.apellido_paterno}
                  </p>
                  <p className="text-sm text-gray-600">
                    {familiar.email} - {familiar.numero_telefonico}
                  </p>
                </div>
                <div className="space-x-2">
                  <Button size="sm" onPress={() => handleEdit(index)}>
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    onPress={() => handleDelete(index)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
