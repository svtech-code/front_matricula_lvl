import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const PreMatricula = lazy(() => import('@/pages/public/PreMatriculaPage'));

export const publicRoutes: RouteObject[] = [
  {
    index: true,
    element: <PreMatricula />,
  },
];
