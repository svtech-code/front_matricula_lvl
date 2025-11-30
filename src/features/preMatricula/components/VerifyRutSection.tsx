import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVerifyPreMatricula } from '../hooks/useVerifyPreMatricula.hook';
import { VerifyRutForm } from './forms/VerifyRutForm';
import AlertExistsPreMatricula from './ui/AlertExistsPreMatricula';
import { ConfirmRutModal } from './ui/ConfirmRutModal';
import { calcularDV } from '@/infra';
import type { PreMatriculaResponse } from '@/domains/preMatricula/preMatricula.entity';

export const VerifyRutSection = () => {
  const navigate = useNavigate();

  const { verifyPreMatricula, isLoading, error } = useVerifyPreMatricula();
  const [showPreMatriculaExists, setShowPreMatriculaExists] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [dataStudent, setDataStudent] = useState<PreMatriculaResponse | null>(
    null,
  );
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [rutToConfirm, setRutToConfirm] = useState<{ rut: number } | null>(
    null,
  );

  const handleVerify = async (rut: number) => {
    setShowPreMatriculaExists(false);

    const response = await verifyPreMatricula({
      rut,
      periodo_lectivo: 2,
      estado: 1,
    });

    if (response) {
      if (response.success) {
        setDataStudent(response.data);
        setShowPreMatriculaExists(true);
        setIsVisible(true);
      } else {
        setRutToConfirm({ rut });
        setConfirmModalOpen(true);
      }
    }
  };

  const handleConfirmRut = () => {
    if (rutToConfirm)
      navigate('/ficha-matricula', { state: { rut: rutToConfirm.rut } });
  };

  const handleEditRut = () => {
    setConfirmModalOpen(false);
    setRutToConfirm(null);
  };

  const getRut = (rut: number | null): string => {
    if (!rut) return '';

    const dv = rut > 0 ? calcularDV(rut) : '';
    return `${rut}-${dv}`;
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
          dataStudent={dataStudent}
          setDataStudent={setDataStudent}
        />
      )}

      <ConfirmRutModal
        isOpen={isConfirmModalOpen}
        onClose={handleEditRut}
        onConfirm={handleConfirmRut}
        rut={getRut(rutToConfirm?.rut || null)}
        isExtranjero={(rutToConfirm?.rut.toString().length || 0) >= 9}
      />
    </section>
  );
};
