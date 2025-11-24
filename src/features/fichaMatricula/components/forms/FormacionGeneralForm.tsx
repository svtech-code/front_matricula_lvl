import { Button, Chip, Switch } from '@heroui/react';
import { useFichaMatricula } from '@/shared/hooks/useFichaMatricula';

const opcionesFormacion = [
  { id: 1, nombre: 'Artes Visuales' },
  { id: 2, nombre: 'Artes Musicales' },
  { id: 3, nombre: 'Etica' },
  { id: 4, nombre: 'Religión Católica' },
  { id: 5, nombre: 'Religión Evangélica' },
];

export const FormacionGeneralForm = () => {
  const { formData, updateSection } = useFichaMatricula();
  const seleccionadas = formData.formacion_general_opciones || [];

  const handleToggle = (id: number, isSelected: boolean) => {
    if (isSelected) {
      updateSection('formacion_general_opciones', [...seleccionadas, id]);
    } else {
      updateSection(
        'formacion_general_opciones',
        seleccionadas.filter((opId) => opId !== id),
      );
    }
  };

  const opcionesSeleccionadas = opcionesFormacion.filter((op) =>
    seleccionadas.includes(op.id),
  );

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
        Selecciona las asignaturas de formación general que deseas cursar
      </p>

      <div className="space-y-2 space-x-8">
        {opcionesFormacion.map((opcion) => (
          <Switch
            key={opcion.id}
            isSelected={seleccionadas.includes(opcion.id)}
            onValueChange={(isSelected) => handleToggle(opcion.id, isSelected)}
          >
            {opcion.nombre}
          </Switch>
        ))}
      </div>

      {opcionesSeleccionadas.length > 0 && (
        <div className="mt-3 p-2 bg-gray-50 rounded">
          <p className="text-xs text-gray-600 mb-2">
            Seleccionadas: {opcionesSeleccionadas.length}
          </p>
          <div className="flex flex-wrap gap-1">
            {opcionesSeleccionadas.map((opcion) => (
              <Chip key={opcion.id} size="sm" variant="flat">
                {opcion.nombre}
              </Chip>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
