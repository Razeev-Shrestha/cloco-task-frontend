import type { z } from 'zod'
import { parseCookies } from 'nookies'

type FetcherType<TResponseSchema extends z.ZodSchema> = {
	url: string
	schema: TResponseSchema
} & RequestInit

export const fetcher = async <TResponseSchema extends z.ZodSchema>({
	url,
	schema,
	...requestObject
}: FetcherType<TResponseSchema>): Promise<z.infer<TResponseSchema>> => {
	try {
		const token = parseCookies({}).accessToken
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			...requestObject,
		})

		if (!response.ok) {
			throw new Error('Error fetching data', { cause: await response.text() })
		}

		const result = await response.json()

		if (!schema.safeParse(result).success) throw new Error('Invalid data from the source.')

		return schema.parse(result)
	} catch (err) {
		throw new Error('Error fetching data', { cause: err })
	}
}
