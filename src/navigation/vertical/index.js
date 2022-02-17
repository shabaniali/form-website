import { Users, FileText, Circle } from 'react-feather'
import { getHomeRouteForLoggedInUser, getUserData } from '../../auth/utils'


const userData = getUserData()
const defaultRoute = getHomeRouteForLoggedInUser(userData.role)
 
export default [
  {
    id: 'files',
    title: 'پرونده ها',
    icon: <FileText size={20} />,
    role: [],
    children: [
      {
        id: 'files',
        title: 'لیست پرونده ها',
        icon: <Circle size={20} />,
        navLink: `/panel/files`,
        exact: true,
        role: []
      },
      {
        id: 'newFile',
        title: 'افزودن پرونده جدید',
        icon: <Circle size={20} />,
        navLink: `/panel/newFile`,
        exact: true,
        role: []
      }
    ]
  },
  {
    id: 'users',
    title: 'افراد',
    icon: <Users size={20} />,
    navLink: `/panel/users`,
    role: []
  }
]
