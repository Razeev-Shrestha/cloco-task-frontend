import { useCSVUpload } from '@/shared/hooks/use-csv-upload'
import type { DisclosureProps } from '@/shared/hooks/use-disclosure'
import { useDropzone } from 'react-dropzone'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/shared/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion'
import { ScrollArea } from '@/shared/ui/scroll-area'
import { Button } from '@/shared/ui/button'
import { useCreateArtistService } from '../_services'
import { Spinner } from '@/shared/components/spinner'
import { useToast } from '@/shared/hooks/use-toast'
import { useQueryClient } from '@tanstack/react-query'

interface UploadCsvDialogProps {
	disclosure: DisclosureProps
}

const requiredFields = [
	'first_name',
	'last_name',
	'email',
	'first_release_year',
	'no_of_albums_released',
]

export const UploadCsvDialog = ({ disclosure }: UploadCsvDialogProps) => {
	const { file, csvData, validationErrors, onDrop, onCancel } = useCSVUpload(requiredFields)
	const { mutate, isPending } = useCreateArtistService()
	const { toast } = useToast()

	const queryClient = useQueryClient()

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'text/csv': ['.csv'],
		},
		maxSize: 10 * 1024 * 1024,
	})

	const handleUpload = async () => {
		if (!csvData || csvData.length === 0) {
			console.error('No data to upload')
			return
		}

		const newCsvData = csvData.map(data => ({
			...data,
			first_release_year: Number(data.first_release_year),
			no_of_albums_released: Number(data.no_of_albums_released),
		}))

		try {
			const promises = newCsvData.map(
				data =>
					new Promise((resolve, reject) => {
						mutate(data, {
							onSuccess: response => resolve(response),
							onError: error => reject(error),
						})
					})
			)

			await Promise.all(promises)
			toast({
				description: 'Data uploaded successfully',
			})
			queryClient.invalidateQueries({
				predicate: query => query.queryKey[0] === '__ARTISTS__',
			})
			onCancel()
			disclosure.onClose()
		} catch (error) {
			toast({
				description: 'Failed to upload data',
				variant: 'destructive',
			})
		}
	}

	return (
		<>
			<Dialog open={disclosure.isOpen} onOpenChange={disclosure.onToggle}>
				<DialogContent className='sm:max-w-[90vw] sm:h-[80vh] flex flex-col'>
					<DialogHeader>
						<DialogTitle>Upload and Preview CSV File</DialogTitle>
						<DialogDescription>
							Drag and drop your CSV file or click to select. Required fields:{' '}
							{requiredFields.join(', ')}
						</DialogDescription>
					</DialogHeader>
					<div className='flex flex-col items-start w-full gap-6'>
						<div className='flex flex-col w-full items-center h-40'>
							<div
								{...getRootProps()}
								className={`flex-1 w-full p-4 border-2 border-dashed rounded-md text-center cursor-pointer flex items-center justify-center ${
									isDragActive ? 'border-primary' : 'border-muted-foreground'
								}`}>
								<input {...getInputProps()} />
								{file ? (
									<p className='text-sm text-muted-foreground'>
										File uploaded: {file.name}
									</p>
								) : (
									<p className='text-sm text-muted-foreground'>
										{isDragActive
											? 'Drop the file here'
											: "Drag 'n' drop a CSV file here, or click to select one"}
									</p>
								)}
							</div>
							{validationErrors.length > 0 && (
								<div className='mt-4'>
									<h3 className='text-lg font-semibold mb-2'>Validation Errors</h3>
									<ScrollArea className='h-[200px]'>
										<Accordion type='single' collapsible className='w-full'>
											{validationErrors.map((error, index) => (
												<AccordionItem key={error.row} value={`error-${index}`}>
													<AccordionTrigger>
														Row {error.row}: {error.errors.length} error(s)
													</AccordionTrigger>
													<AccordionContent>
														<ul className='list-disc list-inside'>
															{error.errors.map((err, errIndex) => (
																<li key={err}>{err}</li>
															))}
														</ul>
													</AccordionContent>
												</AccordionItem>
											))}
										</Accordion>
									</ScrollArea>
								</div>
							)}
						</div>
						<div className='w-full h-[24rem]'>
							<h3 className='text-lg font-semibold mb-2'>CSV Data Preview</h3>
							<ScrollArea className='h-[calc(100%_-_2rem)] overflow-auto'>
								{csvData && csvData.length > 0 ? (
									<Table className='overflow-x-auto'>
										<TableHeader>
											<TableRow>
												{Object.keys(csvData[0]).map(header => (
													<TableHead key={header}>{header}</TableHead>
												))}
											</TableRow>
										</TableHeader>
										<TableBody>
											{csvData.map((row, index) => (
												<TableRow key={index}>
													{Object.values(row).map((cell: any, cellIndex) => (
														<TableCell key={cellIndex}>{cell}</TableCell>
													))}
												</TableRow>
											))}
										</TableBody>
									</Table>
								) : (
									<p className='text-center text-muted-foreground'>No data to display</p>
								)}
							</ScrollArea>
						</div>
					</div>
					<DialogFooter className='pt-4'>
						<Button
							variant={'outline'}
							onClick={() => {
								onCancel()
								disclosure.onClose()
							}}>
							Cancel
						</Button>
						<Button disabled={isPending} onClick={handleUpload}>
							{isPending ? <Spinner /> : 'Upload'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}
