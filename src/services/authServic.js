import axios from 'axios'
import {requestConfig, responseConfig} from '@configs/axiosConfig.js'

export class AuthService {

    constructor() {
        this.api = axios.create({
            baseURL: `${window.env.base_url}`
        })
        this.api.interceptors.request.use(requestConfig)
    }


    login(username, password) {
        return new Promise((resolve, reject) => {
            this.api.post('/panel/site/login', {
                username,
                password
            })
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    }
}
