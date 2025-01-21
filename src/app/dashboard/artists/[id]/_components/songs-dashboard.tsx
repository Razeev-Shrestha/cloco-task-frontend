'use client'

import { useMemo } from 'react'
import { useGetSongsService } from '../_services'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/shared/ui/data-table'
import { CanI, useRoleAndPermissions } from '@/shared/providers/permission-provider'
import { AddSong } from './add-song'
import type { SongsType } from '../_schemas'
import { SongActions } from './songs-action'

export const SongsDashboard = () => {
	const { data } = useGetSongsService()
	const { permissions } = useRoleAndPermissions()

	const columns = useMemo<ColumnDef<SongsType>[]>(
		() => [
			{
				header: 'Title',
				accessorKey: 'title',
			},
			{
				header: 'Album Name',
				accessorKey: 'album_name',
			},
			{
				header: 'Genre',
				accessorKey: 'genre',
			},

			{
				header: 'Actions',
				cell: ({ row }) => (permissions.create ? <SongActions data={row.original} /> : null),
			},
		],
		[permissions.create]
	)

	return (
		<DataTable
			columns={columns}
			data={data?.payload ?? []}
			pagination={data?.pagination}
			title='Songs Dashboard'
			headerSection={
				<CanI task='create'>
					<AddSong />
				</CanI>
			}
		/>
	)
}
