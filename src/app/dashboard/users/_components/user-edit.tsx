import type { DisclosureProps } from '@/shared/hooks/use-disclosure'
import { useForm } from '@/shared/hooks/use-form'
import { Button } from '@/shared/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/shared/ui/dialog'
import { Form } from '@/shared/ui/form'
import { updateUserSchema, type UpdateUserType } from '../_schemas'
import { UserForm } from './user-form'
import { Spinner } from '@/shared/components/spinner'
import { useGetUserService, useUpdateUserService } from '../_services'
import { useToast } from '@/shared/hooks/use-toast'
import { useQueryClient } from '@tanstack/react-query'

interface UserEditProps {
	disclosure: DisclosureProps
	id: number
	onSuccess?: () => void
}

export const UserEdit = ({ disclosure, id, onSuccess }: UserEditProps) => {
	const { data } = useGetUserService(id)
	const form = useForm<UpdateUserType>(
		{
			defaultValues: { address: '' },
			//@ts-ignore
			values: data?.payload,
		},
		updateUserSchema
	)
	const { mutate, isPending } = useUpdateUserService(id)

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
				onSuccess?.()
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
		<Dialog
			open={disclosure.isOpen}
			onOpenChange={v => {
				form.reset()
				disclosure.onToggle(v)
			}}>
			<DialogContent className='sm:max-w-[50vw]'>
				<DialogHeader>
					<DialogTitle className='text-2xl font-bold mb-4'>Edit User</DialogTitle>
					<DialogDescription>Update the fields below to update user.</DialogDescription>
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
