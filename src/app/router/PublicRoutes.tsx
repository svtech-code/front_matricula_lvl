import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { PathRoute } from '@/domains/routes/route.entity';
import RegistroExitosoPage from '@/pages/public/RegistroExitosoPage';

const FichaMatricula = lazy(() => import('@/pages/public/FichaMatriculaPage'));
const PreMatricula = lazy(() => import('@/pages/public/PreMatriculaPage'));

export const publicRoutes: RouteObject[] = [
  {
    index: true,
    element: <PreMatricula />,
  },
  {
    path: PathRoute.FICHA_MATRICULA,
    element: <FichaMatricula />,
  },
  {
    path: PathRoute.REGISTRO_EXITOSO,
    element: <RegistroExitosoPage />,
  },
];
