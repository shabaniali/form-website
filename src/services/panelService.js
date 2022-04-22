import { API } from '@configs/axiosConfig.js'

export class PanelServices {
  constructor() {
    
  }

  addCase(address) {
    return new Promise((resolve, reject) => {
      API
        .post('/case', address)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  getCase(id) {
    return new Promise((resolve, reject) => {
      API
        .get(`/case/${id}`)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  getAllCases() {
    return new Promise((resolve, reject) => {
      API
        .get('/case')
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  changeStatus(id, type) {
    return new Promise((resolve, reject) => {
      API
        .post(`/case/${id}/${type}`)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  deleteCase(id) {
    return new Promise((resolve, reject) => {
      API
        .delete(`/case/${id}`)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  updateCase(data) {
    return new Promise((resolve, reject) => {
      API
        .put('/case', data)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  getAllCasePersons(id) {
    return new Promise((resolve, reject) => {
      API
        .get(`/case/${id}/person`)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  addPersonToCase(data) {
    return new Promise((resolve, reject) => {
      API
        .post(`/person`, data)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  deletePerson(id) {
    return new Promise((resolve, reject) => {
      API
        .delete(`/person/${id}`)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  toggleLeader(id, type) {
    return new Promise((resolve, reject) => {
      API
        .post(`/person/${id}/${type}`)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  getPerson(id) {
    return new Promise((resolve, reject) => {
      API
        .get(`/person/${id}`)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  getAllPerson() {
    return new Promise((resolve, reject) => {
      API
        .get(`/person`)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  updatePerson(data) {
    return new Promise((resolve, reject) => {
      API
        .put('/person', data)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  addJob(data) {
    return new Promise((resolve, reject) => {
      API
        .post('/person-job', data)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  updateJob(data) {
    return new Promise((resolve, reject) => {
      API
        .put('/person-job', data)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  deleteJob(id) {
    return new Promise((resolve, reject) => {
      API
        .delete(`/person-job/${id}`)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  getAllJobs(id) {
    return new Promise((resolve, reject) => {
      API
        .get(`/person/${id}/job`)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  addSkill(data) {
    return new Promise((resolve, reject) => {
      API
        .post('/person-skill', data)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  updateSkill(data) {
    return new Promise((resolve, reject) => {
      API
        .put('/person-skill', data)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  deleteSkill(id) {
    return new Promise((resolve, reject) => {
      API
        .delete(`/person-skill/${id}`)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  getAllSkills(id) {
    return new Promise((resolve, reject) => {
      API
        .get(`/person/${id}/skill`)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  addRequirement(data) {
    return new Promise((resolve, reject) => {
      API
        .post('/person-requirement', data)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  updateRequirement(data) {
    return new Promise((resolve, reject) => {
      API
        .put('/person-requirement', data)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  deleteRequirement(id) {
    return new Promise((resolve, reject) => {
      API
        .delete(`/person-requirement/${id}`)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  getAllRequirements(id) {
    return new Promise((resolve, reject) => {
      API
        .get(`/person/${id}/requirement`)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
