import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import { decodeToken } from './shared/utils/decode-token'
import {} from './shared/utils/roles-permissions'

const unAuthorizedRoutes = ['/login', '/register']

// biome-ignore lint/style/noDefaultExport: Configuration files need to have default exports
export default async function middleware(request: NextRequest) {
	const currentPath = request.nextUrl.pathname
	const token = (await cookies()).get('accessToken')?.value

	if (!token) {
		if (!unAuthorizedRoutes.includes(currentPath)) {
			const redirectPath = '/login'

			return NextResponse.redirect(new URL(redirectPath, request.url).toString())
		}
	} else {
		if (unAuthorizedRoutes.includes(currentPath)) {
			const redirectPath = '/dashboard'

			return NextResponse.redirect(new URL(redirectPath, request.url).toString())
		}

		const decodedToken = decodeToken(token)

		if (!decodedToken) {
			const redirectPath = '/login'

			const response = NextResponse.redirect(new URL(redirectPath, request.url).toString())
			response.cookies.set('accessToken', '', { expires: new Date(0) })
			return response
		}
		const exp = decodedToken.exp

		if (Date.now() > exp * 1000) {
			const redirectPath = '/login'

			const response = NextResponse.redirect(new URL(redirectPath, request.url).toString())
			response.cookies.set('accessToken', '', { expires: new Date(0) })
			return response
		}

		const role = decodedToken.role_type

		if (currentPath === '/dashboard') {
			switch (role) {
				case 'super_admin': {
					const redirectPath = '/dashboard/users'

					return NextResponse.redirect(new URL(redirectPath, request.url).toString())
				}
				case 'artist_manager': {
					const redirectPath = '/dashboard/artists'

					return NextResponse.redirect(new URL(redirectPath, request.url).toString())
				}
				case 'artist': {
					const redirectPath = `/dashboard/artists/${decodedToken.id}/songs`

					return NextResponse.redirect(new URL(redirectPath, request.url).toString())
				}
				default: {
					const redirectPath = '/login'

					return NextResponse.redirect(new URL(redirectPath, request.url).toString())
				}
			}
		}

		if (role === 'artist') {
			if (currentPath === '/dashboard/artists' || currentPath === '/dashboard/users') {
				const redirectPath = `/dashboard/artists/${decodedToken.id}/songs`

				return NextResponse.redirect(new URL(redirectPath, request.url).toString())
			}
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}
