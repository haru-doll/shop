<script>
	import { lang } from './language.ts';
	import products from './products.json';
</script>

<section class="text-gray-600 bg-white body-font">
	<div class="container px-5 py-24 mx-auto">
		<div class="flex flex-wrap -m-4">
			{#each Object.entries(products) as [id, product] (id)}
				<div class="lg:w-1/4 md:w-1/2 p-4 w-full duration-200 hover:scale-105 hover:drop-shadow-xl">
					<!-- TODO -->
					<button class="block relative h-48 rounded overflow-hidden">
						<img
							alt="Preview"
							class="object-cover object-center w-full h-full block"
							src="data:image/jpeg;base64,{product.previews[0]}"
						/>
					</button>
					<div class="mt-4">
						<h2 class="text-gray-900 title-font text-lg font-medium">{product.title[$lang]}</h2>
						<p class="mt-1">
							{product.products[0].price[$lang]}
							{#if $lang === 'vn'}K{:else}USD{/if}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
