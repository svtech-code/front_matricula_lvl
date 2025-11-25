import { Button, Chip, Switch } from '@heroui/react';
import { useFichaMatricula } from '@/shared/hooks/useFichaMatricula';
import { useGetFormacionGeneral } from '../../hooks/useGetFormacionGeneral.hook';

export const FormacionGeneralForm = () => {
  const { formData, updateSection } = useFichaMatricula();
  const { formacionGeneral, isLoading } = useGetFormacionGeneral();
  const seleccionadas = formData.formacion_general_opciones || [];

  const opcionesArtes = formacionGeneral.filter(
    (op) => op.categoria === 'Artes',
  );
  const opcionesReligiones = formacionGeneral.filter(
    (op) => op.categoria === 'Religiones',
  );

  const handleToggle = (id: number, isSelected: boolean, categoria: string) => {
    if (isSelected) {
      const opcionesCategoria =
        categoria === 'Artes' ? opcionesArtes : opcionesReligiones;
      const sinCategoria = seleccionadas.filter(
        (selectedId) =>
          !opcionesCategoria.some((op) => op.cod_fg_opciones === selectedId),
      );
      updateSection('formacion_general_opciones', [...sinCategoria, id]);
    } else {
      updateSection(
        'formacion_general_opciones',
        seleccionadas.filter((opId) => opId !== id),
      );
    }
  };

  const opcionesSeleccionadas = formacionGeneral.filter((op) =>
    seleccionadas.includes(op.cod_fg_opciones),
  );

  if (isLoading) {
    return <div>Cargando opciones de formación general...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Formación General</h3>
        <Button
          color="warning"
          variant="flat"
          size="sm"
          onPress={() => updateSection('formacion_general_opciones', [])}
        >
          Limpiar Sección
        </Button>
      </div>
      <p className="text-sm text-gray-600 mb-3">
        Selecciona una asignatura de cada categoría
      </p>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="text-md font-semibold mb-3">Artes</h4>
          <div className="space-y-2 space-x-4">
            {opcionesArtes.map((opcion) => (
              <Switch
                key={opcion.cod_fg_opciones}
                isSelected={seleccionadas.includes(opcion.cod_fg_opciones)}
                onValueChange={(isSelected) =>
                  handleToggle(opcion.cod_fg_opciones, isSelected, 'Artes')
                }
              >
                {opcion.nombre_asignatura}
              </Switch>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-md font-semibold mb-3">Religiones</h4>
          <div className="space-y-2 space-x-4">
            {opcionesReligiones.map((opcion) => (
              <Switch
                key={opcion.cod_fg_opciones}
                isSelected={seleccionadas.includes(opcion.cod_fg_opciones)}
                onValueChange={(isSelected) =>
                  handleToggle(opcion.cod_fg_opciones, isSelected, 'Religiones')
                }
              >
                {opcion.nombre_asignatura}
              </Switch>
            ))}
          </div>
        </div>
      </div>

      {opcionesSeleccionadas.length > 0 && (
        <div className="mt-3 p-2 bg-gray-50 rounded">
          <p className="text-xs text-gray-600 mb-2">
            Seleccionadas: {opcionesSeleccionadas.length}
          </p>
          <div className="flex flex-wrap gap-2">
            {opcionesSeleccionadas.map((opcion) => (
              <Chip key={opcion.cod_fg_opciones} size="sm" variant="flat">
                {opcion.nombre_asignatura}
              </Chip>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
