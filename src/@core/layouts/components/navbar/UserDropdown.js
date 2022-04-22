// ** React Imports
import { Link } from 'react-router-dom'
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from 'reactstrap'
import { User, Power } from 'react-feather'
// import Gravatar from 'react-gravatar'
import Avatar from '@components/avatar'
import Image from './../../../../assets/images/avatars/2.png'
import { AuthService } from '../../../../services/authServic'

const UserDropdown = () => {

  const logout = () => {
    const authService = new AuthService()
    authService
      .logout()
      .then((res) => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('userData')
        window.location.href = '/auth/login'
      })
      .catch((err) => {
        HandleErrors(err)
      })
  }

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name font-weight-bold">
            form-website@gmail.com
          </span>
          <span className="user-status">کاربر</span>
        </div>
        <Avatar img={Image} size="lg" />
      </DropdownToggle>
      <DropdownMenu right>
        {/* <DropdownItem tag={Link} to={'/profile'} >
          <User size={14} className='mr-75' />
          <span className='align-middle'>پروفایل</span>
        </DropdownItem> */}
        <DropdownItem
          onClick={() => {
            logout()
          }}
        >
          <Power size={14} className="mr-75" />
          <span className="align-middle">خروج</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
