import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from '@heroui/react';
import { useNavigate } from 'react-router';
import { PathRoute } from '@/domains/routes/route.entity';
import { CURSO_MATRICULA } from '@/features/fichaMatricula/const/cursos.const';
import { useFichaMatricula } from '@/shared/hooks/useFichaMatricula';

const RegistroExitosoPage = () => {
  const navigate = useNavigate();
  const { formData, resetForm } = useFichaMatricula();

  const handleVolverInicio = () => {
    resetForm();
    navigate(PathRoute.PRE_MATRICULA);
  };

  const getCursoLabel = (codCurso?: string) => {
    const curso = CURSO_MATRICULA.find((c) => c.key === codCurso);
    return curso?.label || 'No especificado';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <Card className="max-w-2xl w-full">
        <CardHeader className="flex flex-col gap-2 items-center bg-success-50 py-8">
          <div className="w-16 h-16 bg-success-500 rounded-full flex items-center justify-center mb-2">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-success-700">
            ¡Registro Exitoso!
          </h1>
          <p className="text-sm text-success-600">
            La ficha de prematrícula ha sido guardada correctamente
          </p>
        </CardHeader>

        <CardBody className="gap-6 p-6">
          <Alert
            color="warning"
            variant="flat"
            title="Importante: Este proceso es solo para captar información"
            description="El proceso de matrícula se realizará de forma presencial en el establecimiento durante los días indicados por el Ministerio de Educación."
          />

          <div>
            <h2 className="text-lg font-semibold mb-4">Datos del Estudiante</h2>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <span className="font-medium text-gray-600 min-w-[140px]">
                  RUT:
                </span>
                <span className="text-gray-900">
                  {formData.estudiante?.run_estudiante}-
                  {formData.estudiante?.dv_rut_estudiante}
                </span>
              </div>
              <Divider />
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <span className="font-medium text-gray-600 min-w-[140px]">
                  Nombres:
                </span>
                <span className="text-gray-900">
                  {formData.estudiante?.nombres}
                </span>
              </div>
              <Divider />
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <span className="font-medium text-gray-600 min-w-[140px]">
                  Apellidos:
                </span>
                <span className="text-gray-900">
                  {formData.estudiante?.apellido_paterno}{' '}
                  {formData.estudiante?.apellido_materno}
                </span>
              </div>
              <Divider />
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <span className="font-medium text-gray-600 min-w-[140px]">
                  Grado:
                </span>
                <span className="text-gray-900 font-semibold text-primary">
                  {getCursoLabel(formData.estudiante?.curso_inscrito)}
                </span>
              </div>
            </div>
          </div>

          <Alert
            color="primary"
            variant="flat"
            title="Próximos pasos"
            description="Por favor, espere la confirmación del establecimiento educacional sobre las fechas y horarios para completar el proceso de matrícula presencial."
          />

          <Button
            color="primary"
            size="lg"
            className="w-full"
            onPress={handleVolverInicio}
          >
            Volver al Inicio
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default RegistroExitosoPage;
