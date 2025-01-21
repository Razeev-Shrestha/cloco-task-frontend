import { responseSchema } from '@/shared/common/response-schema'
import { fetcher } from '@/shared/services/fetcher'
import { useMutation, useQuery } from '@tanstack/react-query'
import { artistSchema, type ArtistType, type CreateArtistType } from '../_schemas'
import { z } from 'zod'
import { useServerPagination } from '@/shared/hooks/use-server-pagination'
import {
	type ErrorResponseType,
	mutator,
	type SuccessResponseType,
} from '@/shared/services/mutator'

export const useGetArtistsService = () => {
	const { queryKey, url } = useServerPagination('/artists', ['__ARTISTS__'])
	return useQuery({
		queryKey,
		queryFn: () => fetcher({ url, schema: responseSchema(z.array(artistSchema)) }),
	})
}

export const useGetArtistService = (id: number) => {
	return useQuery({
		queryKey: ['__ARTIST__', id],
		enabled: !!id,
		queryFn: () => fetcher({ url: `/artists/${id}`, schema: responseSchema(artistSchema) }),
	})
}

export const useCreateArtistService = () => {
	return useMutation<SuccessResponseType<ArtistType>, ErrorResponseType<null>, CreateArtistType>({
		mutationKey: ['__CREATE_ARTIST__'],
		mutationFn: payload => mutator({ url: '/artists', method: 'POST', payload }),
	})
}

export const useUpdateArtistService = (id: number) => {
	return useMutation<SuccessResponseType<ArtistType>, ErrorResponseType<null>, CreateArtistType>({
		mutationKey: ['__UPDATE_ARTIST__'],
		mutationFn: payload => mutator({ url: `/artists/${id}`, method: 'PATCH', payload }),
	})
}

export const useDeleteArtistService = () => {
	return useMutation<SuccessResponseType<null>, ErrorResponseType<null>, number>({
		mutationKey: ['__DELETE_ARTIST__'],
		mutationFn: id => mutator({ url: `/artists/${id}`, method: 'DELETE', payload: null }),
	})
}
