import { useDisclosure } from '@/shared/hooks/use-disclosure'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { Button } from '@/shared/ui/button'
import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react'
import { useDeleteSongService } from '../_services'
import { useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/shared/hooks/use-toast'
import { useState } from 'react'
import type { SongsType } from '../_schemas'
import { DeleteDialog } from '@/app/dashboard/_components/delete-dialog'
import { SongEdit } from './edit-song'
import { CanI } from '@/shared/providers/permission-provider'

interface SongActionsProps {
	data: SongsType
}
export const SongActions = ({ data }: SongActionsProps) => {
	const deleteDisclosure = useDisclosure()
	const editDisclosure = useDisclosure()
	const { isPending, mutate } = useDeleteSongService()
	const queryClient = useQueryClient()
	const { toast } = useToast()
	const [currentTitle, setCurrentTitle] = useState<string | null>(null)

	const onDeleteCancel = () => {
		deleteDisclosure.onClose()
	}

	const handleDelete = () => {
		mutate(data.title, {
			onSuccess: data => {
				toast({ description: data.message })
				queryClient.invalidateQueries({
					predicate: query => query.queryKey[0] === '__SONGS__',
				})
			},
			onError: error => {
				toast({ description: error.message, variant: 'destructive' })
			},
		})
		deleteDisclosure.onClose()
	}

	const onEdit = () => {
		setCurrentTitle(data.title)
		editDisclosure.onOpen()
	}

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='h-8 w-8 p-0'>
						<span className='sr-only'>Open menu</span>
						<MoreHorizontal className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<CanI task='update'>
						<DropdownMenuItem onClick={onEdit}>
							<Edit2 className='mr-2 h-4 w-4' />
							Edit
						</DropdownMenuItem>
					</CanI>
					<DropdownMenuSeparator />
					<CanI task='delete'>
						<DropdownMenuItem onClick={deleteDisclosure.onOpen}>
							<Trash2 className='mr-2 h-4 w-4' />
							Delete
						</DropdownMenuItem>
					</CanI>
				</DropdownMenuContent>
			</DropdownMenu>
			<DeleteDialog
				isLoading={isPending}
				disclosure={deleteDisclosure}
				onDeleteAction={handleDelete}
				onCancelAction={onDeleteCancel}
				title='Song'
			/>
			{currentTitle === data.title && (
				<SongEdit
					disclosure={editDisclosure}
					title={currentTitle}
					onSuccess={() => {
						setCurrentTitle(null)
					}}
				/>
			)}
		</>
	)
}
