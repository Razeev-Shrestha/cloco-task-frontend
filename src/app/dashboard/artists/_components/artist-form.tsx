import { useFormContext } from 'react-hook-form'
import type { CreateArtistType } from '../_schemas'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'

export const ArtistForm = () => {
	const form = useFormContext<CreateArtistType>()
	return (
		<>
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
						<Select onValueChange={field.onChange} value={field.value}>
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
			/>{' '}
			<FormField
				control={form.control}
				name='first_release_year'
				render={({ field }) => (
					<FormItem>
						<FormLabel>First Release Year</FormLabel>
						<FormControl>
							<Input
								placeholder='Enter First Release year'
								type='number'
								min={1900}
								{...field}
								onChange={e => field.onChange(e.target.valueAsNumber)}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>{' '}
			<FormField
				control={form.control}
				name='no_of_albums_released'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Number of albums released</FormLabel>
						<FormControl>
							<Input
								placeholder='Enter number of albums released'
								type='number'
								min={0}
								{...field}
								onChange={e => field.onChange(e.target.valueAsNumber)}
							/>
						</FormControl>
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
		</>
	)
}
