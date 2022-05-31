<script>
	import { lang } from './language.ts';
	export const prerender = true;

	import { page } from '$app/stores';
	const bill = JSON.parse(atob(decodeURIComponent($page.url.searchParams.get('b'))));

	const paymentMethods = [
		{
			name: 'techcombank',
			title: 'Techcombank',
			description:
				'11724489027011<br/>Chủ tài khoản: Nguyễn Minh Châu<br/>Chi nhánh: Hoàng Quốc Việt<br/>(Hoặc Hà Nội, hoặc hội sở chính)'
		},
		{
			name: 'tpbank',
			title: 'TPbank',
			description:
				'00169156001<br/>Chủ tài khoản: Nguyễn Minh Châu<br/>Chi nhánh: Đống Đa<br/>(Hoặc Hà Nội, hoặc Hội sở chính)'
		},
		{ name: 'viettelpay', title: 'Viettel pay', description: '0376163497' },
		{ name: 'shopeepay', title: 'ShopeePay', description: 'Harudoll' },
		{ name: 'grabpay', title: 'Grab Pay (hoặc ví Moca)', description: '0376163497' }
	];
</script>

<svelte:head>
	<title>Harudoll</title>
</svelte:head>

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
								src="/paymentmethod/{paymentMethod.name}.jpg"
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
					src="/paymentmethod/paypal.jpg"
				/>
			</div>
		</div>
	{/if}
</section>
