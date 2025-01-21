import { ArtistDashboard } from './_components/artist-dashboard'

export const metadata = {
	title: 'Artists',
}
// biome-ignore lint/style/noDefaultExport: <explanation>
export default function Page() {
	return (
		<div className='p-4'>
			<ArtistDashboard />
		</div>
	)
}
