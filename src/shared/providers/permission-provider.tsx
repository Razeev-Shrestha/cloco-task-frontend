'use client'

import { createContext, use, useMemo } from 'react'
import {
	type Module,
	rolePermissions,
	type Role,
	type RolePermission,
	type Permission,
} from '../utils/roles-permissions'
import { usePathname } from 'next/navigation'

type RoleAndPermissionsContextType = {
	role: Role
	permissions: RolePermission[Role][Module]
}

const RoleAndPermissionsContext = createContext<null | RoleAndPermissionsContextType>(null)

export const RoleAndPermissionsProvider = ({
	children,
	role,
}: {
	children: React.ReactNode
	role: Role
}) => {
	const pathname = usePathname()

	const module = pathname.includes('songs')
		? 'songs'
		: (pathname
				.split('/')
				.filter(Boolean)
				.filter(path => !Number(path))[1] as Module)

	const rolesAndPermissions = useMemo(
		() => ({
			role,
			permissions: rolePermissions[role][module],
		}),
		[role, module]
	)

	return (
		<RoleAndPermissionsContext.Provider value={rolesAndPermissions}>
			{children}
		</RoleAndPermissionsContext.Provider>
	)
}

export const useRoleAndPermissions = () => {
	const context = use(RoleAndPermissionsContext)
	if (!context) {
		throw new Error('useRoleAndPermissions must be used within a RoleAndPermissionsProvider')
	}
	return context
}

export const CanI = ({
	children,
	task,
	module,
}: { children: React.ReactNode; task: Permission; module?: Module }) => {
	const { permissions, role } = useRoleAndPermissions()

	if (permissions[task]) {
		return children
	}
	return null
}
