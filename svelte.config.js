import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false,
			trailingSlash: 'always'
		}),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/shop' : ''
		},
		prerender: {
			default: true
		},
		appDir: 'internal'
	}
};

export default config;
