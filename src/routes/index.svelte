<script>
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { lang } from './language.ts';
	import { userEmail, userLink, userName } from './user.ts';
	import products from '$lib/products.json';

	const paymentMethods = [
		{
			image: "https://i.imgur.com/lOiwYCc.jpg",
			name: 'techcombank',
			title: 'Techcombank',
			description:
				'11724489027011<br/>Chủ tài khoản: Nguyễn Minh Châu<br/>Chi nhánh: Hoàng Quốc Việt<br/>(Hoặc Hà Nội, hoặc hội sở chính)'
		},
		{
			image: "https://i.imgur.com/IgP5jz5.jpg",
			name: 'tpbank',
			title: 'TPbank',
			description:
				'00169156001<br/>Chủ tài khoản: Nguyễn Minh Châu<br/>Chi nhánh: Đống Đa<br/>(Hoặc Hà Nội, hoặc Hội sở chính)'
		},
		{ image: "https://i.imgur.com/4UrdItO.jpg", name: 'viettelpay', title: 'Viettel pay', description: '0376163497' },
		{ image: "https://i.imgur.com/c6Gsdv4.jpg", name: 'shopeepay', title: 'ShopeePay', description: 'Harudoll' },
		{ image: "https://i.imgur.com/2xJyHua.jpg", name: 'grabpay', title: 'Grab Pay (hoặc ví Moca)', description: '0376163497' }
	];

	let bill = {};
	let data = {};
	let preview = 0;
	let orderData = {};
	let errorProduct = false;
	let errorEmail = false;
	let errorName = false;
	let errorLink = false;

	if($page.url.searchParams.has('b')) {
		bill = JSON.parse(atob(decodeURIComponent($page.url.searchParams.get('b'))));
	} else if($page.url.searchParams.has('p')) {
		data = products[$page.url.searchParams.get('p')];

		data.products.map((product) => {
			if (product.quantity !== 0) orderData[product.name['en']] = 0;
		});
	}

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

		// FIXME
		// fetch(
		// 	`https://docs.google.com/forms/d/e/1FAIpQLScXOsHyCm9gW9-nOIzde2AIij95q2x9sDEq3CeNQ_HMbvqckg/formResponse?usp=pp_url&entry.808773888=${orderId}&entry.1131766263=${orderEmail}&entry.1660022003=${orderName}&entry.1537890040=${orderLink}&entry.26021768=${orderNote}&entry.1092599865=${orderProduct}&submit=Submit`
		// );

		let xhr = new XMLHttpRequest();
		xhr.open("post", `https://docs.google.com/forms/d/e/1FAIpQLScXOsHyCm9gW9-nOIzde2AIij95q2x9sDEq3CeNQ_HMbvqckg/formResponse?usp=pp_url&entry.808773888=${orderId}&entry.1131766263=${orderEmail}&entry.1660022003=${orderName}&entry.1537890040=${orderLink}&entry.26021768=${orderNote}&entry.1092599865=${orderProduct}&submit=Submit`, true);
		xhr.send();

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
		window.location.assign(`?b=${billInfo}`);
	}
</script>

<svelte:head>
	<title>Harudoll</title>
</svelte:head>

{#if $page.url.searchParams.has('b')}

<section class="text-gray-600 body-font">
	<div class="container px-5 py-16 mx-auto flex flex-col items-center">
		<h1 class="my-16 title-font sm:text-4xl text-3xl w-full text-center font-medium text-gray-900">
			{#if $lang === 'vn'}
				Cảm ơn vì đã đặt hàng!
			{:else}
				Thank you for your order!
			{/if}
		</h1>
		<p class="mb-8">
			{#if $lang === 'vn'}Đây là hoá đơn của bạn{:else}Here is your bill{/if}:
		</p>
		<div
			class="sm:w-96 w-80 sm:px-6 px-4 py-10 bg-gray-200 rounded drop-shadow-lg font-mono whitespace-pre-line overflow-x-auto"
		>
			<p>ID: {bill.id}</p>
			<p class="mt-2 mb-8 leading-none whitespace-pre">
				█ █ █▀█ █▀█ █ █ █▀▄ █▀█ █  █<br />█▀█ █▀█ █▀▄ █▄█ █▄▀ █▄█ █▄ █▄
			</p>
			<p>
				{#if $lang === 'vn'}Khách hàng{:else}Customer{/if}: {decodeURIComponent(bill.name)}
			</p>
			<p>{decodeURIComponent(bill.product[$lang])}</p>
			<p>-----------------------------</p>
			<p class="font-bold">
				{#if $lang === 'vn'}Tổng tiền{:else}Total{/if}: {bill.total[
					$lang
				]}{#if $lang === 'vn'}K{:else}${/if}
			</p>
			<p class="italic">
				{#if $lang === 'vn'}Chưa bao gồm phí ship{:else}Shipping fee is not included{/if}.
			</p>
		</div>
	</div>
</section>

<section class="text-gray-600 body-font min-h-screen">
	{#if $lang === 'vn'}
		<div class="container px-5 py-24 mx-auto">
			<div class="flex flex-col text-center w-full mb-12">
				<p class="lg:w-2/3 mx-auto mb-4 leading-relaxed text-base">
					Sau khi tạo đơn hàng và nhận được mail xác nhận, các bạn chuyển khoản tới một trong các
					ngân hàng dưới đây, sau đó báo lại cho mình biết nhé!
				</p>
				<p class="lg:w-2/3 mx-auto mb-4 leading-relaxed text-base">
					Nội dung chuyển khoản ghi mã đơn hàng hoặc <span class="font-mono"
						>[Tên_facebook] [Tên_doll]</span
					>.
				</p>
				<p class="lg:w-2/3 mx-auto leading-relaxed text-base italic">
					Ví dụ: Châu Nguyễn doll Haru Hae.
				</p>
			</div>
			<div class="container flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
				{#each paymentMethods as paymentMethod (paymentMethod.name)}
					<div class="p-4 md:w-1/2 lg:w-1/3 sm:mb-0 mb-6">
						<div class="rounded-lg overflow-hidden">
							<img
								alt={paymentMethod.title}
								class="object-cover object-center h-full w-full"
								src={paymentMethod.image}
							/>
						</div>
						<h2 class="text-xl font-medium title-font text-gray-900 mt-5">{paymentMethod.title}</h2>
						<p class="text-base leading-relaxed mt-2">{@html paymentMethod.description}</p>
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
			<div
				class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col mb-16 md:mb-0 items-center text-center"
			>
				<p class="mb-8 md:text-justify">
					After place an order and get confirmation mail, please pay me through paypal with the note
					is order number or your username, then notice me after you paid.
				</p>
				<p class="mb-4">
					<span class="font-bold">Paypal:</span>
					<span class="font-mono"> fid.elfish@gmail.com </span>
				</p>
				<a
					class="mb-8 font-mono underline duration-200 hover:text-black"
					target="_blank"
					href="https://paypal.me/vnharudoll"
				>
					https://paypal.me/vnharudoll
				</a>
				<p class="mb-8">In case you can not use paypal, contact me for more payment information.</p>
				<p>Thank you!</p>
			</div>
			<div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
				<img
					class="object-cover object-center rounded"
					alt="Paypal"
					src="https://i.imgur.com/VUJoOD0.jpg"
				/>
			</div>
		</div>
	{/if}
</section>

{:else if $page.url.searchParams.has('p')}

<section class="text-gray-600 body-font overflow-hidden">
	<div class="container px-5 py-24 mx-auto">
		<div class="lg:w-4/5 mx-auto flex flex-wrap">
			<div class="md:w-1/2 w-full rounded-lg overflow-hidden relative text-white">
				<button
					class="absolute left-0 bottom-1/2 translate-y-1/2 mx-2 p-1 rounded-full bg-black"
					on:click={() => {preview--; if(preview < 0) preview = data.previews.length - 1}}
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
				</button>
				<button
					class="absolute right-0 bottom-1/2 translate-y-1/2 mx-2 p-1 rounded-full bg-black"
					on:click={() => {preview++; if(preview >= data.previews.length) preview = 0}}
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
				</button>
				<a href={data.previews[preview]} target="_blank">
					<img
						alt="Preview"
						class="aspect-square h-auto w-full object-cover object-center"
						src={data.previews[preview]}
					/>
				</a>
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

{:else}

<section class="text-gray-600 body-font bg-[url('https://i.imgur.com/z30EogZ.jpg')] bg-fixed bg-cover">
	<div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
		<img
			class="lg:w-1/5 w-2/5 mb-10 object-cover object-center"
			alt="Logo"
			src="https://i.imgur.com/usk8b0f.png"
		/>
		<div class="text-center lg:w-2/3 w-full">
			<h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
				{#if $lang === 'vn'}
					Haru n Chip
				{:else}
					Hi dear, welcome to my shop!
				{/if}
			</h1>
			<p class="mb-8 leading-relaxed">
				{#if $lang === 'vn'}
					Outfit for dolls
				{:else}
					Here I have a lot of doll and every things for your doll like clothes or furniture. I
					accept PayPal and have international shipping for all items that I sell. Please contact to
					know the condition of the product and get exactly fee before you pay.
				{/if}
			</p>
			<div class="flex justify-center">
				<a
					class="mx-2 inline-flex text-orange-50 bg-orange-400 border-0 py-2 px-6 hover:bg-orange-500 rounded text-lg"
					href="https://www.facebook.com/harunchip.dolls"
					target="_blank">Facebook</a
				>
				<a
					class="mx-2 inline-flex text-orange-50 bg-orange-400 border-0 py-2 px-6 hover:bg-orange-500 rounded text-lg"
					href="https://twitter.com/Haru_dollstore"
					target="_blank">Twitter</a
				>
			</div>
		</div>
	</div>
</section>

<section class="text-gray-600 bg-white body-font">
	<div class="container px-5 py-32 mx-auto">
		<div class="flex flex-wrap -m-4">
			{#each Object.entries(products) as [id, product] (id)}
				<div class="lg:w-1/4 md:w-1/2 p-4 w-full duration-200 hover:scale-105 hover:drop-shadow-xl">
					<a class="block relative md:h-48 sm:h-96 h-64 rounded overflow-hidden" href="{base}?p={id}" sveltekit:reload>
						<img
							alt="Preview"
							class="object-cover object-center w-full h-full block"
							src={product.previews[0]}
						/>
					</a>
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

<section class="text-gray-800 bg-slate-200 body-font relative">
	<div class="custom-shape-divider-top-1653682464">
		<svg
			data-name="Layer 1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1200 120"
			preserveAspectRatio="none"
		>
			<path d="M1200 0L0 0 598.97 114.72 1200 0z" class="shape-fill" />
		</svg>
	</div>
	<div class="container px-5 py-48 mx-auto flex flex-wrap">
		<div class="flex flex-wrap w-full">
			<div class="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
				<h1 class="title-font sm:text-4xl text-3xl mb-10 font-medium text-gray-900 text-center">
					{#if $lang === 'vn'}Các bước order{:else}How to buy{/if}
				</h1>

				<div class="flex relative pb-12">
					<div class="h-full w-10 absolute inset-0 flex items-center justify-center">
						<div class="h-full w-1 bg-gray-200 pointer-events-none" />
					</div>
					<div
						class="flex-shrink-0 w-10 h-10 rounded-full bg-orange-400 inline-flex items-center justify-center text-white relative z-10"
					>
						1
					</div>
					<div class="flex-grow pl-4">
						<h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
							{#if $lang === 'vn'}BƯỚC{:else}STEP{/if} 1
						</h2>
						<p class="leading-relaxed text-justify">
							{#if $lang === 'vn'}
								Check caption của ảnh để xem chi tiết thông tin sản phẩm, bao gồm giá, hạn đóng
								order, kích thước, set bao gồm những sản phẩm gì. Nếu muốn doll hoặc đồ không có
								trong album thì inbox link mình check trực tiếp tình trạng hàng nhé.
							{:else}
								Each picture have information in caption, about price, deadline and which include in
								set. If you have the other that you want, send me the link or picture to find more
								information.
							{/if}
						</p>
					</div>
				</div>
				<div class="flex relative pb-12">
					<div class="h-full w-10 absolute inset-0 flex items-center justify-center">
						<div class="h-full w-1 bg-gray-200 pointer-events-none" />
					</div>
					<div
						class="flex-shrink-0 w-10 h-10 rounded-full bg-orange-400 inline-flex items-center justify-center text-white relative z-10"
					>
						2
					</div>
					<div class="flex-grow pl-4">
						<h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
							{#if $lang === 'vn'}BƯỚC{:else}STEP{/if} 2
						</h2>
						<p class="leading-relaxed text-justify">
							{#if $lang === 'vn'}
								Chuyển khoản cho mình trước hạn đóng order, nếu muốn du di thời gian vài ngày thì
								cũng phải báo trước để mình đón dư slot.
							{:else}
								Pay before deadline through paypal. If you can not pay in time, at least tell me the
								quantity you want.
							{/if}
						</p>
					</div>
				</div>
				<div class="flex relative pb-12">
					<div class="h-full w-10 absolute inset-0 flex items-center justify-center">
						<div class="h-full w-1 bg-gray-200 pointer-events-none" />
					</div>
					<div
						class="flex-shrink-0 w-10 h-10 rounded-full bg-orange-400 inline-flex items-center justify-center text-white relative z-10"
					>
						3
					</div>
					<div class="flex-grow pl-4">
						<h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
							{#if $lang === 'vn'}BƯỚC{:else}STEP{/if} 3
						</h2>
						<p class="leading-relaxed text-justify">
							{#if $lang === 'vn'}
								Inbox báo lại mình sau khi đã chuyển khoản, check
							{:else}
								Tell me after you paid. You can also check your name in
							{/if}
							<a
								class="underline hover:text-black"
								href="https://docs.google.com/spreadsheets/d/1JZJsTSkxbe-Z8De-Y1i0bReCoWZ9aQodVxoJMPflaDk/?fbclid=IwAR35v1H4K4vo8ENKBg86VglxhxI3QHhY_Ep36emSs-Xh_93ILINRllD8Wro"
								>{#if $lang === 'vn'}danh sách order{:else}this list{/if}</a
							>
							{#if $lang === 'vn'}
								vào hôm sau, nếu thấy thiếu tên hoặc sai sản phẩm thì báo lại mình liền.
							{:else}
								to confirm your order is okay or not.
							{/if}
						</p>
					</div>
				</div>
				<div class="flex relative pb-12">
					<div class="h-full w-10 absolute inset-0 flex items-center justify-center">
						<div class="h-full w-1 bg-gray-200 pointer-events-none" />
					</div>
					<div
						class="flex-shrink-0 w-10 h-10 rounded-full bg-orange-400 inline-flex items-center justify-center text-white relative z-10"
					>
						4
					</div>
					<div class="flex-grow pl-4">
						<h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
							{#if $lang === 'vn'}BƯỚC{:else}STEP{/if} 4
						</h2>
						<p class="leading-relaxed text-justify">
							{#if $lang === 'vn'}
								Quá trình con thành hình sau đó sẽ được update trong album liên quan, check album
								hoặc bảng danh sách để xem tiến độ. Con về mình sẽ đăng thông báo trên page. Nếu quá
								lâu không có người đón con mình sẽ đăng thông báo hạn cuối trong album trẻ lạc trước
								khi nhượng bé.
							{:else}
								Doll will be update about progress in album picture and the form above. If the name
								turn blue, it’s closed order. If it turn yellow, doll is already finish and on the
								way going home.
							{/if}
						</p>
					</div>
				</div>
				<div class="flex relative">
					<div
						class="flex-shrink-0 w-10 h-10 rounded-full bg-orange-400 inline-flex items-center justify-center text-white relative z-10"
					>
						<svg
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							class="w-5 h-5"
							viewBox="0 0 24 24"
						>
							<path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
							<path d="M22 4L12 14.01l-3-3" />
						</svg>
					</div>
					<div class="flex-grow pl-4">
						<h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
							{#if $lang === 'vn'}LƯU Ý{:else}FINISH{/if}
						</h2>
						<p class="leading-relaxed text-justify">
							{#if $lang === 'vn'}
								Nếu sau khi con đã có mẹ khác đón mà mẹ ruột mới tới tìm thì tùy trường hợp sẽ có
								refund một phần hoặc không. Thế nên mẹ nào đón con mà lâu quá không thấy bé thì cũng
								phải để ý page một chút nhé không có mình nhượng mất là không chịu trách nhiệm đâu
								nhé!
							{:else}
								I will notice after received the doll from factory, then it’s ready for
								international shipping. If you just get clothes or funiture, they have no deadline
								and the process is same with buy doll but not waiting for that long.
							{/if}
						</p>
					</div>
				</div>
			</div>
			<img
				alt="Showcase"
				class="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12"
				src="https://i.imgur.com/TXMJmxZ.jpg"
			/>
		</div>
	</div>
	<div class="custom-shape-divider-bottom-1653682539">
		<svg
			data-name="Layer 1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1200 120"
			preserveAspectRatio="none"
		>
			<path d="M598.97 114.72L0 0 0 120 1200 120 1200 0 598.97 114.72z" class="shape-fill" />
		</svg>
	</div>
</section>

<section class="text-gray-600 bg-white body-font">
	<div class="container mx-auto flex px-5 py-24 md:flex-row-reverse flex-col items-center">
		<div
			class="lg:flex-grow md:w-1/2 lg:pr-24 md:pl-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
		>
			<h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
				{#if $lang === 'vn'}Sản xuất{:else}Producer{/if}
			</h1>
			<p class="mb-8 leading-relaxed text-justify">
				{#if $lang === 'vn'}
					Mình nhận sản xuất từ tối thiểu 100 bé, các mẹ đưa bản vẽ mình check giá với xưởng tùy
					theo thiết kế. Nếu đã nhắm trước xưởng muốn đặt như Anna, Xiha... thì có thể yêu cầu trực
					tiếp, không thì có thể tham khảo doll mình từng sản xuất tại xưởng riêng mình liên kết
					nhé!
				{:else}
					You can produce doll from your own design, but the minimum quantity is 100. Please send
					messenger for more information.
				{/if}
			</p>
		</div>
		<div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
			<img class="object-cover object-center rounded" alt="Producer" src="https://user-images.githubusercontent.com/43980777/171111003-792f9ddb-887c-4f89-afb7-40e145275a45.svg" />
		</div>
	</div>
</section>

{/if}

<style>
	.custom-shape-divider-top-1653682464 {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		line-height: 0;
	}

	.custom-shape-divider-top-1653682464 svg {
		position: relative;
		display: block;
		width: calc(100% + 1.3px);
		height: 100px;
	}

	.custom-shape-divider-bottom-1653682539 {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		line-height: 0;
	}

	.custom-shape-divider-bottom-1653682539 svg {
		position: relative;
		display: block;
		width: calc(100% + 1.3px);
		height: 100px;
	}

	.shape-fill {
		fill: #ffffff;
	}
</style>
