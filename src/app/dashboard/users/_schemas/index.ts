import { registerSchema } from '@/app/(auth)/_schema'
import { roleTypeEnum } from '@/shared/common/enum'
import { z } from 'zod'

export const userSchema = z.object({
	id: z.number(),
	first_name: z.string(),
	last_name: z.string(),
	email: z.string(),
	phone: z.string(),
	dob: z.string(),
	gender: z.string(),
	role_type: z.string(),
	address: z.string().nullable(),
})

export const createUserSchema = registerSchema.extend({
	role_type: roleTypeEnum.exclude(['artist']),
})

export const updateUserSchema = registerSchema.extend({
	role_type: roleTypeEnum,
	password: z.string().optional(),
})

export type UserType = z.infer<typeof userSchema>

export type CreateUserType = z.infer<typeof createUserSchema>

export type UpdateUserType = z.infer<typeof updateUserSchema>
