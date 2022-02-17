import axios from 'axios'
import {requestConfig, responseConfig} from '@configs/axiosConfig.js'

export class AccountService {

    constructor() {
        this.api = axios.create({
            baseURL: `${window.env.base_url}`
        })
        this.api.interceptors.request.use(requestConfig)
    }

    // getUserInfo() {
    //     return new Promise((resolve, reject) => {
    //         this.api.get('/panel/site/user-info')
    //         .then((result) => {
    //             resolve(result)
    //         }).catch((err) => {
    //             reject(err)
    //         })
    //     })
    // }
}
