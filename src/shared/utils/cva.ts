import { defineConfig } from 'cva'
import { twMerge } from 'tailwind-merge'

export const {
	compose,
	cva,
	cx: cn,
} = defineConfig({
	hooks: {
		onComplete: className => twMerge(className),
	},
})
