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

    getCase(id) {
        return new Promise((resolve, reject) => {
            this.api.get(`/case/${id}`)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    getAllCases() {
        return new Promise((resolve, reject) => {
            this.api.get('/case')
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    changeStatus(id, type) {
        return new Promise((resolve, reject) => {
            this.api.post(`/case/${id}/${type}`)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    deleteCase(id) {
        return new Promise((resolve, reject) => {
            this.api.delete(`/case/${id}`)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    updateCase(data) {
        return new Promise((resolve, reject) => {
            this.api.put('/case', data)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    getAllCasePersons(id) {
        return new Promise((resolve, reject) => {
            this.api.get(`/case/${id}/person`)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    addPersonToCase(data) {
        return new Promise((resolve, reject) => {
            this.api.post(`/person`, data)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    deletePerson(id) {
        return new Promise((resolve, reject) => {
            this.api.delete(`/person/${id}`)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    toggleLeader(id, type) {
        return new Promise((resolve, reject) => {
            this.api.post(`/person/${id}/${type}`)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    getPerson(id) {
        return new Promise((resolve, reject) => {
            this.api.get(`/person/${id}`)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    getAllPerson() {
        return new Promise((resolve, reject) => {
            this.api.get(`/person`)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    }
}

