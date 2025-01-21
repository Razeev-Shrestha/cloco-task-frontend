'use client'

import { useMemo } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { useGetUsersService } from '../_services'
import type { UserType } from '../_schemas'
import { DataTable } from '@/shared/ui/data-table'
import { format } from 'date-fns'
import { UserActions } from './user-actions'
import { UserAdd } from './user-add'
import { CanI } from '@/shared/providers/permission-provider'

export const UserDashboard = () => {
	const { data } = useGetUsersService()

	const columns = useMemo<ColumnDef<UserType>[]>(
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
				accessorKey: 'phone',
				header: 'Phone',
			},
			{
				cell: ({ row }) => <>{format(row.original.dob, 'yyyy-MM-dd')}</>,
				header: 'Date Of Birth',
			},
			{
				header: 'Actions',
				cell: ({ row }) => <UserActions data={row.original} />,
			},
		],
		[]
	)

	return (
		<DataTable
			columns={columns}
			data={data?.payload ?? []}
			title='User Dashboard'
			pagination={data?.pagination}
			headerSection={
				<CanI task='create'>
					<UserAdd />
				</CanI>
			}
		/>
	)
}
