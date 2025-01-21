import { z } from 'zod'

const envSchema = z.object({
	NEXT_PUBLIC_API_BASE_URL: z.string(),
})

envSchema.parse(process.env)

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envSchema> {}
	}
}
