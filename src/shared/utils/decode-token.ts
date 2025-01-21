import { jwtDecode, InvalidTokenError } from 'jwt-decode'
import type { Role } from './roles-permissions'

export type JwtPayload = {
	email: string
	role_type: Role
	iat: number
	exp: number
	id: number
}

export const decodeToken = (token: string) => {
	try {
		return jwtDecode<JwtPayload>(token)
	} catch (error) {
		if (error instanceof InvalidTokenError) {
			return false
		}
		throw error
	}
}
