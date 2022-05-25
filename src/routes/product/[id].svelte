<script>
	import { page } from '$app/stores';
	import Carousel from '@beyonk/svelte-carousel';
	import { cart } from '/src/routes/cart.ts';

	import datas from '/src/products.json';
	const data = datas[$page.params.id];

	const lang = 'en'; // TODO

	function addToCart() {
		cart.update((n) => {
			return { ...n, [$page.params.id]: 'foo' };
		});

		console.log($cart);
	}
</script>

<section class="min-h-screen text-gray-600 body-font overflow-hidden">
	<div class="container px-5 py-24 mx-auto">
		<div class="lg:w-4/5 mx-auto flex flex-wrap">
			<div class="lg:w-1/2 w-full rounded-lg overflow-hidden">
				<Carousel perPage={1} duration={500}>
					{#each data.previews as preview}
						<a href="data:image/jpeg;base64,{preview}" target="_blank">
							<img
								alt="Preview"
								class="aspect-square h-auto w-full object-cover object-center"
								src="data:image/jpeg;base64,{preview}"
							/>
						</a>
					{/each}
				</Carousel>
			</div>
			<div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
				<h1 class="mb-4 text-gray-900 text-3xl title-font font-medium">{data.title[lang]}</h1>
				<p class="leading-relaxed pb-5 border-b-2 border-gray-200 text-justify">
					{data.description[lang]}
				</p>
				{#each data.products as product}
					<div class="flex items-center my-5">
						<span class="font-medium text-lg">
							<span class={product.quantity === 0 ? 'line-through opacity-50' : ''}>
								{product.name[lang]}:
								<span class="text-gray-900">{product.price[lang]} USD</span>
							</span>
							{#if product.quantity > 0}
								<sup>{product.quantity} left</sup>
							{:else if product.quantity === 0}
								<sup>Out of stock</sup>
							{/if}
						</span>
						{#if product.quantity !== 0}
							<button
								class="flex ml-auto text-orange-50 bg-orange-400 border-0 p-2 hover:bg-orange-500 rounded"
								on:click={addToCart}>Add to Cart</button
							>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
