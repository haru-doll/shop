<script>
	import { lang } from '../language.ts';
	import Carousel from '@beyonk/svelte-carousel';

	import datas from '../products.json';
	import { page } from '$app/stores';
	const data = datas[$page.params.id];

	let orderMenu = false;

	function order() {
		console.log("foo");
	}
</script>

<section class="text-gray-600 body-font overflow-hidden">
	<div class="container px-5 py-24 mx-auto">
		<div class="lg:w-4/5 mx-auto flex flex-wrap">
			<div class="lg:w-1/2 w-full aspect-34 overflow-hidden">
				<Carousel perPage={1} duration={500}>
					{#each data.previews as preview}
						<a href="data:image/jpeg;base64,{preview}" target="_blank">
							<img
								alt="Preview"
								class="aspect-34 h-auto w-full object-cover object-center rounded-lg"
								src="data:image/jpeg;base64,{preview}"
							/>
						</a>
					{/each}
				</Carousel>
			</div>
			<div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
				<h1 class="mb-4 text-gray-900 text-3xl title-font font-medium">{data.title[$lang]}</h1>
				<p class="leading-relaxed mb-1 pb-5 border-b-2 border-gray-200 text-justify">
					{data.description[$lang]}
				</p>
				{#each data.products as product}
					<div class="flex items-center">
						<span class="font-medium text-lg my-4">
							<span class={product.quantity === 0 ? 'line-through opacity-50' : ''}>
								{product.name[$lang]}:
								<span class="text-gray-900">{product.price[$lang]} {#if $lang === 'vn'}K{:else}USD{/if}</span>
							</span>
							{#if product.quantity > 0}
								<sup>{#if $lang === 'vn'}Còn {product.quantity} cái{:else}{product.quantity} left{/if}</sup>
							{:else if product.quantity === 0}
								<sup>{#if $lang === 'vn'}Hết hàng{:else}Out of stock{/if}</sup>
							{/if}
						</span>
						{#if product.quantity !== 0}
							<input class="ml-auto w-20 bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-2 transition-colors duration-200 ease-in-out font-mono" type="number" min="0" />
						{/if}
					</div>
				{/each}
				{#if !orderMenu}
					<button
						class="flex text-orange-50 bg-orange-400 border-0 my-8 px-4 py-2 text-xl hover:bg-orange-500 rounded"
						on:click="{() => orderMenu = true}"
						>Order</button
					>
				{/if}
			</div>
		</div>
	</div>
</section>

{#if orderMenu}
	<section class="text-gray-600 body-font relative">
		<div class="absolute inset-0 bg-gray-300">
			<iframe
				style="filter: grayscale(1) contrast(1.2) opacity(0.4);"
				marginheight="0"
				marginwidth="0"
				title="map"
				scrolling="no"
				src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=HaNoi&ie=UTF8&t=&z=7&iwloc=B&output=embed"
				width="100%"
				height="100%"
				frameborder="0"
			/>
		</div>
		<div class="container px-5 py-24 mx-auto flex">
			<div
				class="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md"
			>
				<div class="relative mb-4">
					<label for="email" class="leading-7 text-sm text-gray-600">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="name@email.com"
						class="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
						autofocus
					/>
				</div>
				<div class="relative mb-4">
					<label for="contract" class="leading-7 text-sm text-gray-600"
						>Link Facebook / Twitter</label
					>
					<input
						type="text"
						id="email"
						name="contract"
						placeholder="@twitter_username"
						class="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
					/>
				</div>
				<div class="relative mb-4">
					<label for="message" class="leading-7 text-sm text-gray-600"
						>{#if $lang === 'vn'}Ghi chú{:else}Note{/if}</label
					>
					<textarea
						id="message"
						name="message"
						placeholder="Hello!"
						class="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-yellow-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
					/>
				</div>
				<button
					class="text-orange-50 bg-orange-400 border-0 py-2 px-6 hover:bg-orange-500 rounded text-lg"
					on:click={order}
					>Order</button
				>
				<p class="text-xs text-red-500 mt-3">TODO</p>
			</div>
		</div>
	</section>
{/if}
