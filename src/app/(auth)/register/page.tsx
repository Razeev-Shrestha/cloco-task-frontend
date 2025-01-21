import Link from 'next/link'
import { AuthLayoutWrapper } from '../_layouts/layout-wrapper'
import { Register } from '../_components/register'

// biome-ignore lint/style/noDefaultExport: This is a page component, so it should be a default export
export default function Page() {
	return (
		<AuthLayoutWrapper
			title='Register'
			description='Fill up the form to register your account.'
			footer={
				<p className='text-sm text-muted-foreground'>
					Already have an account?{' '}
					<Link href={'/login'} className='text-primary hover:underline'>
						Login
					</Link>
				</p>
			}>
			<Register />
		</AuthLayoutWrapper>
	)
}
