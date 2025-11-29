import { Chip } from '@heroui/react';

interface Props {
  formattedRut: string;
  isExtranjero: boolean;
}

const RutVisualization = ({ formattedRut, isExtranjero }: Props) => {
  return (
    <div className="flex items-center justify-between gap-2 px-1 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center gap-2">
        <svg
          className="w-4 h-4 text-green-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <title>Check</title>
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>

        <span className="text-sm text-gray-600">
          RUT completo:{' '}
          <span className="font-semibold text-gray-800">{formattedRut}</span>
        </span>
      </div>
      {isExtranjero && (
        <Chip size="sm" color="primary" variant="flat">
          RUT Extranjero
        </Chip>
      )}
    </div>
  );
};

export default RutVisualization;
