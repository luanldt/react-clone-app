import { lazy } from 'react';
const HomePage = lazy(() => import('../containers/HomePage'));
const SigninPage = lazy(() => import('../containers/SigninPage'));
const SignupPage = lazy(() => import('../containers/SignupPage'));

export const PRIVATE_ROUTES = [
  {
    name: 'Board',
    exact: false,
    path: '/board',
    component: HomePage,
  },
];

export const PUBLIC_ROUTES = [
  {
    name: 'Login',
    exact: false,
    path: '/login',
    component: SigninPage,
  },
  {
    name: 'Register',
    exact: false,
    path: '/register',
    component: SignupPage,
  },
];
