import { Alert } from '@heroui/react';

interface AlertProps {
  isVisible: boolean;
  setIsVisible: (state: boolean) => void;
}

const AlertExistsPreMatricula = ({ isVisible, setIsVisible }: AlertProps) => {
  return (
    <div className="w-full">
      <Alert
        color="warning"
        description="Este RUT ya cuenta con una pre-matrícula registrada"
        isVisible={isVisible}
        title="Pre-Matrícula ya realizada"
        variant="faded"
        onClose={() => setIsVisible(false)}
      />
    </div>
  );
};

export default AlertExistsPreMatricula;
