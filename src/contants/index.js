import { lazy } from "react";

const SigninPage = lazy(() => import("../containers/SigninPage"));
const SignupPage = lazy(() => import("../containers/SignupPage"));
const HomePage = lazy(() => import("../containers/HomePage"));

export const PUBLIC_ROUTES = [
  {
    name: "Login",
    component: SigninPage,
    exact: false,
    path: "/login",
  },
  {
    name: "Register",
    component: SignupPage,
    exact: false,
    path: "/register",
  },
];

export const PRIVATE_ROUTES = [
  {
    name: "HomePage",
    component: HomePage,
    exact: true,
    path: "/",
  },
];
