'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export const QueryProvider = ({ children }: { children: Readonly<React.ReactNode> }) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						retry: 2,
					},
				},
			})
	)

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools
				buttonPosition='bottom-left'
				client={queryClient}
				initialIsOpen={false}
				position='bottom'
			/>
		</QueryClientProvider>
	)
}
