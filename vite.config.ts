import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		dts({
			insertTypesEntry: true,
		}),
	],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/lib/index.tsx'),
			name: 'MyLib',
			formats: ['es', 'umd'],
			fileName: (format) => `my-lib.${format}.js`,
		},
		rollupOptions: {
			external: ['react', 'react-dom', 'styled-components'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
					'styled-components': 'styled',
				},
			},
		},
	},
})
