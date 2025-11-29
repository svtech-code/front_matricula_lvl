import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVerifyPreMatricula } from '../hooks/useVerifyPreMatricula.hook';
import { VerifyRutForm } from './forms/VerifyRutForm';
import AlertExistsPreMatricula from './ui/AlertExistsPreMatricula';

export const VerifyRutSection = () => {
  const navigate = useNavigate();
  const { verifyPreMatricula, isLoading, error } = useVerifyPreMatricula();
  const [showPreMatriculaExists, setShowPreMatriculaExists] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleVerify = async (rut: number, _dv: string) => {
    setShowPreMatriculaExists(false);

    const response = await verifyPreMatricula({
      rut,
      periodo_lectivo: 2,
      estado: 1,
    });

    if (response) {
      if (response.success) {
        setShowPreMatriculaExists(true);
        setIsVisible(true);
      } else {
        navigate('/ficha-matricula', { state: { rut } });
      }
    }
  };

  return (
    <section className="py-16 space-y-6">
      <header className="w-full flex flex-col justify-center items-center">
        <h3 className="text-xl font-semibold text-gray-800">
          Ingresar RUT del estudiante para comenzar
        </h3>

        <h4 className="text-xs text-gray-400">
          Ingresar solo números, sin puntos ni guión
        </h4>
      </header>

      <div className="w-full flex flex-col gap-2 justify-center items-center">
        <VerifyRutForm onSubmit={handleVerify} isLoading={isLoading} />
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      {showPreMatriculaExists && (
        <AlertExistsPreMatricula
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      )}
    </section>
  );
};
