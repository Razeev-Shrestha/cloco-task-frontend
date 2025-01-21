'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/shared/ui/sidebar'
import type { Module } from '@/shared/utils/roles-permissions'
import { ChevronUp, User2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { onSignOutAction } from './actions/sign-out'

interface AppSideBarProps {
	routes: { title: Module; link: string; allowed: boolean }[]
	info: {
		email: string
	}
}

export const AppSideBar = ({ routes, info }: AppSideBarProps) => {
	const pathname = usePathname()

	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Dashboard</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{routes.map(route => {
								if (!route.allowed) return null
								return (
									<SidebarMenuItem key={route.title}>
										<SidebarMenuButton asChild isActive={pathname.includes(route.link)}>
											<Link href={route.link}>
												<span className='capitalize'>{route.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								)
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton>
									<User2 /> {info.email}
									<ChevronUp className='ml-auto' />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent side='top' className='w-[--radix-popper-anchor-width]'>
								<DropdownMenuItem className='cursor-pointer' onSelect={onSignOutAction}>
									<span>Sign out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	)
}
