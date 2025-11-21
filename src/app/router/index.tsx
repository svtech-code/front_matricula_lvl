import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import { publicRoutes } from './PublicRoutes';

export const router = createBrowserRouter([
  {
    path: '/pre-matricula',
    element: (
      <Suspense fallback={<div>cargando...</div>}>
        <PublicLayout />
      </Suspense>
    ),
    children: publicRoutes,
  },
]);
