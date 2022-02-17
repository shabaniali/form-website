// ** Core JWT Import
import useJwt from '@src/@core/auth/jwt/useJwt'

const { jwt } = useJwt({
    tokenType: 'Bearer'
})

export default jwt
