const roles = ['super_admin', 'artist_manager', 'artist'] as const

const permissions = ['create', 'read', 'update', 'delete', 'view'] as const

const modules = ['users', 'artists', 'songs'] as const

export type Role = (typeof roles)[number]
export type Permission = (typeof permissions)[number]
export type Module = (typeof modules)[number]

export type RolePermission = {
	[role in Role]: {
		[module in Module]: {
			[permission in Permission]: boolean
		}
	}
}

export const rolePermissions: RolePermission = {
	super_admin: {
		users: {
			create: true,
			read: true,
			update: true,
			delete: true,
			view: true,
		},
		artists: {
			create: false,
			read: true,
			update: false,
			delete: false,
			view: true,
		},
		songs: {
			create: false,
			read: true,
			update: false,
			delete: false,
			view: true,
		},
	},
	artist_manager: {
		users: {
			create: false,
			read: false,
			update: false,
			delete: false,
			view: false,
		},
		artists: {
			create: true,
			read: true,
			update: true,
			delete: true,
			view: true,
		},
		songs: {
			create: false,
			read: true,
			update: false,
			delete: false,
			view: true,
		},
	},
	artist: {
		users: {
			create: false,
			read: false,
			update: false,
			delete: false,
			view: false,
		},
		artists: {
			create: false,
			read: false,
			update: false,
			delete: false,
			view: false,
		},
		songs: {
			create: true,
			read: true,
			update: true,
			delete: true,
			view: true,
		},
	},
}
