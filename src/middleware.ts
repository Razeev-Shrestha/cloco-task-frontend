import type { NextRequest } from 'next/server'

// biome-ignore lint/style/noDefaultExport: Configuration files need to have default exports
export default function middleware(request: NextRequest) {}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}
