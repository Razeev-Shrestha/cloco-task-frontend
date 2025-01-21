// biome-ignore lint/style/noDefaultExport: This is a layout component, so it should be a default export
export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return <main className='h-svh max-w-svw grid place-content-center bg-gray-50'>{children}</main>
}
