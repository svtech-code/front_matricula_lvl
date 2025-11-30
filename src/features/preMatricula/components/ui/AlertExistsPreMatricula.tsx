import { Alert } from '@heroui/react';
import type { PreMatriculaResponse } from '@/domains/preMatricula/preMatricula.entity';

interface AlertProps {
  isVisible: boolean;
  setIsVisible: (state: boolean) => void;
  dataStudent: PreMatriculaResponse | null;
  setDataStudent: (data: PreMatriculaResponse | null) => void;
}

const AlertExistsPreMatricula = ({
  isVisible,
  setIsVisible,
  dataStudent,
  setDataStudent,
}: AlertProps) => {
  const getNameStudent = () => {
    const nombreEstudiante = `${dataStudent?.nombres} ${dataStudent?.apellido_paterno} ${dataStudent?.apellido_materno}`;
    return nombreEstudiante.toLowerCase();
  };

  const handleCloseAlert = () => {
    setIsVisible(false);
    setDataStudent(null);
  };

  return (
    <div className="w-full space-y-3">
      <Alert
        color="warning"
        description="Este RUT ya cuenta con una pre-matrícula registrada"
        isVisible={isVisible}
        title="Pre-Matrícula ya realizada"
        variant="faded"
        onClose={handleCloseAlert}
      />

      {isVisible && (
        <div className="space-y-3">
          <header>
            <h3 className="text-xl font-semibold">Datos de la pre-matrícula</h3>
          </header>

          <div className="flex flex-col gap-1">
            <p className="capitalize">
              <span className="font-semibold text-lg">Nombre: </span>
              {getNameStudent()}
            </p>

            <p className="capitalize">
              <span className="font-semibold text-lg">
                Grado a matricular:{' '}
              </span>
              {dataStudent?.grado_a_matricularse}°
            </p>

            <p className="capitalize">
              <span className="font-semibold text-lg">
                Fecha de pre-matrícula:{' '}
              </span>
              {dataStudent?.fecha_prematricula}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertExistsPreMatricula;
