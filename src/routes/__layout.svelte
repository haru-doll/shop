<script>
    export const prerender = true;

	import '../app.css';
	import { base } from '$app/paths';

	import { lang } from './language.ts';

	const year = new Date().getFullYear();
</script>

<header class="text-gray-600 bg-slate-50 body-font drop-shadow-md">
	<div class="container mx-auto flex p-5 flex-row items-center title-font font-medium text-xl">
		<a class="flex items-center text-gray-900" href="{base}/">
			<img alt="Icon" src="/icon.png" class="w-10 h-10" />
			<span class="ml-3">Harudoll</span>
		</a>
		<button
			class="ml-auto text-sm"
			on:click={() => ($lang === 'vn' ? lang.set('en') : lang.set('vn'))}
			>[{#if $lang === 'vn'}EN{:else}VN{/if}]</button
		>
	</div>
</header>

<slot />

<footer class="text-gray-400 bg-gray-900 body-font">
	<div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
		<a
			class="flex title-font font-medium items-center md:justify-start justify-center text-white"
			href="{base}/"
		>
			<img alt="Logo" src="/logo.png" class="w-12 h-12" />
			<span class="ml-3 text-xl">Harudoll</span>
		</a>
		<p
			class="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4"
		>
			Since 2018 | &#169; Copyright 2021-{year}
		</p>
		<span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start text-gray-400">
			<a
				class="inline-flex items-center hover:text-white"
				href="https://www.facebook.com/harunchip.dolls"
				target="_blank"
			>
				<svg
					fill="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					class="w-5 h-5 mx-0.5"
					viewBox="0 0 24 24"
				>
					<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
				</svg>
				Facebook
			</a>
			<a
				class="ml-5 inline-flex items-center hover:text-white"
				href="https://twitter.com/Haru_dollstore"
				target="_blank"
			>
				<svg
					fill="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					class="w-5 h-5 mx-0.5"
					viewBox="0 0 24 24"
				>
					<path
						d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
					/>
				</svg>
				Twitter
			</a>
		</span>
	</div>
</footer>
