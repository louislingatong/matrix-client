import {lazy} from 'react'

export default [
  {
    name: 'Profile',
    path: '/profile',
    exact: true,
    auth: true,
    component: lazy(() => import('../views/profile')),
  },
  {
    name: 'Login',
    path: '/login',
    exact: true,
    strict: true,
    component: lazy(() => import('../views/auth/Login')),
  },
  {
    name: 'Register',
    path: '/register',
    exact: true,
    strict: true,
    component: lazy(() => import('../views/auth/Register')),
  },
  {
    name: 'Forgot Password',
    path: '/forgot-password',
    exact: true,
    strict: true,
    component: lazy(() => import('../views/auth/ForgotPassword')),
  },
  {
    name: 'Reset Password',
    path: '/reset-password/:token',
    exact: true,
    strict: true,
    component: lazy(() => import('../views/auth/ResetPassword')),
  },
  {
    name: 'Verify Email',
    path: '/verify-email/:token?',
    exact: true,
    component: lazy(() => import('../views/auth/VerifyEmail')),
  },
  {
    name: 'Home',
    path: '/',
    exact: true,
    component: lazy(() => import('../views/home')),
  },
  {
    name: 'Users',
    path: '/users',
    exact: true,
    auth: true,
    component: lazy(() => import('../views/user'))
  },
  {
    path: '*',
    notFound: true,
  }
];
