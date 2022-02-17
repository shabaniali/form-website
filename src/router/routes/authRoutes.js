import { lazy } from 'react'

export const authRoutes = [
  {
      path: '/auth/login',
      component: lazy(() => import('../../views/auth/Login')),
      exact: true,
      layout: 'BlankLayout',
      meta: {
        publicRoute: true
      }
  }
]