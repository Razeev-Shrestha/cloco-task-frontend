import { LoaderCircle, type LucideProps } from 'lucide-react'
import { cn } from '../utils/cva'

export const Spinner = (props: LucideProps) => {
	return <LoaderCircle {...props} className={cn('animate-spin', props.className)} />
}
