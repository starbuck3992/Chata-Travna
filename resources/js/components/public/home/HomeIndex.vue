<template>
    <div class="px-8 bg-[#0f1925] relative">
        <!-- First Slide Section -->
        <div class="absolute -top-5 bg-[#0f1925] z-10 w-full h-10 left-0"></div>
        <div class="relative">
          <div aria-hidden="true" class="hidden absolute w-1/2 h-full bg-white lg:block" />
          <div class="relative bg-white lg:bg-transparent">
            <div class="max-w-7xl mx-auto lg:grid lg:grid-cols-2">
              <div class="max-w-2xl ml-5 mr-auto py-24 lg:py-64 lg:max-w-none">
                <div class="lg:pr-16 text-left">
                  <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl font-sansita">Chata Travná</h1>
                  <p class="mt-4 text-xl text-gray-600 font-sansita">Nějaký pěkný popisek chaty. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam in lorem sit amet leo accumsan lacinia. Duis risus. Etiam neque. Aliquam ornare wisi eu metus. Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus. Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Vivamus porttitor turpis ac leo. Integer rutrum, orci vestibulum ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem sit amet enim. Fusce suscipit libero eget elit.</p>
                  <div class="mt-6">
                    <a href="#" class="inline-block border border-transparent py-3 px-8 rounded-md font-medium text-white bg-red-700 hover:bg-red-800 font-sansita">Pokračovat na galerii</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full h-48 sm:h-64 lg:absolute lg:top-0 lg:right-0 lg:w-1/2 lg:h-full">
            <img src="/storage/images/secondImage.jpg" alt="" class="w-full h-full object-center object-cover" />
          </div>
        </div>
        <!-- End first slide section -->
        <!-- Mini Gallery Section -->
        <div class="bg-white px-8 pt-20">
            <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl font-sansita text-center mb-3">___ Galerie ___</h1>
            <h1 class="text-xl font-extrabold tracking-tight text-gray-900 sm:text-3xl xl:text-3xl font-sansita text-center mb-5">Na co se můžete těšit</h1>
            <ul role="list" class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 xl:gap-x-8">
                <li v-for="file in files" :key="file.source" class="relative">
                    <div class="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                        <img :src="file.source" alt="" class="object-cover pointer-events-none group-hover:opacity-75" />
                        <button type="button" class="absolute inset-0 focus:outline-none">
                        <span class="sr-only">View details for {{ file.title }}</span>
                        </button>
                    </div>
                </li>
            </ul>
        </div>
        <!-- End Mini Gallery Section -->
    </div>
</template>

<script>
const files = [
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source:
      '/storage/images/bg.jpg',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source:
      '/storage/images/secondImage.jpg',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source:
      '/storage/images/cottage.jpg',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source:
      '/storage/images/cottage2.jpg',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source:
      '/storage/images/cottage3.png',
  },
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source:
      '/storage/images/bg.jpg',
  },
]
export default {
    setup() {
    return {
      files,
    }
  },
}
</script>

<style scoped>
</style>
