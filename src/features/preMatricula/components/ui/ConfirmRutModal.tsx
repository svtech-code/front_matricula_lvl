import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/react';

interface ConfirmRutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  rut: string;
  isExtranjero: boolean;
}

export const ConfirmRutModal = ({
  isOpen,
  onClose,
  onConfirm,
  rut,
  isExtranjero,
}: ConfirmRutModalProps) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Confirmar el RUT ingresado</ModalHeader>
            <ModalBody>
              <header className="text-center">
                <h2 className="text-lg font-semibold text-gray-600">
                  ¿ El RUT Ingresado esta correcto ?
                </h2>
              </header>

              <article>
                <div className="w-full text-xl font-semibold rounded-2xl border-2 flex flex-col justify-center items-center p-4 border-dashed border-warning bg-warning/10 gap-2">
                  <p>{rut}</p>
                  {isExtranjero && (
                    <Chip size="sm" color="primary" variant="flat">
                      RUT Extranjero
                    </Chip>
                  )}
                </div>
              </article>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Editar
              </Button>
              <Button color="primary" onPress={onConfirm}>
                Es Correcto
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
