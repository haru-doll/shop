<script>
  const products = [1, 2, 3, 4, 5, 6, 7, 8];
</script>

<section class="text-gray-600 body-font bg-[url('/static/bg.png')]">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap -m-4">
      {#each products as product}
        <div class="lg:w-1/4 md:w-1/3 sm:w-1/2 p-4 w-full">
          <a class="block rounded bg-white drop-shadow-md duration-200 hover:scale-105 hover:drop-shadow-xl" href=".">
            <div class="sm:h-48 h-80 rounded overflow-hidden">
              <img alt="Preview" class="object-cover object-center w-full h-full block" src="https://dummyimage.com/420x260">
            </div>
            <div class="p-4">
              <h2 class="text-gray-900 title-font text-lg font-medium">{"Name"}</h2>
              <p class="mt-1">{100}$</p>
            </div>
          </a>
        </div>
      {/each}
    </div>
  </div>
</section>
