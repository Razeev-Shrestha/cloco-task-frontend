import { useForm } from '@/shared/hooks/use-form'
import { createSongSchema, type CreateSongsType } from '../_schemas'
import { useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/shared/hooks/use-toast'
import { useDisclosure } from '@/shared/hooks/use-disclosure'
import { useCreateSongService } from '../_services'
import { Button } from '@/shared/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog'
import { Form } from '@/shared/ui/form'
import { Spinner } from '@/shared/components/spinner'
import { SongsForm } from './songs-form'

export const AddSong = () => {
	const disclosure = useDisclosure()

	const form = useForm<CreateSongsType>({}, createSongSchema)
	const queryClient = useQueryClient()
	const { toast } = useToast()

	const { mutate, isPending } = useCreateSongService()

	const onFormSubmit = form.handleSubmit(data => {
		mutate(data, {
			onSuccess: data => {
				toast({ description: data.message })
				form.reset()
				queryClient.invalidateQueries({
					predicate: query => query.queryKey[0] === '__SONGS__',
				})
				disclosure.onClose()
			},
			onError: error => {
				toast({ description: error.message, variant: 'destructive' })
			},
		})
	})

	const onCancel = () => {
		form.reset()
		disclosure.onClose()
	}

	return (
		<Dialog open={disclosure.isOpen} onOpenChange={disclosure.onToggle}>
			<DialogTrigger asChild>
				<Button variant='secondary'>Add Song</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[50vw]'>
				<DialogHeader>
					<DialogTitle className='text-2xl font-bold mb-4'>Add Song</DialogTitle>
					<DialogDescription>
						Please fill in the form below to add a new song.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={onFormSubmit} className='space-y-3'>
						<SongsForm />
						<div className='col-span-2 flex justify-end items-center gap-4'>
							<Button type='button' variant={'outline'} onClick={onCancel}>
								Cancel
							</Button>
							<Button type='submit' disabled={isPending} className='col-span-2'>
								{isPending ? <Spinner /> : 'Submit'}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
