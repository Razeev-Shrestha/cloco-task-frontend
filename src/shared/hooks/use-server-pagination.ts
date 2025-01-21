'use client'

import { useSearchParams } from './use-search-param'

export const useServerPagination = (url: string, initialKey: string[]) => {
	const queryParams = new URLSearchParams()
	const { searchParams } = useSearchParams()

	for (const [key, value] of searchParams.entries()) {
		queryParams.set(key, String(value))
	}

	const newUrl = `${url}?${queryParams.toString()}`

	return {
		url: newUrl,
		queryKey: [...initialKey, queryParams.toString()],
	}
}
