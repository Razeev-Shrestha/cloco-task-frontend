import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/shared/ui/card'

interface AuthLayoutWrapperProps {
	children: React.ReactNode
	title: string
	description: string
	footer: React.ReactNode
}

export const AuthLayoutWrapper = ({
	title,
	description,
	children,
	footer,
}: AuthLayoutWrapperProps) => {
	return (
		<Card className='w-full max-w-lg mx-auto'>
			<CardHeader>
				<CardTitle className='text-2xl font-bold'>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>{children}</CardContent>
			<CardFooter className='flex justify-center'>{footer}</CardFooter>
		</Card>
	)
}
