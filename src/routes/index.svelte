<script>
	import { lang } from './language.ts';
	import products from './products.json';
</script>

<section class="text-gray-600 body-font min-h-screen bg-[url('/static/bg.jpg')] bg-fixed bg-cover">
	<div class="container px-5 py-24 mx-auto">
		<div class="flex flex-wrap -m-4">
			{#each Object.entries(products) as [id, product] (id)}
				<div class="lg:w-1/4 md:w-1/3 sm:w-1/2 p-4 w-full">
					<a
						class="block rounded-lg bg-white drop-shadow-md overflow-hidden duration-200 hover:scale-105 hover:drop-shadow-xl"
						href="./product/{id}"
					>
						<img
							alt="Preview"
							class="sm:h-48 h-80 overflow-hidden object-cover object-center w-full"
							src="data:image/jpeg;base64,{product.previews[0]}"
						/>
						<h2 class="p-4 text-gray-900 title-font text-lg font-medium text-center">
							{product.title[$lang]}
						</h2>
					</a>
				</div>
			{/each}
		</div>
	</div>
</section>
