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
    component: lazy(() => import('../views/home/Home')),
  },
  {
    name: 'Product View',
    path: '/product-admin/view/:id',
    exact: true,
    component: lazy(() => import('../views/product/ProductView')),
  },
  {
    name: 'Bag',
    path: '/bag',
    exact: true,
    component: lazy(() => import('../views/bag/Bag')),
  },
  {
    name: 'Checkout',
    path: '/checkout',
    exact: true,
    component: lazy(() => import('../views/checkout/Checkout')),
  },
  {
    name: 'Payment',
    path: '/payment/:orderNumber',
    exact: true,
    component: lazy(() => import('../views/payment/Payment')),
  },
  {
    name: 'Order Check',
    path: '/order-management/check/:orderNumber',
    exact: true,
    component: lazy(() => import('../views/order-check/OrderCheck')),
  },
  {
    name: 'Profile View',
    path: '/profile/view',
    exact: true,
    auth: true,
    component: lazy(() => import('../views/profile/ProfileView')),
  },
  {
    name: 'Profile Edit',
    path: '/profile/edit',
    exact: true,
    auth: true,
    component: lazy(() => import('../views/profile/ProfileEdit')),
  },
  {
    name: 'Members',
    path: '/members',
    exact: true,
    auth: true,
    component: lazy(() => import('../views/member/Member'))
  },
  {
    name: 'Users',
    path: '/manage/users',
    exact: true,
    auth: true,
    component: lazy(() => import('../views/admin/user-management'))
  },
  {
    name: 'Products',
    path: '/manage/products',
    exact: true,
    auth: true,
    component: lazy(() => import('../views/admin/product-management'))
  },
  {
    name: 'Product Add',
    path: '/manage/product/add',
    exact: true,
    auth: true,
    component: lazy(() => import('../views/admin/product-management/ProductAdd'))
  },
  {
    name: 'Product View',
    path: '/manage/product/view/:id',
    exact: true,
    auth: true,
    component: lazy(() => import('../views/admin/product-management/ProductView'))
  },
  {
    name: 'Product Edit',
    path: '/manage/product/edit/:id',
    exact: true,
    auth: true,
    component: lazy(() => import('../views/admin/product-management/ProductEdit'))
  },
  {
    name: 'Payment Methods',
    path: '/manage/payment-methods',
    exact: true,
    auth: true,
    component: lazy(() => import('../views/admin/payment-method-management'))
  },
  {
    name: 'Orders',
    path: '/manage/orders',
    exact: true,
    auth: true,
    component: lazy(() => import('../views/admin/order-management'))
  },
  {
    name: 'Order View',
    path: '/manage/order/view/:orderNumber',
    exact: true,
    auth: true,
    component: lazy(() => import('../views/admin/order-management/OrderView'))
  },
  {
    name: 'Order Confirmation',
    path: '/manage/order/confirm/:orderNumber',
    exact: true,
    auth: true,
    component: lazy(() => import('../views/admin/order-management/OrderConfirm'))
  },
  {
    name: 'Wallet',
    path: '/wallet',
    exact: true,
    auth: true,
    component: lazy(() => import('../views/wallet/Wallet'))
  },
  {
    path: '*',
    notFound: true,
  }
];
