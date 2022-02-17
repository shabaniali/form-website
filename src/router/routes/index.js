import { lazy } from 'react'
import { authRoutes } from './authRoutes'

// ** Document title
const TemplateTitle = 'FormWebsite'


// ** Merge Routes
const Routes = [
  ...authRoutes,
  {
    path: '/panel',
    component: lazy(() => import('../../views/dashboard/index')),
    exact: true,
    meta: {
      role: ['user']
    }
  },
  {
    path: '/panel/files',
    component: lazy(() => import('../../views/files')),
    exact: true,
    meta: {
      role: ['user']
    }
  },
  {
    path: '/panel/newFile',
    component: lazy(() => import('../../views/files/NewFile')),
    exact: true,
    meta: {
      role: ['user']
    }
  },
  {
    path: '/panel/viewFile/:id',
    component: lazy(() => import('../../views/files/ViewFile')),
    exact: true,
    meta: {
      role: ['user']
    }
  },
  {
    path: '/panel/editFile/:id',
    component: lazy(() => import('../../views/files/EditFile')),
    exact: true,
    meta: {
      role: ['user']
    }
  },
  {
    path: '/panel/users',
    component: lazy(() => import('../../views/users')),
    exact: true,
    meta: {
      role: ['user']
    }
  },
  {
    path: '/panel/editUser/:id',
    component: lazy(() => import('../../views/users/EditUser')),
    exact: true,
    meta: {
      role: ['user']
    }
  },
  {
    path: '/panel/viewUser/:id',
    component: lazy(() => import('../../views/users/ViewUser')),
    exact: true,
    meta: {
      role: ['user']
    }
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  }
]

export { TemplateTitle, Routes }
