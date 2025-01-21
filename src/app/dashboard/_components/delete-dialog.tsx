'use client'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/shared/ui/dialog'
import type { DisclosureProps } from '@/shared/hooks/use-disclosure'
import { Button } from '@/shared/ui/button'
import { Spinner } from '@/shared/components/spinner'

interface DeleteDialogProps {
	title: string
	onDeleteAction: () => void
	disclosure: DisclosureProps
	onCancelAction: () => void
	isLoading?: boolean
}

export function DeleteDialog({
	title,
	onDeleteAction,
	disclosure,
	onCancelAction,
	isLoading,
}: DeleteDialogProps) {
	return (
		<Dialog open={disclosure.isOpen} onOpenChange={disclosure.onToggle}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Delete {title}</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete this {title}? This action cannot be undone.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className='flex justify-end'>
					<Button type='button' variant='destructive' onClick={onDeleteAction}>
						{isLoading ? <Spinner /> : 'Delete'}
					</Button>
					<Button type='button' variant='outline' onClick={onCancelAction}>
						Cancel
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
