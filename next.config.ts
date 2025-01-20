import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
	},

	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
		tsconfigPath: './tsconfig.json',
	},
	logging: {
		fetches: {
			hmrRefreshes: true,
			fullUrl: true,
		},
	},
}

// biome-ignore lint/style/noDefaultExport: This is a configuration file, so it must be the default export
export default nextConfig
