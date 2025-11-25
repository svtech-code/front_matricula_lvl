import '@/shared/styles/index.css';

import { ToastProvider } from '@heroui/toast';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <StrictMode>
      <ToastProvider placement="bottom-right" />
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
