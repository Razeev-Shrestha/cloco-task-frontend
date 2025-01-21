import { SidebarProvider, SidebarTrigger } from '@/shared/ui/sidebar'
import { decodeToken } from '@/shared/utils/decode-token'
import { type Module, rolePermissions } from '@/shared/utils/roles-permissions'
import { cookies } from 'next/headers'
import { AppSideBar } from './_layouts/app-sidebar'
import { AppBreadcrumb } from './_layouts/app-breadcrumb'
import { RoleAndPermissionsProvider } from '@/shared/providers/permission-provider'

// biome-ignore lint/style/noDefaultExport: This is a layout component and it is supposed to be default exported
export default async function Layout({ children }: { children: React.ReactNode }) {
	const cookieStore = await cookies()

	const token = cookieStore.get('accessToken')?.value || ''

	const decodedToken = decodeToken(token)

	if (!decodedToken) {
		return null
	}

	const role = decodedToken.role_type
	const email = decodedToken.email

	const permissions = rolePermissions[role]

	const allowedRoutes = routes.map(route => ({
		...route,
		allowed: permissions[route.title].view,
	}))

	const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true'

	return (
		<SidebarProvider defaultOpen={defaultOpen}>
			<RoleAndPermissionsProvider role={role}>
				<AppSideBar routes={allowedRoutes} info={{ email }} />
				<main className='w-full h-full'>
					<div className='flex items-center'>
						<SidebarTrigger />
						<AppBreadcrumb />
					</div>
					{children}
				</main>
			</RoleAndPermissionsProvider>
		</SidebarProvider>
	)
}

const routes: { title: Module; link: string }[] = [
	{ title: 'users', link: '/dashboard/users' },
	{ title: 'artists', link: '/dashboard/artists' },
]
