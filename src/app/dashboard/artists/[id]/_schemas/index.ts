import { z } from 'zod'

export const genreEnum = z.enum(['rnb', 'country', 'classic', 'rock', 'jazz'])

export const createSongSchema = z.object({
	title: z.string({ message: 'Title is required' }).min(3, { message: 'Title is required' }),
	album_name: z
		.string({ message: 'Album name is required' })
		.min(3, { message: 'Album name is required' }),
	genre: genreEnum,
})

export const songsSchema = z.object({
	artist_id: z.number(),
	title: z.string(),
	album_name: z.string(),
	genre: z.string(),
})

export type SongsType = z.infer<typeof songsSchema>

export type CreateSongsType = z.infer<typeof createSongSchema>
