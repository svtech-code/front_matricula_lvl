import { Link } from '@heroui/react';
import logo from '@/shared/assets/logo_lvl.png';
import { LICEO_INFO } from '../const/liceo.const';

const LINKS = [
  { label: 'Sitio Web', url: LICEO_INFO.sitioWeb },
  { label: 'Admisión Escolar', url: LICEO_INFO.admisionEscolar },
];

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="w-[12rem] md:w-[18rem] duration-300 will-change-auto">
            <img
              src={logo}
              alt="Logo horizontal del establecimiento"
              className="hover:scale-105 duration-300 will-change-auto w-full h-auto"
            />
          </div>

          <nav
            className="hidden sm:flex space-x-4"
            aria-label="Enlaces institucionales"
          >
            {LINKS.map(({ label, url }) => (
              <Link
                key={url}
                href={url}
                target="_blank"
                underline="hover"
                className="text-lg text-blue-800 hover:text-blue-900 font-semibold"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
