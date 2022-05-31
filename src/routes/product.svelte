<script>
	import { lang } from './language.ts';

	import Carousel from '@beyonk/svelte-carousel';

	import { page } from '$app/stores';
	import datas from '$lib/products.json';
	const data = datas[$page.url.searchParams.get('p')];

	let orderData = {};
	data.products.map((product) => {
		if (product.quantity !== 0) orderData[product.name['en']] = 0;
	});

	import { userEmail, userLink, userName } from './user.ts';

	let errorProduct = false;
	let errorEmail = false;
	let errorName = false;
	let errorLink = false;

	import { goto } from '$app/navigation';

	function order(e) {
		let orderProduct = [];
		let orderProductEn = [];
		let orderProductVn = [];
		let orderTotalEn = 0;
		let orderTotalVn = 0;
		data.products.forEach((product) => {
			if (product.quantity === 0) return;
			if (orderData[product.name['en']] <= 0) return;
			if (product.quantity > 0 && orderData[product.name['en']] > product.quantity) return;

			const priceEn = product.price['en'] * orderData[product.name['en']];
			const priceVn = product.price['vn'] * orderData[product.name['en']];

			orderTotalEn += priceEn;
			orderTotalVn += priceVn;

			orderProduct.push(`- [${orderData[product.name['en']]}] ${product.name['vn']}`);
			orderProductEn.push(
				`- [${orderData[product.name['en']]}] ${product.name['en']}: ${priceEn}$`
			);
			orderProductVn.push(
				`- [${orderData[product.name['en']]}] ${product.name['vn']}: ${priceVn}K`
			);
		});

		if (orderProduct.length === 0) {
			errorProduct = true;
			return;
		} else {
			errorProduct = false;
			orderProduct = encodeURIComponent(orderProduct.join('\n'));
			orderProductEn = encodeURIComponent(orderProductEn.join('\n'));
			orderProductVn = encodeURIComponent(orderProductVn.join('\n'));
		}

		const formData = new FormData(e.target);

		const orderId = Math.random().toString(16).substr(2, 14).toUpperCase();
		const orderEmail = encodeURIComponent(formData.get('email'));
		const orderName = encodeURIComponent(formData.get('name'));
		const orderLink = encodeURIComponent(formData.get('link'));
		const orderNote = encodeURIComponent(formData.get('note'));

		errorEmail = orderEmail ? false : true;
		errorName = orderName ? false : true;
		errorLink = orderLink ? false : true;

		if (errorEmail || errorName || errorLink) return;

		fetch(
			`https://docs.google.com/forms/d/e/1FAIpQLScXOsHyCm9gW9-nOIzde2AIij95q2x9sDEq3CeNQ_HMbvqckg/formResponse?usp=pp_url&entry.808773888=${orderId}&entry.1131766263=${orderEmail}&entry.1660022003=${orderName}&entry.1537890040=${orderLink}&entry.26021768=${orderNote}&entry.1092599865=${orderProduct}&submit=Submit`
		);

		const billInfo = encodeURIComponent(
			btoa(
				JSON.stringify({
					id: orderId,
					name: orderName,
					product: {
						en: orderProductEn,
						vn: orderProductVn
					},
					total: {
						en: orderTotalEn,
						vn: orderTotalVn
					}
				})
			)
		);
		goto(`/bill?b=${billInfo}`);
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
			<div class="md:w-1/2 w-full md:pl-10 md:py-4 mt-4 md:mt-0">
				<h1 class="text-gray-900 text-3xl title-font font-medium">{data.title[$lang]}</h1>
				<div class="flex my-2 origin-left scale-75">
					<script async src="https://static.addtoany.com/menu/page.js"></script>
					<div
						class="a2a_kit a2a_kit_size_32 a2a_default_style"
						data-a2a-icon-color="transparent,#9CA3AF"
					>
						<a class="a2a_button_copy_link" />
						<a class="a2a_button_facebook" />
						<a class="a2a_button_twitter" />
						<a class="a2a_button_pinterest" />
						<a class="a2a_dd" href="https://www.addtoany.com/share" />
					</div>
				</div>
				<p class="leading-relaxed mb-1 pb-5 border-b-2 border-gray-200 text-justify">
					{data.description[$lang]}
				</p>
				{#each data.products as product}
					<div class="flex items-center">
						<span class="font-medium text-lg my-4">
							<span class={product.quantity === 0 ? 'line-through opacity-50' : ''}>
								{product.name[$lang]}:
								<span class="text-gray-900"
									>{product.price[$lang]}
									{#if $lang === 'vn'}K{:else}USD{/if}</span
								>
							</span>
							{#if product.quantity === 0}
								<sup
									>{#if $lang === 'vn'}Hết hàng{:else}Out of stock{/if}</sup
								>
							{:else if product.quantity > 0}
								<sup
									>{#if $lang === 'vn'}Còn {product.quantity} cái{:else}{product.quantity} left{/if}</sup
								>
							{/if}
						</span>
						{#if product.quantity !== 0}
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
					bind:value={$userEmail}
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
					bind:value={$userName}
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
					bind:value={$userLink}
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
				class="text-xs text-red-500 my-2 {errorProduct || errorEmail || errorName || errorLink
					? ''
					: 'invisible'}"
			>
				{#if errorProduct}
					{#if $lang === 'vn'}Hãy order ít nhất một sản phẩm{:else}Please order at least one product{/if}!
				{:else}
					{#if $lang === 'vn'}Hãy nhập đầy đủ thông tin{:else}Please fill the requirement
						information{/if}!
				{/if}
			</p>
			<button
				class="text-orange-50 bg-orange-400 border-0 py-2 px-6 hover:bg-orange-500 rounded text-lg"
				type="submit">Order</button
			>
		</form>
	</div>
</section>
