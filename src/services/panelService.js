import axios from 'axios'
import {requestConfig, responseConfig} from '@configs/axiosConfig.js'

export class PanelServices {

    constructor() {
        this.api = axios.create({
            baseURL: `${window.env.base_url}`
        })
        this.api.interceptors.request.use(requestConfig)
    }

    addCase(address) {
        return new Promise((resolve, reject) => {
            this.api.post('/case', address)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    }
}
