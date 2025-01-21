import { useFormContext } from 'react-hook-form'
import type { CreateSongsType } from '../_schemas'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { Input } from '@/shared/ui/input'

export const SongsForm = () => {
	const form = useFormContext<CreateSongsType>()

	return (
		<>
			<FormField
				control={form.control}
				name='title'
				render={({ field }) => (
					<FormItem>
						<FormLabel>title</FormLabel>
						<FormControl>
							<Input placeholder='Enter song title' {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name='album_name'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Album Name</FormLabel>
						<FormControl>
							<Input placeholder='Enter album name' {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name='genre'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Genre</FormLabel>
						<Select onValueChange={field.onChange} value={field.value}>
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder='Select Genre' />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								{['rnb', 'country', 'classic', 'rock', 'jazz'].map((item, index) => (
									<SelectItem key={item} value={item} className='capitalize'>
										{item}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	)
}
