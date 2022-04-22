import React, { useEffect, useState } from 'react'
import { useSkin } from '@hooks/useSkin'
import { useRTL } from '@hooks/useRTL'
import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import 'react-phone-input-2/lib/style.css'
import jwt from './../../auth/jwt/useJwt'
import {useDispatch} from 'react-redux'
import {handleLogin} from './../../redux/actions/auth/index'
import DarkLogo from './../../assets/images/logo/logo-2.png'
import LightLogo from './../../assets/images/logo/logo.png'
import { AuthService } from '../../services/authServic'

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const theme = useSkin()
  const RTL = useRTL(true)

  const [data, setData] = useState({
    userName: '',
    password: '' 
  })

  useEffect(() => {
    localStorage.setItem('isRTL', true)
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    const authService = new AuthService()
    try {
      const loginResponse = await authService.login(data.userName, data.password).then(result => result.data)    
      jwt.setToken(loginResponse.access_token)
      jwt.setRefreshToken(loginResponse.refresh_token)
      history.replace('/panel/files')
    } catch (error) {
      console.log(error)
    }
    // jwt.setToken("test-token-eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImp0aSI6IjRmMWcyM2ExMmFhIn0.")
    // dispatch(handleLogin({
    //   email: "ali.shabani7811@gmail.com",
    //   id: 9332817811,
    //   username: "ali.shabani7811@gmail.com",
    //   role: 'user'
    // }))
    // history.replace('/panel/files')
  }
  return (
    <div className='auth-wrapper auth-v1 px-2'>
      <div className='auth-inner py-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              {/* <img src={theme[0] === 'dark' ? LightLogo : DarkLogo } alt="KuknosCo" className="w-50 mb-2" /> */}
              <h2>Form Website</h2>
            </Link>
            <CardTitle tag='h4' className='mb-1'>
              ورود
            </CardTitle>
            <CardText className='mb-2'>برای ورود به پنل نام کاربری و کلمه عبور خود را وارد کنید.</CardText>
            <Form className='auth-login-form mt-2' onSubmit={submit}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  نام کاربری
                </Label>
                <Input value={data.userName} onChange={(e) => setData({...data, userName: e.target.value })} id='login-email' autoFocus />
              </FormGroup>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    کلمه عبور
                  </Label>
                </div>
                <InputPasswordToggle value={data.password} onChange={(e) => setData({...data, password: e.target.value })} className='input-group-merge' id='login-password' />
              </FormGroup>
              <Button.Ripple color='primary' block>
                ورود
              </Button.Ripple>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Login
