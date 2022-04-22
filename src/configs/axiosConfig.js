import jwt from '@src/auth/jwt/useJwt'
import Axios from 'axios'
import jwt_decode from "jwt-decode"
import Moment from 'jalali-moment'

const api = new Axios.create({
	baseURL: `${window.env.base_url}`
})

api.interceptors.request.use(async (config) => {
	const accessToken = `${jwt.jwtConfig.tokenType} ${jwt.getToken()}`  
	config.headers = {
		"accept-language": "fa-ir"
	}

	if (accessToken) {
		config.headers = {
			...config.headers,
			Authorization: accessToken
		}
	}

	return config
})

const getNewToken = () => {
	return new Promise((resolve, reject) => {
		const refreshToken = `${jwt.jwtConfig.tokenType} ${jwt.getRefreshToken()}`  
		api.post('/auth/refresh', {
			refresh_token: refreshToken.split(' ')[1]
		})
		.then((result) => {
			resolve(result.data)
		}).catch((err) => {
			reject(err)
		})
	})
}

api.interceptors.response.use(
	(response) => {
	  return response
	},
	async (error) => {
		const originalConfig = error.config
		if (error.response) {
			if (error.response.status === 401 && !originalConfig._retry) {
				originalConfig._retry = true
				const tokens = await getNewToken()
				jwt.setToken(tokens.access_token)
				jwt.setRefreshToken(tokens.refresh_token)
				originalConfig.headers = {
					...originalConfig.headers,
					Authorization: `Bearer ${tokens.access_token}`
				}
				return Axios(originalConfig)
			}
		}
	  	return Promise.reject(error)
	}
  )

export const API = api