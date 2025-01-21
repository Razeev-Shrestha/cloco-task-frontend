import { fetcher } from '@/shared/services/fetcher'
import { useMutation, useQuery } from '@tanstack/react-query'
import { type CreateUserType, type UpdateUserType, userSchema, type UserType } from '../_schemas'
import { responseSchema } from '@/shared/common/response-schema'
import { z } from 'zod'
import { useServerPagination } from '@/shared/hooks/use-server-pagination'
import {
	type ErrorResponseType,
	mutator,
	type SuccessResponseType,
} from '@/shared/services/mutator'

export const useGetUsersService = () => {
	const { url, queryKey } = useServerPagination('/users', ['__USERS__'])

	return useQuery({
		queryKey,
		queryFn: () => fetcher({ url, schema: responseSchema(z.array(userSchema)) }),
	})
}

export const useCreateUserService = () => {
	return useMutation<SuccessResponseType<UserType>, ErrorResponseType<null>, CreateUserType>({
		mutationKey: ['__CREATE_USER__'],
		mutationFn: data => mutator({ url: '/users', method: 'POST', payload: data }),
	})
}

export const useGetUserService = (id: number) => {
	return useQuery({
		queryKey: ['__GET_USER__', id],
		enabled: !!id,
		queryFn: () => fetcher({ url: `/users/${id}`, schema: responseSchema(userSchema) }),
	})
}

export const useUpdateUserService = (id: number) => {
	return useMutation<SuccessResponseType<UserType>, ErrorResponseType<null>, UpdateUserType>({
		mutationKey: ['__UPDATE_USER__', id],
		mutationFn: data => mutator({ url: `/users/${id}`, method: 'PATCH', payload: data }),
	})
}

export const useDeleteUserService = () => {
	return useMutation<SuccessResponseType<null>, ErrorResponseType<null>, number>({
		mutationKey: ['__DELETE_USER__'],
		mutationFn: id => mutator({ url: `/users/${id}`, method: 'DELETE', payload: null }),
	})
}
