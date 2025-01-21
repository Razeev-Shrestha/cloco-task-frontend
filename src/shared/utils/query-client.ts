import { MutationCache, QueryClient, isServer, matchQuery } from '@tanstack/react-query'

export const makeQueryClient = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: 2,
				retryDelay: 1000,
				staleTime: 10 * 60 * 1000,
			},
			mutations: {
				retry: 2,
				retryDelay: 1000,
			},
		},
		mutationCache: new MutationCache({
			onSuccess: (_data, _variables, _context, mutation) => {
				queryClient.invalidateQueries({
					predicate: query =>
						mutation.meta?.invalidates?.some(queryKey => matchQuery({ queryKey }, query)) ??
						false,
				})
			},
		}),
	})

	return queryClient
}

let browserQueryClient: QueryClient | undefined

export const getQueryClient = () => {
	if (isServer) {
		// Server: always make a new query client
		return makeQueryClient()
	}
	// Browser: make a new query client if we don't already have one
	// This is very important, so we don't re-make a new client if React
	// suspends during the initial render. This may not be needed if we
	// have a suspense boundary BELOW the creation of the query client
	if (!browserQueryClient) browserQueryClient = makeQueryClient()
	return browserQueryClient
}
