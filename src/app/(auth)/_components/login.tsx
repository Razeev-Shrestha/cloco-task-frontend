'use client'

import { useForm } from '@/shared/hooks/use-form'
import { loginSchema, type LoginType } from '../_schema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { useLoginService } from '../_services'
import { useToast } from '@/shared/hooks/use-toast'
import { Spinner } from '@/shared/components/spinner'
import { setCookie } from 'nookies'

export const Login = () => {
	const form = useForm<LoginType>({ defaultValues: { email: '', password: '' } }, loginSchema)
	const { mutate, isPending } = useLoginService()
	const { toast } = useToast()

	const onFormSubmit = form.handleSubmit(data => {
		mutate(data, {
			onSuccess: data => {
				toast({ description: data.message, variant: 'default' })
				form.reset()
				setCookie(null, 'accessToken', data.payload?.accessToken, {
					maxAge: 24 * 60 * 60,
					secure: process.env.NODE_ENV === 'production',
					sameSite: 'strict',
				})

				window.location.href = '/dashboard'
			},
			onError: err => {
				toast({ description: err.message, variant: 'destructive' })
			},
		})
	})

	return (
		<Form {...form}>
			<form className='space-y-4' onSubmit={onFormSubmit}>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder='Enter your email' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type='password' placeholder='Enter your password' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' className='w-full' disabled={isPending}>
					{isPending ? <Spinner /> : 'Login'}
				</Button>
			</form>
		</Form>
	)
}
