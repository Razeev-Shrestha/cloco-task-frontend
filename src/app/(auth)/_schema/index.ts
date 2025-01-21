import { genderEnum, roleTypeEnum } from '@/shared/common/enum'
import { z } from 'zod'

export const loginSchema = z.object({
	email: z.string({ message: 'Email is required.' }).email({ message: 'Invalid email address.' }),
	password: z.string({ message: 'Password is required' }),
})

export const registerSchema = z.object({
	first_name: z.string({ message: 'First name is required.' }),
	last_name: z.string({ message: 'Last name is required.' }),
	email: z.string({ message: 'Email is required.' }).email({ message: 'Invalid email address.' }),
	password: z.string({ message: 'Password is required' }),
	phone: z.string({ message: 'Phone is required' }),
	dob: z.string({ message: 'Date of birth is required' }).optional(),
	gender: genderEnum,
	role_type: roleTypeEnum,
	address: z.string().optional(),
})

export type LoginType = z.infer<typeof loginSchema>

export type RegisterType = z.infer<typeof registerSchema>
