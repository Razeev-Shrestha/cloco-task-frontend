import { z } from 'zod'
import { createUserSchema } from '../../users/_schemas'

export const artistSchema = z.object({
	first_release_year: z.number().min(1900).max(new Date().getFullYear()),
	no_of_albums_released: z.number().min(0),
	id: z.number().positive(),
	email: z.string(),
	first_name: z.string(),
	last_name: z.string(),
	gender: z.string(),
	role_type: z.string(),
})

export const createArtistSchema = createUserSchema.extend({
	first_release_year: artistSchema.shape.first_release_year,
	no_of_albums_released: artistSchema.shape.no_of_albums_released,
	role_type: z.string().default('artist'),
})

export type ArtistType = z.infer<typeof artistSchema>

export type CreateArtistType = z.infer<typeof createArtistSchema>
