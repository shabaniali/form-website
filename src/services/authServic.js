import axios from 'axios'
import { API } from '@configs/axiosConfig.js'

export class AuthService {
  constructor() {}

  login(username, password) {
    return new Promise((resolve, reject) => {
      API.post('/auth/login', {
        username,
        password
      })
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  logout() {
    return new Promise((resolve, reject) => {
      API.post('/auth/logout')
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
