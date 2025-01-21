'use client'

import { useMemo } from 'react'
import { useGetArtistsService } from '../_services'
import type { ColumnDef } from '@tanstack/react-table'
import type { ArtistType } from '../_schemas'
import { DataTable } from '@/shared/ui/data-table'
import { ArtistActions } from './artist-actions'
import { ArtistAdd } from './artist-add'
import { CanI } from '@/shared/providers/permission-provider'

export const ArtistDashboard = () => {
	const { data } = useGetArtistsService()
	const columns = useMemo<ColumnDef<ArtistType>[]>(
		() => [
			{ accessorKey: 'id', header: 'ID' },
			{
				header: 'Name',
				accessorFn: ({ first_name, last_name }) => `${first_name} ${last_name}`,
			},
			{
				accessorKey: 'email',
				header: 'Email',
			},
			{
				accessorKey: 'first_release_year',
				header: 'First Release Year',
			},
			{
				accessorKey: 'no_of_albums_released',
				header: 'No of Albums Released',
			},
			{
				accessorKey: 'gender',
				header: 'Gender',
			},
			{
				header: 'Actions',
				cell: ({ row }) => <ArtistActions data={row.original} />,
			},
		],
		[]
	)

	return (
		<DataTable
			columns={columns}
			data={data?.payload ?? []}
			title='Artist Dashboard'
			pagination={data?.pagination}
			headerSection={
				<CanI task='create'>
					<ArtistAdd />
				</CanI>
			}
		/>
	)
}
