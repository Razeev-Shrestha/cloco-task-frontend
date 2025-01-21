import {} from '@tanstack/react-query'
import { UserDashboard } from './_components/user-dashboard'

export const metadata = {
	title: 'Users',
}

// biome-ignore lint/style/noDefaultExport: <explanation>
export default async function Page() {
	return (
		<div className='p-4'>
			<UserDashboard />
		</div>
	)
}
