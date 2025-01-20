import { Roboto } from 'next/font/google'

export const fontRoboto = Roboto({
	weight: ['400', '700', '700'],
	adjustFontFallback: true,
	display: 'swap',
	fallback: ['sans-serif'],
	preload: true,
	style: 'normal',
	subsets: ['latin'],
	variable: '--font-roboto',
})
