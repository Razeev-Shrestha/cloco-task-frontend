import { useDisclosure } from '@/shared/hooks/use-disclosure'
import type { ArtistType } from '../_schemas'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { Button } from '@/shared/ui/button'
import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react'
import { DeleteDialog } from '../../_components/delete-dialog'
import { useRouter } from 'next/navigation'
import { useDeleteArtistService } from '../_services'
import { useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/shared/hooks/use-toast'
import { useState } from 'react'
import { ArtistEdit } from './artist-edit'
import { CanI } from '@/shared/providers/permission-provider'

interface ArtistActionsProps {
	data: ArtistType
}
export const ArtistActions = ({ data }: ArtistActionsProps) => {
	const deleteDisclosure = useDisclosure()
	const editDisclosure = useDisclosure()
	const router = useRouter()
	const { isPending, mutate } = useDeleteArtistService()
	const queryClient = useQueryClient()
	const { toast } = useToast()
	const [currentId, setCurrentId] = useState<number | null>(null)

	const onDeleteCancel = () => {
		deleteDisclosure.onClose()
	}

	const handleDelete = () => {
		mutate(data.id, {
			onSuccess: data => {
				toast({ description: data.message })
				queryClient.invalidateQueries({
					predicate: query => query.queryKey[0] === '__ARTISTS__',
				})
			},
			onError: error => {
				toast({ description: error.message, variant: 'destructive' })
			},
		})
		deleteDisclosure.onClose()
	}

	const onEdit = () => {
		setCurrentId(data.id)
		editDisclosure.onOpen()
	}

	const onView = () => {
		router.push(`/dashboard/artists/${data.id}/songs`)
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
					<DropdownMenuItem onClick={onView}>
						<Eye className='mr-2 h-4 w-4' />
						View
					</DropdownMenuItem>
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
				title='Artist'
			/>
			{currentId === data.id && (
				<ArtistEdit
					disclosure={editDisclosure}
					id={currentId}
					onSuccess={() => {
						setCurrentId(null)
					}}
				/>
			)}
		</>
	)
}
