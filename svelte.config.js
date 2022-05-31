import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	trailingSlash: 'always',
	preprocess: preprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null
		}),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/shop' : ''
		}
	}
};

export default config;
