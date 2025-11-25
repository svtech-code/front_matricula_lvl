import { Button } from '@heroui/react';

interface FormNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onCancel: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  isLastStep: boolean;
  isSubmitting?: boolean;
}

export const FormNavigation = ({
  onPrevious,
  onNext,
  onSubmit,
  onCancel,
  canGoPrevious,
  canGoNext,
  isLastStep,
  isSubmitting = false,
}: FormNavigationProps) => {
  return (
    <div className="flex justify-between mt-6 pt-6 border-t">
      <div className="flex gap-2">
        <Button
          color="default"
          variant="flat"
          onPress={onPrevious}
          isDisabled={!canGoPrevious}
        >
          Anterior
        </Button>
        <Button color="danger" variant="light" onPress={onCancel}>
          Cancelar
        </Button>
      </div>
      {isLastStep ? (
        <Button
          color="success"
          onPress={onSubmit}
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Formulario'}
        </Button>
      ) : (
        <Button color="primary" onPress={onNext} isDisabled={!canGoNext}>
          Siguiente
        </Button>
      )}
    </div>
  );
};
