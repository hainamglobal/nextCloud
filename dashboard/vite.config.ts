import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import frappeui from 'frappe-ui/vite';
import pluginRewriteAll from 'vite-plugin-rewrite-all';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { sentryVitePlugin } from '@sentry/vite-plugin';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const isProduction = mode === 'production';

	const plugins = [
		vue(),
		vueJsx(),
		pluginRewriteAll(),
		frappeui(),

		Components({
			dirs: [
				'src/components',
				'node_modules/frappe-ui/src/components'
			],
			resolvers: [IconsResolver()]
		}),

		Icons()
	];

	if (
		isProduction &&
		env.SENTRY_URL &&
		env.SENTRY_ORG &&
		env.SENTRY_PROJECT &&
		env.SENTRY_AUTH_TOKEN
	) {
		plugins.push(
			sentryVitePlugin({
				url: env.SENTRY_URL,
				org: env.SENTRY_ORG,
				project: env.SENTRY_PROJECT,
				applicationKey: 'press-dashboard',
				authToken: env.SENTRY_AUTH_TOKEN
			})
		);
	}

	return {
		plugins,

		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src')
			}
		},

		optimizeDeps: {
			include: ['feather-icons', 'showdown']
		},

		esbuild: {
			drop: isProduction ? ['console', 'debugger'] : []
		},

		build: {
			outDir: '../press/public/dashboard',
			emptyOutDir: true,

			sourcemap: false,

			target: 'es2015',

			rollupOptions: {
				input: {
					main: path.resolve(__dirname, 'index.html')
				}
			}
		},

		// @ts-ignore
		test: {
			globals: true,
			environment: 'jsdom',
			setupFiles: 'src/tests/setup/msw.js',
			coverage: {
				extension: ['.vue', '.js'],
				all: true
			}
		}
	};
});
