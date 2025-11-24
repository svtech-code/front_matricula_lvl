import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { PathRoute } from '@/domains/routes/route.entity';

export const RedirectOverlay = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      navigate(PathRoute.PRE_MATRICULA);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="text-center text-white space-y-6 px-4">
        <div className="animate-bounce">
          <svg
            className="w-24 h-24 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            role="img"
            aria-label="Acceso bloqueado"
          >
            <title>Acceso Restringido</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Acceso Restringido</h2>
          <p className="text-xl">
            Debe iniciar desde la página de Pre-Matrícula
          </p>
        </div>
        <div className="flex justify-center items-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-100" />
          <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-200" />
        </div>
        <p className="text-sm opacity-75">Redirigiendo...</p>
      </div>
    </div>
  );
};
