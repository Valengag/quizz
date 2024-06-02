import { Dialog } from '@headlessui/react';
import { lazy, Suspense, useState } from 'react';
import { Outlet, RouteObject, useRoutes, BrowserRouter, useLocation } from 'react-router-dom';
import { AppBar } from '../shared/AppBar';

const Loading = () => <p className="p-4 w-full h-full text-center">Loading...</p>;

const Ranges = lazy(() => import('~/components/screens/Ranges'));
const Balls = lazy(() => import('~/components/screens/balls'));
const Td = lazy(() => import('~/components/screens/SceenScreen'));
const MainTitle = lazy(() => import('~/components/screens/MainTitle'));
const Accueil = lazy(() => import('~/components/screens/Accueil'));
const Profile = lazy(() => import('~/components/screens/Profile'));

function Layout() {
  const location = useLocation();

  return (
      <div className="flex flex-col w-screen h-screen ">
        <AppBar title={"Philo App"} />
        <Outlet />
      </div>
  );
}

export const Router = () => {
  return (
    <BrowserRouter>
      <InnerRouter />
    </BrowserRouter>
  );
};

const InnerRouter = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: 'Ranges',
          element: <Ranges />
        },
        {
          path: 'Balls',
          element: <Balls />
        },
        {
          path: 'Td',
          element: <Td />
        },
        {
          path: 'MainTitle',
          element: < MainTitle/>
        },
        {
          path: 'Accueil',
          element: < Accueil/>
        },
        {
          path: 'Profile',
          element: < Profile/>
        },
      ]
    }
  ];
  const element = useRoutes(routes);
  return (
    <div>
      <Suspense fallback={<Loading />}>{element}</Suspense>
    </div>
  );
};
