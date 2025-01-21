import { fontRoboto } from '@/shared/configs/font'
import { QueryProvider } from '@/shared/providers/query-provider'
import '@/shared/styles/global.css'
import { Toaster } from '@/shared/ui/toaster'
import { cn } from '@/shared/utils/cva'
import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
	themeColor: [
		{
			media: '(prefers-color-scheme: dark)',
			color: 'white',
		},
		{
			media: '(prefers-color-scheme: light)',
			color: 'black',
		},
	],
}

export const metadata: Metadata = {
	title: {
		default: 'Cloco Task',
		template: '%s | Cloco Task',
	},
	description: 'Cloco Task',
}

// biome-ignore lint/style/noDefaultExport: This is a nextjs convention
export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<head />
			<body
				className={cn(
					'font-roboto max-w-vw min-h-svh h-auto bg-background',
					fontRoboto.variable
				)}>
				<QueryProvider>{children}</QueryProvider>
				<Toaster />
			</body>
		</html>
	)
}
