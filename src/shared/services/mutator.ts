import { parseCookies } from 'nookies'

type Method = 'POST' | 'PUT' | 'DELETE' | 'PATCH'

type Mutator<PayloadType = unknown> = {
	url: string
	method: Method
	payload: PayloadType
	resourceAuthentication?: boolean
}

interface BaseResponseType {
	success: boolean
	status: number
	message: string
}

export interface ErrorResponseType<T> extends BaseResponseType {
	errors: T
}

export interface SuccessResponseType<T> extends BaseResponseType {
	payload: T
}

export const mutator = async <PayloadType = unknown, ResponseType = unknown>({
	url,
	method = 'POST',
	payload,
	resourceAuthentication = true,
}: Mutator<PayloadType>) => {
	try {
		const token = parseCookies({}).accessToken

		if (resourceAuthentication && !token) throw new Error('No token found')

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
			method,
			headers: {
				...(method !== 'DELETE' && { 'Content-Type': 'application/json' }),
				Authorization: resourceAuthentication ? `Bearer ${token}` : '',
			},
			body: payload !== null ? JSON.stringify(payload) : null,
		})

		const result = (await response.json()) as BaseResponseType

		if (!response.ok) {
			const errorResult = result as unknown as ErrorResponseType<ResponseType>

			throw errorResult
		}

		return result as SuccessResponseType<ResponseType>
	} catch (err) {
		const error = err as ErrorResponseType<ResponseType>
		if (error && 'message' in error) {
			throw err
		}

		throw new Error('Error mutating data', { cause: error })
	}
}
