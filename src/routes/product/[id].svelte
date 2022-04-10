<script>
	import Carousel from '@beyonk/svelte-carousel';
</script>

<section class="text-gray-600 body-font overflow-hidden">
	<div class="container px-5 py-24 mx-auto">
		<div class="lg:w-4/5 mx-auto flex flex-wrap">
			<div class="lg:w-1/2 w-full rounded overflow-hidden">
				<Carousel perPage={1} duration={500}>
					<img
						class="aspect-square h-auto w-full object-cover object-center"
						src={'https://dummyimage.com/400x400'}
					/>
					<img
						class="aspect-square h-auto w-full object-cover object-center"
						src={'https://dummyimage.com/600x400'}
					/>
					<img
						class="aspect-square h-auto w-full object-cover object-center"
						src={'https://dummyimage.com/400x600'}
					/>
				</Carousel>
			</div>
			<div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
				<h1 class="text-gray-900 text-3xl title-font font-medium">{'Name'}</h1>
				<div class="flex my-4">
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
				<p class="leading-relaxed pb-5 border-b-2 border-gray-100 text-justify">
					{'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse velit nulla, suscipit et lobortis et, ornare ut diam. Sed dui dui, tincidunt non venenatis nec, aliquet in diam. Donec feugiat ligula sodales orci accumsan, ut auctor quam consequat. Morbi nec sapien id massa viverra vehicula. In bibendum tempor arcu nec.'}
				</p>
				<div class="flex items-center my-5">
					<span class="title-font font-medium text-xl">
						{'Item 1'}:
							<span class="text-gray-900">{100}$</span>
					</span>
					<button
						class="flex ml-auto text-orange-50 bg-orange-400 border-0 p-2 hover:bg-orange-500 rounded"
						>Add to Cart</button
					>
				</div>
			</div>
		</div>
	</div>
</section>
