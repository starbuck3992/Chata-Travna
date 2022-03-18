<template>
    <div class="px-4 sm:px-8 bg-[#0f1925] relative">
        <!-- First Slide Section -->
        <div class="absolute -top-1 sm:-top-5 bg-[#0f1925] z-10 w-full h-4 sm:h-10 left-0"></div>
        <div class="relative">
          <div aria-hidden="true" class="hidden absolute w-1/2 h-full bg-white lg:block" />
          <div class="relative bg-white lg:bg-transparent">
            <div class="max-w-7xl mx-auto lg:grid lg:grid-cols-2">
              <div class="max-w-2xl ml-5 mr-auto py-10 sm:py-24 lg:py-64 lg:max-w-none">
                <div class="lg:pr-16 text-left">
                  <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl font-sansita">Chata Travná</h1>
                  <p class="mt-4 px-2 md:px-0 text-md md:text-xl text-gray-600 font-sansita">Nějaký pěkný popisek chaty. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam in lorem sit amet leo accumsan lacinia. Duis risus. Etiam neque. Aliquam ornare wisi eu metus. Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus. Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Vivamus porttitor turpis ac leo. Integer rutrum, orci vestibulum ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem sit amet enim. Fusce suscipit libero eget elit.</p>
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
        <div class="bg-white px-8 pt-20 py-8">
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
        <!-- Items Section -->
        <div class="bg-[#0f1925] px-12 pt-20">
          <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl xl:text-6xl font-sansita text-center mb-3">___ Služby ___</h1>
          <h1 class="text-xl font-extrabold tracking-tight text-white sm:text-3xl xl:text-3xl font-sansita text-center mb-12">Co vám můžeme nabídnout</h1>
            <div class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 xl:gap-x-8 mt-5">
              <div class="flex">
                <div><WifiIcon class="h-20 md:w-20 w-10 text-red-700 inline-flex"></WifiIcon></div>
                <div class="mx-auto text-left ml-5">
                  <h1 class="text-lg font-bold tracking-tight text-white sm:text-lg xl:text-lg font-sansita">Wifi</h1><br>
                  <p class="text-md font-medium tracking-tight text-white  sm:text-md xl:text-md font-sansita mb-5">Možnost připojení k internetové síti pomocí wifi z jakéhokoli zařízení.</p>
                </div>
              </div>
              <div class="flex">
                <div><img  class="h-20 md:w-20 text-red-700 inline-flex" src="/storage/images/car.svg" /></div>
                <div class="mx-auto text-left ml-5">
                  <h1 class="text-lg font-bold tracking-tight text-white sm:text-lg xl:text-lg font-sansita">Parkování</h1><br>
                  <p class="text-md font-medium tracking-tight text-white  sm:text-md xl:text-md font-sansita mb-5">V areálu chaty je dostatek místa pro zaparkování Vašeho vozidla.</p>
                </div>
              </div>
              <div class="flex">
                <div><img  class="h-20 md:w-20 text-red-700 inline-flex" src="/storage/images/shower.svg" /></div>
                <div class="mx-auto text-left ml-5">
                  <h1 class="text-lg font-bold tracking-tight text-white sm:text-lg xl:text-lg font-sansita">Sprchový kout</h1><br>
                  <p class="text-md font-medium tracking-tight text-white  sm:text-md xl:text-md font-sansita mb-5">Možnost osprchování se na chatě ve sprchovém koutě.</p>
                </div>
              </div>
              <div class="flex">
                <div><img  class="h-20 md:w-20 w-10 text-red-700 inline-flex" src="/storage/images/tv.svg" /></div>
                <div class="mx-auto text-left ml-5">
                  <h1 class="text-lg font-bold tracking-tight text-white sm:text-lg xl:text-lg font-sansita">Televizor</h1><br>
                  <p class="text-md font-medium tracking-tight text-white  sm:text-md xl:text-md font-sansita mb-5">Na chatě je dostupný televizor.</p>
                </div>
              </div>
            </div>
        </div>
        <!-- End items section -->
        <!-- Footer -->
        <footer class="bg-[#0f1925] sm:px-12 pt-14 sm:pt-20">
          <div class="h-1 max-w-[1300px] border-gray-600 mx-auto border-t-2 border-dashed"></div>
          <div class="grid md:grid-cols-3 grid-cols-1 pt-10 sm:pt-20">
            <div class="bg-[#0f1925]">
              <h1 class="text-2xl font-extrabold tracking-tight text-white sm:text-3xl xl:text-4xl font-sansita mb-5 text-center sm:text-left">Chata Travná</h1>
              <div class="grid grid-cols-3 md:grid-cols-none">
                <div class="ml-2"><h1 class="text-sm tracking-tight text-white sm:text-lg xl:text-lg font-sansita text-center mb-2 sm:inline-flex">Telefon :</h1><p class="text-xs tracking-tight text-white sm:text-lg xl:text-lg font-sansita text-center mb-2 inline-flex ml-5">721 892 661</p></div>
                <div class="ml-2"><h1 class="text-sm tracking-tight text-white sm:text-lg xl:text-lg font-sansita text-center mb-2 sm:inline-flex">Email   :</h1><p class="text-xs tracking-tight text-white sm:text-lg xl:text-lg font-sansita text-center mb-2 inline-flex ml-5">j.svardala@seznam.cz</p></div>
                <div class="ml-2"><h1 class="text-sm tracking-tight text-white sm:text-lg xl:text-lg font-sansita text-center mb-2 sm:inline-flex">Adresa  :</h1><p class="text-xs tracking-tight text-white sm:text-lg xl:text-lg font-sansita text-center mb-2 inline-flex ml-5">Lipovská 1170, Jesník 790 01</p></div>
              </div>
            </div>
            <div class="bg-[#0f1925]">
              <h1 class="text-2xl font-extrabold tracking-tight text-white sm:text-3xl xl:text-4xl font-sansita mb-5 text-center sm:text-left mt-10 sm:mt-0">Důležité odkazy</h1>
              <div class="grid grid-cols-3 md:grid-cols-none text-center sm:text-left">
                <div class="ml-2"><a class="text-sm tracking-tight text-white sm:text-lg xl:text-lg font-sansita text-center mb-2 inline-flex hover:text-gray-400 cursor-pointer">Rezervace</a></div>
                <div class="ml-2"><a class="text-sm tracking-tight text-white sm:text-lg xl:text-lg font-sansita text-center mb-2 inline-flex hover:text-gray-400 cursor-pointer">Kontaktujte nás</a></div>
                <div class="ml-2"><a class="text-sm tracking-tight text-white sm:text-lg xl:text-lg font-sansita text-center mb-2 inline-flex hover:text-gray-400 cursor-pointer">Galerie</a></div>
              </div>
            </div>
            <div>
              <iframe class="w-full h-64 mt-10 sm:mt-0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10178.653730612807!2d16.923471041812693!3d50.37283002143402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4711e1eead70b3e3%3A0x8173e26478689831!2zVHJhdm7DoSwgNzkwIDcwIEphdm9ybsOtaw!5e0!3m2!1scs!2scz!4v1647603094173!5m2!1scs!2scz" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
          </div>
          <div class="h-1 max-w-[1300px] border-gray-600 my-5 sm:my-20 mx-auto border-t-2 border-dashed"></div>
          <div>
            <h1 class="text-md font-extrabold tracking-tight text-white sm:text-md xl:text-md font-sansita py-5 text-center">© Copyright MJ-WEBSITE. All right reserved.</h1>
          </div>
        </footer>
        <!-- End Footer -->
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

import { WifiIcon } from '@heroicons/vue/outline'
export default {
  components: {
    WifiIcon
  },
  setup() {
    return {
      files,
    }
  },
}
</script>

<style scoped>
</style>
