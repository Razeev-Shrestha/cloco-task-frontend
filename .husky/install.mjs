if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
	process.exit(0)
}
;(await import('husky')).default
