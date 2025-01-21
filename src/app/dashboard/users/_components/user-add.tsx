import { useDisclosure } from '@/shared/hooks/use-disclosure'
import { useForm } from '@/shared/hooks/use-form'
import { Button } from '@/shared/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog'
import { createUserSchema, type CreateUserType } from '../_schemas'
import { Form } from '@/shared/ui/form'
import { useCreateUserService } from '../_services'
import { Spinner } from '@/shared/components/spinner'
import { UserForm } from './user-form'
import { useToast } from '@/shared/hooks/use-toast'
import { useQueryClient } from '@tanstack/react-query'

export const UserAdd = () => {
	const disclosure = useDisclosure()
	const form = useForm<CreateUserType>({}, createUserSchema)
	const { isPending, mutate } = useCreateUserService()
	const { toast } = useToast()
	const queryClient = useQueryClient()

	const onFormSubmit = form.handleSubmit(data => {
		mutate(data, {
			onSuccess: data => {
				toast({ description: data.message })
				form.reset()
				queryClient.invalidateQueries({
					predicate: query => query.queryKey[0] === '__USERS__',
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
				<Button variant='secondary'>Add User</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[50vw]'>
				<DialogHeader>
					<DialogTitle className='text-2xl font-bold mb-4'>Add User</DialogTitle>
					<DialogDescription>
						Please fill in the form below to add a new user.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={onFormSubmit} className='space-y-3'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<UserForm />
							<div className='col-span-2 flex justify-end items-center gap-4'>
								<Button type='button' variant={'outline'} onClick={onCancel}>
									Cancel
								</Button>
								<Button type='submit' disabled={isPending} className='col-span-2'>
									{isPending ? <Spinner /> : 'Submit'}
								</Button>
							</div>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
