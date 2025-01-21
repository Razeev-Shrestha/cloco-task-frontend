import { useState, useCallback } from 'react'
import Papa from 'papaparse'
import { useToast } from './use-toast'

interface ValidationError {
	row: number
	errors: string[]
}

export function useCSVUpload(requiredFields: string[]) {
	const [file, setFile] = useState<File | null>(null)
	const [csvData, setCSVData] = useState<any[] | null>(null)
	const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])
	const { toast } = useToast()

	const validateCSV = (data: any[]): ValidationError[] => {
		return data
			.map((row, index) => {
				const errors = requiredFields
					.filter(field => !row[field] || row[field].trim() === '')
					.map(field => `Missing ${field}`)
				return { row: index + 1, errors }
			})
			.filter(result => result.errors.length > 0)
	}

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const uploadedFile = acceptedFiles[0]
			if (uploadedFile.size > 10 * 1024 * 1024) {
				toast({
					title: 'Error',
					description: 'File size exceeds 10MB limit.',
					variant: 'destructive',
				})
				return
			}
			setFile(uploadedFile)

			Papa.parse(uploadedFile, {
				complete: result => {
					const parsedData = result.data as any[]
					setCSVData(parsedData)
					const errors = validateCSV(parsedData)
					setValidationErrors(errors)

					if (errors.length === 0) {
						toast({
							title: 'Success',
							description: 'File uploaded and validated successfully.',
						})
					} else {
						toast({
							title: 'Warning',
							description: `File uploaded with ${errors.length} validation errors.`,
							variant: 'destructive',
						})
					}
				},
				header: true,
				skipEmptyLines: true,
			})
		},
		[toast, requiredFields]
	)

	const onCancel = () => {
		setFile(null)
		setCSVData(null)
		setValidationErrors([])
	}

	return { file, csvData, validationErrors, onDrop, onCancel }
}
