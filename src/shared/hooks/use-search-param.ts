'use client'

import { usePathname, useRouter, useSearchParams as nextSearchParams } from 'next/navigation'

export function useSearchParams() {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = nextSearchParams()

	const urlSearchParams: URLSearchParams = new URLSearchParams(Array.from(searchParams.entries()))

	function setQueryParams(params: Record<string, unknown> | URLSearchParams) {
		for (const [key, value] of Object.entries(params)) {
			urlSearchParams.set(key, String(value))
		}

		const search = urlSearchParams.toString()
		const query = search ? `?${search}` : ''

		router.push(`${pathname}${query}`, { scroll: false })
	}
	function removeAllSearchParams() {
		router.push(`${pathname}`, { scroll: false })
	}

	function removeSearchParams(keys: string[]) {
		keys.forEach(key => {
			urlSearchParams.delete(key)
		})

		const search = urlSearchParams.toString()
		const query = search ? `?${search}` : ''

		router.push(`${pathname}${query}`, { scroll: false })
	}

	return {
		searchParams: urlSearchParams,
		setSearchParams: setQueryParams,
		removeAllSearchParams,
		removeSearchParams,
	}
}
