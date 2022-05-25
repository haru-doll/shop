<script>
	const lang = 'vn'; // TODO
</script>

<section class="text-gray-600 body-font">
	<div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
		<img class="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center" src="/static/logo.png" />
		<div class="text-center lg:w-2/3 w-full">
			<h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
				{#if lang === 'vn'}
					TODO
				{:else}
					Hi dear, welcome to my shop!
				{/if}
			</h1>
			<p class="mb-8 leading-relaxed">
				{#if lang === 'vn'}
					TODO
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
				<a
					class="mx-2 inline-flex text-orange-50 bg-orange-400 border-0 py-2 px-6 hover:bg-orange-500 rounded text-lg"
					href="https://paypal.me/vnharudoll"
					target="_blank">PayPal</a
				>
			</div>
		</div>
	</div>
</section>

<section class="text-gray-800 bg-slate-100 body-font">
	<div class="container px-5 py-24 mx-auto flex flex-wrap">
		<div class="flex flex-wrap w-full">
			<div class="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
				<h1 class="title-font sm:text-4xl text-3xl mb-10 font-medium text-gray-900 text-center">
					{#if lang === 'vn'}Các bước order{:else}How to buy{/if}
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
							{#if lang === 'vn'}BƯỚC{:else}STEP{/if} 1
						</h2>
						<p class="leading-relaxed text-justify">
							{#if lang === 'vn'}
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
							{#if lang === 'vn'}BƯỚC{:else}STEP{/if} 2
						</h2>
						<p class="leading-relaxed text-justify">
							{#if lang === 'vn'}
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
							{#if lang === 'vn'}BƯỚC{:else}STEP{/if} 3
						</h2>
						<p class="leading-relaxed text-justify">
							{#if lang === 'vn'}
								Inbox báo lại mình sau khi đã chuyển khoản, check
							{:else}
								Tell me after you paid. You can also check your name in
							{/if}
							<a
								class="underline hover:text-black"
								href="https://docs.google.com/spreadsheets/d/1JZJsTSkxbe-Z8De-Y1i0bReCoWZ9aQodVxoJMPflaDk/?fbclid=IwAR35v1H4K4vo8ENKBg86VglxhxI3QHhY_Ep36emSs-Xh_93ILINRllD8Wro"
								>{#if lang === 'vn'}danh sách order{:else}this list{/if}</a
							>
							{#if lang === 'vn'}
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
							{#if lang === 'vn'}BƯỚC{:else}STEP{/if} 4
						</h2>
						<p class="leading-relaxed text-justify">
							{#if lang === 'vn'}
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
							{#if lang === 'vn'}LƯU Ý{:else}FINISH{/if}
						</h2>
						<p class="leading-relaxed text-justify">
							{#if lang === 'vn'}
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
				class="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12"
				src="/static/showcase.jpg"
			/>
		</div>
	</div>
</section>

<section class="text-gray-600 bg-slate-200 body-font">
	<div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
		<div
			class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
		>
			<h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
				{#if lang === 'vn'}Sản xuất{:else}Producer{/if}
			</h1>
			<p class="mb-8 leading-relaxed text-justify">
				{#if lang === 'vn'}
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
			<img class="object-cover object-center rounded" alt="hero" src="/static/producer.svg" />
		</div>
	</div>
</section>
