import Link from 'next/link'
import { Login } from '../_components/login'
import { AuthLayoutWrapper } from '../_layouts/layout-wrapper'

export const metadata = {
	title: 'Login',
}

// biome-ignore lint/style/noDefaultExport: This is a page component, so it should be a default export
export default function Page() {
	return (
		<AuthLayoutWrapper
			title='Login'
			description='Enter your email and password to access your account.'
			footer={
				<p className='text-sm text-muted-foreground'>
					Don't have an account?{' '}
					<Link href='/register' className='text-primary hover:underline'>
						Register
					</Link>
				</p>
			}>
			<Login />
		</AuthLayoutWrapper>
	)
}
