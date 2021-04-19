import {lazy} from 'react'

export default [
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
    name: 'Product View',
    path: '/product/view/:id',
    exact: true,
    component: lazy(() => import('../views/product-view')),
  },
  {
    name: 'Bag',
    path: '/bag',
    exact: true,
    component: lazy(() => import('../views/bag')),
  },
  {
    name: 'Checkout',
    path: '/checkout',
    exact: true,
    component: lazy(() => import('../views/checkout')),
  },
  {
    name: 'Payment',
    path: '/payment/:orderNumber',
    exact: true,
    component: lazy(() => import('../views/payment')),
  },
  {
    name: 'Order Check',
    path: '/order/check/:orderNumber',
    exact: true,
    component: lazy(() => import('../views/order-check')),
  },
  {
    name: 'Profile View',
    path: '/profile/view',
    exact: true,
    auth: true,
    component: lazy(() => import('../views/profile-view')),
  },
  {
    name: 'Profile Edit',
    path: '/profile/edit',
    exact: true,
    auth: true,
    component: lazy(() => import('../views/profile-edit')),
  },
  {
    name: 'Members',
    path: '/members',
    exact: true,
    auth: true,
    component: lazy(() => import('../views/member'))
  },
  {
    name: 'Orders',
    path: '/orders',
    exact: true,
    auth: true,
    component: lazy(() => import('../views/order'))
  },
  {
    name: 'Order View',
    path: '/order/view/:orderNumber',
    exact: true,
    auth: true,
    component: lazy(() => import('../views/order-view'))
  },
  {
    name: 'Order Confirmation',
    path: '/order/confirm/:orderNumber',
    exact: true,
    auth: true,
    component: lazy(() => import('../views/order-confirm'))
  },
  {
    path: '*',
    notFound: true,
  }
];
