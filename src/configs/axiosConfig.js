import jwt from '@src/auth/jwt/useJwt'

export const requestConfig = (config) => {
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
}

export const responseConfig = (response) => {
	return response
}