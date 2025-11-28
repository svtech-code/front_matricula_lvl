import { Spinner } from '@heroui/react';

interface LoaderProps {
  message?: string;
}

export const Loader = ({ message = 'Cargando...' }: LoaderProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4 shadow-xl">
        <Spinner size="lg" color="primary" />
        <p className="text-lg font-medium text-gray-700">{message}</p>
      </div>
    </div>
  );
};
