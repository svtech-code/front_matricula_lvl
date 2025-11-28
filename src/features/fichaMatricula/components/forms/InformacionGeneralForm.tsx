import { Button, Select, SelectItem, Switch } from '@heroui/react';
import { useEffect, useState } from 'react';
import { useFichaMatricula } from '@/shared/hooks/useFichaMatricula';

export const InformacionGeneralForm = () => {
  const { formData, setFormData, setInformacionGeneralValid } =
    useFichaMatricula();

  const [autorizaFotos, setAutorizaFotos] = useState<string | undefined>(
    formData.autorizacion_uso_fotos === undefined
      ? undefined
      : formData.autorizacion_uso_fotos
        ? 'si'
        : 'no',
  );
  const [datosCorrectos, setDatosCorrectos] = useState(
    formData.confirmacion_datos_entregados ?? false,
  );
  const [enteradoReglamento, setEnteradoReglamento] = useState(
    formData.enterado_envio_reglamento ?? false,
  );

  const opcionesAutorizacion = [
    { key: 'si', label: 'Sí' },
    { key: 'no', label: 'No' },
  ];

  useEffect(() => {
    const isValid =
      autorizaFotos !== undefined && datosCorrectos && enteradoReglamento;
    if (setInformacionGeneralValid) {
      setInformacionGeneralValid(isValid);
    }
  }, [
    autorizaFotos,
    datosCorrectos,
    enteradoReglamento,
    setInformacionGeneralValid,
  ]);

  const handleAutorizaFotosChange = (value: string) => {
    setAutorizaFotos(value);
    const boolValue =
      value === 'si' ? true : value === 'no' ? false : undefined;
    setFormData({ autorizacion_uso_fotos: boolValue });
  };

  const handleDatosCorrectosChange = (value: boolean) => {
    setDatosCorrectos(value);
    setFormData({ confirmacion_datos_entregados: value });
  };

  const handleEnteradoReglamentoChange = (value: boolean) => {
    setEnteradoReglamento(value);
    setFormData({ enterado_envio_reglamento: value });
  };

  const handleLimpiar = () => {
    setAutorizaFotos(undefined);
    setDatosCorrectos(false);
    setEnteradoReglamento(false);
    setFormData({
      autorizacion_uso_fotos: undefined,
      confirmacion_datos_entregados: false,
      enterado_envio_reglamento: false,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Información General</h3>
        <Button
          color="warning"
          variant="flat"
          size="sm"
          onPress={handleLimpiar}
        >
          Limpiar Sección
        </Button>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <p className="text-sm text-blue-900 font-semibold">
          ⚠️ IMPORTANTE: Este proceso es para la recopilación de datos con el fin
          de agilizar el proceso de matrícula presencial en el establecimiento.
        </p>
      </div>

      <div className="space-y-6">
        <Select
          label="¿Autoriza el uso de fotos del estudiante de manera institucional?"
          placeholder="Seleccione una opción"
          selectedKeys={autorizaFotos ? [autorizaFotos] : []}
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string;
            handleAutorizaFotosChange(value);
          }}
          className="max-w-md"
        >
          {opcionesAutorizacion.map((opcion) => (
            <SelectItem key={opcion.key}>{opcion.label}</SelectItem>
          ))}
        </Select>

        <div className="space-y-4 pt-4">
          <div className="flex items-start gap-3">
            <Switch
              isSelected={datosCorrectos}
              onValueChange={handleDatosCorrectosChange}
              color="primary"
            >
              <span className="text-sm">
                Como apoderado, doy fe de que los datos ingresados son correctos
                <span className="text-red-500 ml-1">*</span>
              </span>
            </Switch>
          </div>

          <div className="flex items-start gap-3">
            <Switch
              isSelected={enteradoReglamento}
              onValueChange={handleEnteradoReglamentoChange}
              color="primary"
            >
              <span className="text-sm">
                Me doy por enterado que el reglamento interno me llegará por
                correo al correo del apoderado titular
                <span className="text-red-500 ml-1">*</span>
              </span>
            </Switch>
          </div>
        </div>

        <div className="text-xs text-gray-500 mt-4">
          <span className="text-red-500">*</span> Campos obligatorios
        </div>
      </div>
    </div>
  );
};
