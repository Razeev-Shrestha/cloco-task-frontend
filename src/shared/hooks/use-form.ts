import { zodResolver } from '@hookform/resolvers/zod'
import { type FieldValues, type UseFormProps, useForm as useRHF } from 'react-hook-form'
import type { ZodEffects, ZodObject, ZodRawShape, ZodTypeAny } from 'zod'

export const useForm = <T extends FieldValues>(
	options: Omit<UseFormProps<T>, 'resolver'>,
	resolverSchema: ZodTypeAny | ZodObject<ZodRawShape> | ZodEffects<ZodObject<ZodRawShape>>
) => useRHF<T>({ ...options, resolver: zodResolver(resolverSchema) })
