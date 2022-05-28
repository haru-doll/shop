<script>
	import { lang } from './language.ts';
	import Carousel from '@beyonk/svelte-carousel';

	import { page } from '$app/stores';
	import datas from './products.json';
	const data = datas[$page.params.id];

	let orderData = {};
	data.products.map((product) => {
		if (product.quantity > 0) orderData[product.name['en']] = 0;
	});

	let errorEmail = false;
	let errorName = false;
	let errorLink = false;

	function order(e) {
		// TODO orderData
		console.log(
			Object.entries(orderData).filter((product) => {
				false;
			})
		);

		const formData = new FormData(e.target);

		const orderEmail = formData.get('email');
		const orderLink = formData.get('link');
		const orderName = formData.get('name');
		const orderNote = formData.get('note');

		errorEmail = orderEmail ? false : true;
		errorName = orderName ? false : true;
		errorLink = orderLink ? false : true;

		if (errorEmail || errorName || errorLink) return;

		console.log(orderEmail, orderName, orderLink, orderNote, orderData);
		// TODO
	}
</script>

<svelte:head>
	<title>Harudoll - {data.title[$lang]}</title>
</svelte:head>

<section class="text-gray-600 body-font overflow-hidden">
	<div class="container px-5 py-24 mx-auto">
		<div class="lg:w-4/5 mx-auto flex flex-wrap">
			<div class="md:w-1/2 w-full overflow-hidden">
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
			<div class="md:w-1/2 w-full md:pl-10 md:py-6 mt-6 md:mt-0">
				<h1 class="mb-4 text-gray-900 text-3xl title-font font-medium">{data.title[$lang]}</h1>
				<p class="leading-relaxed mb-1 pb-5 border-b-2 border-gray-200 text-justify">
					{data.description[$lang]}
				</p>
				{#each data.products as product}
					<div class="flex items-center">
						<span class="font-medium text-lg my-4">
							<span class={product.quantity <= 0 ? 'line-through opacity-50' : ''}>
								{product.name[$lang]}:
								<span class="text-gray-900"
									>{product.price[$lang]}
									{#if $lang === 'vn'}K{:else}USD{/if}</span
								>
							</span>
							{#if product.quantity > 0}
								<sup
									>{#if $lang === 'vn'}Còn {product.quantity} cái{:else}{product.quantity} left{/if}</sup
								>
							{:else if product.quantity <= 0}
								<sup
									>{#if $lang === 'vn'}Hết hàng{:else}Out of stock{/if}</sup
								>
							{/if}
						</span>
						{#if product.quantity > 0}
							<input
								class="ml-auto w-20 bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-2 transition-colors duration-200 ease-in-out font-mono"
								type="number"
								bind:value={orderData[product.name['en']]}
								min="0"
								max={product.quantity}
							/>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

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
		<form
			class="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md"
			on:submit|preventDefault={order}
		>
			<div class="relative mb-4">
				<label for="email" class="leading-7 text-sm text-gray-600">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					placeholder={$lang === 'vn' ? 'diachi@email.com' : 'your@email.com'}
					class="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out {errorEmail
						? 'border-red-500'
						: ''}"
				/>
			</div>
			<div class="relative mb-4">
				<label for="name" class="leading-7 text-sm text-gray-600"
					>{#if $lang === 'vn'}Tên Facebook hoặc Twitter{:else}Twitter or Facebook username{/if}</label
				>
				<input
					type="text"
					id="name"
					name="name"
					placeholder={$lang === 'vn' ? 'Tên' : 'Username'}
					class="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out {errorName
						? 'border-red-500'
						: ''}"
				/>
			</div>
			<div class="relative mb-4">
				<label for="contract" class="leading-7 text-sm text-gray-600"
					>{#if $lang === 'vn'}Link Facebook hoặc Twitter{:else}Twitter or Facebook url{/if}</label
				>
				<input
					type="text"
					id="link"
					name="link"
					placeholder={$lang === 'vn'
						? 'https://www.facebook.com/profile_url'
						: 'https://twitter.com/profile_url'}
					class="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out {errorLink
						? 'border-red-500'
						: ''}"
				/>
			</div>
			<div class="relative mb-2">
				<label for="message" class="leading-7 text-sm text-gray-600"
					>{#if $lang === 'vn'}Ghi chú{:else}Note{/if}</label
				>
				<textarea
					id="note"
					name="note"
					placeholder={$lang === 'vn' ? 'Ghi chú gì đó đến Haru...' : 'Note something to Haru...'}
					class="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-yellow-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
				/>
			</div>
			<p
				class="text-xs text-red-500 my-2 {errorEmail || errorName || errorLink ? '' : 'invisible'}"
			>
				{#if $lang === 'vn'}Hãy nhập đầy đủ thông tin{:else}Please fill the requirement information{/if}!
			</p>
			<button
				class="text-orange-50 bg-orange-400 border-0 py-2 px-6 hover:bg-orange-500 rounded text-lg"
				type="submit">Order</button
			>
		</form>
	</div>
</section>
