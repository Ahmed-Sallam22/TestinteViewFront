// src/routes/index.tsx
import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout.tsx';
import NotFound from '../components/NotFound/NotFound.tsx';
import { AuthProvider } from '../components/AuthProvider.tsx';

const Home = lazy(() => import('../components/Home/Home.tsx'));
const Login = lazy(() => import('../components/Auth/Login.tsx'));

const LoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center h-screen">
    <p>Loading...</p>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'home',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AuthProvider>
              <Home />
            </AuthProvider>
          </Suspense>
        ),
      },
      {
        path: '/',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
