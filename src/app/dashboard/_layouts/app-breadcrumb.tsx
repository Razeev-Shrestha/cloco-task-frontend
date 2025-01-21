'use client'

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

export const AppBreadcrumb = () => {
	const pathname = usePathname()

	const splitPaths = pathname.split('/').filter(Boolean)

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{splitPaths.map((path, index) => (
					<Fragment key={path}>
						<BreadcrumbItem key={path}>
							<BreadcrumbLink className='capitalize'>{path}</BreadcrumbLink>
						</BreadcrumbItem>
						{index === splitPaths.length - 1 ? null : <BreadcrumbSeparator />}
					</Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	)
}
