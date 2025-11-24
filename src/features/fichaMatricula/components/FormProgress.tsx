import { Progress } from '@heroui/react';

interface FormProgressProps {
  progress: number;
}

export const FormProgress = ({ progress }: FormProgressProps) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">Progreso del formulario</span>
        <span className="text-sm font-medium">{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} color="primary" className="mb-4" />
    </div>
  );
};
