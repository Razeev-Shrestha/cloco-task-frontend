'use client'

import { useForm } from '@/shared/hooks/use-form'
import { registerSchema, type RegisterType } from '../_schema'
import { useRegisterService } from '../_services'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { Button } from '@/shared/ui/button'
import { Spinner } from '@/shared/components/spinner'
import { useToast } from '@/shared/hooks/use-toast'
import { useRouter } from 'next/navigation'

export const Register = () => {
	const form = useForm<RegisterType>(
		{
			defaultValues: {
				first_name: '',
				last_name: '',
				email: '',
				password: '',
				phone: '',
				dob: '',
				address: '',
				gender: 'male',
				role_type: 'super_admin',
			},
		},
		registerSchema
	)

	const { toast } = useToast()
	const router = useRouter()

	const { mutate, isPending } = useRegisterService()

	const onFormSubmit = form.handleSubmit(data => {
		mutate(data, {
			onSuccess: data => {
				toast({ description: data.message })
				form.reset()
				router.replace('/login')
			},
			onError: err => {
				toast({ description: err.message, variant: 'destructive' })
			},
		})
	})

	return (
		<Form {...form}>
			<form className='grid grid-cols-2 items-center gap-4' onSubmit={onFormSubmit}>
				<FormField
					control={form.control}
					name='first_name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>First Name</FormLabel>
							<FormControl>
								<Input placeholder='Enter your first name' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='last_name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Last Name</FormLabel>
							<FormControl>
								<Input placeholder='Enter your last name' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
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
				<FormField
					control={form.control}
					name='phone'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone</FormLabel>
							<FormControl>
								<Input placeholder='Enter your phone' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='dob'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Date of Birth</FormLabel>
							<FormControl>
								<Input type='date' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='gender'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Gender</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select gender' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value='male'>Male</SelectItem>
									<SelectItem value='female'>Female</SelectItem>
									<SelectItem value='others'>Others</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='address'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Address</FormLabel>
							<FormControl>
								<Input placeholder='Enter Address' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' disabled={isPending} className='col-span-2'>
					{isPending ? <Spinner /> : 'Register'}
				</Button>
			</form>
		</Form>
	)
}
