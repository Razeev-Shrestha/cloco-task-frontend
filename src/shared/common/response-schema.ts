import { z } from 'zod'

export const responseSchema = <T extends z.Schema>(schema: T) => {
	return z.object({
		payload: schema,
		success: z.boolean(),
		message: z.string(),
		status: z.number(),
		pagination: z
			.object({
				count: z.number(),
				page: z.number(),
				hasNext: z.boolean(),
				totalRows: z.number(),
				limit: z.number(),
			})
			.optional(),
	})
}
