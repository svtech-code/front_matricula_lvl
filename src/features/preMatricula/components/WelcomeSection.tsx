import { LICEO_INFO } from '../const/liceo.const';

export const WelcomeSection = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl sm:text-5xl font-bold text-blue-800 mb-3 uppercase">
        Proceso Pre-Matrícula 2026
      </h1>

      <p className="text-gray-500">
        La pre-matrícula es el primer paso para formalizar el ingreso al{' '}
        {LICEO_INFO.nombre}. Recuerda que es necesario asistir de manera
        presencial, al establecimiento durante las fechas informadas, para
        validar los datos y firmar la ficha de matrícula.
      </p>
    </div>
  );
};
