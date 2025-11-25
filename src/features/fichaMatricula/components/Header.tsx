import insignia from '@/shared/assets/insignia.png';

const Header = () => {
  return (
    <header className="flex items-center gap-4">
      <div className="w-[4rem] md:w-[6rem]">
        <img
          src={insignia}
          alt="Insignia Liceo Valentín Letelier Madariaga"
          className="hover:scale-105 duration-300 will-change-auto w-full h-auto"
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold">Formulario de Pre-Matrícula</h1>

        <ul className="text-sm text-gray-600 ml-6 space-y-1 list-disc list-inside">
          <li>
            Este proceso es solo para avanzar con la recopilación de información
            y no asegura la matrícula del estudiante.
          </li>

          <li>
            El proceso de matrícula se hace de manera presencial en el
            establecimiento, durante las fechas señaladas por el Ministerio de
            Educación.
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
