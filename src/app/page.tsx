import { redirect } from 'next/navigation'

// biome-ignore lint/style/noDefaultExport: This is a React component, so it must be the default export
export default function Page() {
	return redirect('/login')
}
