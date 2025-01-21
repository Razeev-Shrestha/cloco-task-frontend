import { useDisclosure } from '@/shared/hooks/use-disclosure'
import { Button } from '@/shared/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import {} from '@radix-ui/react-dropdown-menu'
import { UploadCsvDialog } from './upload-csv-dialog'
import { parseCookies } from 'nookies'

export const ArtistCsv = () => {
	const importCsvDisclosure = useDisclosure()

	const handleDownloadCsv = async () => {
		const token = parseCookies().accessToken
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/download`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		const blob = await response.blob()
		const url = window.URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = 'artists.csv'
		document.body.appendChild(a)
		a.click()
		window.URL.revokeObjectURL(url)
		document.body.removeChild(a)
	}

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant={'link'}>Import/Export CSV</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onClick={importCsvDisclosure.onOpen}>Import</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={handleDownloadCsv}>Export</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<UploadCsvDialog disclosure={importCsvDisclosure} />
		</>
	)
}
