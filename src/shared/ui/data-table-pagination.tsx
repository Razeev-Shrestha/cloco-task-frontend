'use client'
import type { Table } from '@tanstack/react-table'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from './button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { useSearchParams } from '../hooks/use-search-param'

interface DataTablePaginationProps<TData> {
	table: Table<TData>
	pagination:
		| {
				count: number
				page: number
				hasNext: boolean
				totalRows: number
				limit: number
		  }
		| undefined
}

export function DataTablePagination<TData>({ table, pagination }: DataTablePaginationProps<TData>) {
	const { setSearchParams, searchParams, removeSearchParams } = useSearchParams()

	if (!pagination) return null

	const { count, page, hasNext, totalRows, limit } = pagination

	const pageSize = Math.floor(totalRows / count)

	const onPageForward = () => {
		const oldPage = searchParams.has('page') ? searchParams.get('page') : 1
		setSearchParams({ page: Number(oldPage) + 1 })
	}

	const onPageBackward = () => {
		const oldPage = searchParams.has('page') ? searchParams.get('page') : 1
		setSearchParams({ page: Number(oldPage) - 1 })
	}

	const onLimitChange = (value: string) => {
		if (value === 'ALL') {
			removeSearchParams(['page'])
			return setSearchParams({ limit: -1 })
		}
		return setSearchParams({ limit: value })
	}

	return (
		<div className='flex items-center justify-between p-2'>
			<div className='flex items-center space-x-6 lg:space-x-8 ml-auto'>
				<div className='flex items-center space-x-2'>
					<p className='text-sm font-medium'>Rows per page</p>
					<Select
						defaultValue={searchParams.get('limit') ?? limit.toString()}
						onValueChange={onLimitChange}>
						<SelectTrigger className='h-8 w-[70px]'>
							<SelectValue placeholder={limit} />
						</SelectTrigger>
						<SelectContent side='top'>
							{[10, 20, 50, 'ALL'].map(pageSize => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className='flex w-[100px] items-center justify-center text-sm font-medium'>
					Page {page} of {pageSize}
				</div>
				<div className='flex items-center space-x-2'>
					<Button
						variant='outline'
						className='h-8 w-8 p-0'
						onClick={onPageBackward}
						disabled={page === 1}>
						<span className='sr-only'>Go to previous page</span>
						<ChevronLeft />
					</Button>
					<Button
						variant='outline'
						className='h-8 w-8 p-0'
						onClick={onPageForward}
						disabled={!hasNext}>
						<span className='sr-only'>Go to next page</span>
						<ChevronRight />
					</Button>
				</div>
			</div>
		</div>
	)
}
