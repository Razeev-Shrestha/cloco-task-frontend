'use client'

import {
	type ErrorResponseType,
	mutator,
	type SuccessResponseType,
} from '@/shared/services/mutator'
import { useMutation } from '@tanstack/react-query'
import type { LoginType, RegisterType } from '../_schema'

export const useLoginService = () => {
	return useMutation<
		SuccessResponseType<{ accessToken: string }>,
		ErrorResponseType<null>,
		LoginType
	>({
		mutationKey: ['__REGISTER__'],
		mutationFn: payload =>
			mutator({ url: '/auth/login', payload, method: 'POST', resourceAuthentication: false }),
	})
}

export const useRegisterService = () => {
	return useMutation<SuccessResponseType<null>, ErrorResponseType<{ test: string }>, RegisterType>(
		{
			mutationKey: ['__REGISTER__'],
			mutationFn: payload =>
				mutator({
					url: '/auth/register',
					payload,
					method: 'POST',
					resourceAuthentication: false,
				}),
		}
	)
}
