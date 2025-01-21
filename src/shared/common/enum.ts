import { z } from 'zod'

export const genderEnum = z.enum(['male', 'female', 'others'])

export const roleTypeEnum = z.enum(['super_admin', 'artist_manager', 'artist'])
