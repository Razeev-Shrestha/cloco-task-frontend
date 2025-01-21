import { responseSchema } from '@/shared/common/response-schema'
import { fetcher } from '@/shared/services/fetcher'
import { useMutation, useQuery } from '@tanstack/react-query'
import { type CreateSongsType, songsSchema, type SongsType } from '../_schemas'
import { useParams } from 'next/navigation'
import { z } from 'zod'
import {
	type ErrorResponseType,
	mutator,
	type SuccessResponseType,
} from '@/shared/services/mutator'

export const useGetSongsService = () => {
	const { id } = useParams<{ id: string }>()
	return useQuery({
		queryKey: ['__SONGS__', id],
		queryFn: () =>
			fetcher({ url: `/artists/${id}/songs`, schema: responseSchema(z.array(songsSchema)) }),
	})
}

export const useGetSongService = (title: string) => {
	const { id } = useParams<{ id: string }>()
	return useQuery({
		queryKey: ['__SONG__', id, title],
		queryFn: () =>
			fetcher({
				url: `/artists/${id}/song?title=${title}`,
				schema: responseSchema(songsSchema),
			}),
	})
}

export const useCreateSongService = () => {
	const { id } = useParams<{ id: string }>()
	return useMutation<SuccessResponseType<SongsType>, ErrorResponseType<null>, CreateSongsType>({
		mutationKey: ['__CREATE_SONG__'],
		mutationFn: payload => mutator({ url: `/artists/${id}/songs`, method: 'POST', payload }),
	})
}

export const useUpdateSongService = (title: string) => {
	const { id } = useParams<{ id: string }>()
	return useMutation<SuccessResponseType<SongsType>, ErrorResponseType<null>, CreateSongsType>({
		mutationKey: ['__UPDATE_SONG__'],
		mutationFn: payload =>
			mutator({ url: `/artists/${id}/song?title=${title}`, method: 'PATCH', payload }),
	})
}

export const useDeleteSongService = () => {
	const { id } = useParams<{ id: string }>()
	return useMutation<SuccessResponseType<null>, ErrorResponseType<null>, string>({
		mutationKey: ['__DELETE_SONG__'],
		mutationFn: title =>
			mutator({ url: `/artists/${id}/song?title=${title}`, method: 'DELETE', payload: null }),
	})
}
