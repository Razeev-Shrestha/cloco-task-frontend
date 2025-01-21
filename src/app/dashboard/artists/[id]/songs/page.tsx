import { SongsDashboard } from '../_components/songs-dashboard'

export const metadata = {
	title: 'Songs',
}

// biome-ignore lint/style/noDefaultExport: <explanation>
export default function Page() {
	return (
		<div className='p-4'>
			<SongsDashboard />
		</div>
	)
}
