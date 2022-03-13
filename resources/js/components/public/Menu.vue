<template>
    <div class="relative w-full h-screen bg-cover bg-[url('/storage/images/bg.jpg')]">
        <div class="absolute w-full h-full bg-black opacity-40"></div>
            <Disclosure as="nav" class="bg-white w-full max-w-[90vw] mx-auto z-10 rounded-b-xl min-h-[80px] sticky shadow-sm shadow-white" v-slot="{ open }">
                <div class="sm:px-6 lg:px-8">
                    <div class="relative flex items-center justify-between h-16">
                        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <!-- Mobile menu button-->
                        <DisclosureButton class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span class="sr-only">Open main menu</span>
                            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
                        </DisclosureButton>
                        </div>
                        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div class="flex-shrink-0 flex items-center">
                            <img class="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
                            <img class="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow" />
                        </div>
                        <div class="hidden sm:block mx-auto">
                            <div class="flex space-x-4">
                                <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-black px-3 py-2 rounded-md text-md font-medium uppercase hover:underline-offset-1 hover:underline">
                                    {{ item.name }}
                                </a>
                            </div>
                        </div>
                        </div>
                        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button type="button" class="p-1 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white cursor-default">
                                <span class="sr-only">View notifications</span>
                                <DeviceMobileIcon class="h-8 w-8 inline-flex" aria-hidden="true" /><span class="inline-flex font-bold">721 892 661</span>
                            </button>
                            <div class="ml-3 relative">
                                <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700">Rezervace</button>
                            </div>
                        </div>
                    </div>
                </div>

                <DisclosurePanel class="sm:hidden">
                <div class="px-2 pt-2 pb-3 space-y-1">
                    <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
                </div>
                </DisclosurePanel>
            </Disclosure>
            <!-- Title and Subtitle -->
            <div class="absolute left-0 right-0 bottom-0 top-20 w-full h-full m-auto z-10 max-w-7xl max-h-80">
                <h1 class="text-white md:text-[120px] mb-1 font-sansita">Chata Travná</h1>
                <h1 class="text-white md:text-5xl mb-10 font-sansita">Nějaký menší popisek</h1>
                <div class="relative">
                    <button type="button" class="inline-flex items-center px-8 py-2 border border-transparent font-medium rounded-md shadow-sm text-white text-lg bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white font-sansita">Rezervace</button>
                </div>
            </div>
            <!-- ALERT -->
            <div class="absolute left-0 right-0 bottom-20 mx-auto max-w-3xl max-h-64 rounded-xl shadow-xl break-words">
                <div class="my-auto text-black font-medium p-8 py-8 bg-white break-words rounded-xl font-sansita">
                <h1 class="max-auto text-center text-2xl mb-2">Upozornění!</h1>
                <p class="">Kdyby se cokoli stalo, nebo nějaká důležitá informace pro uživatele. Mohlo by se zobrazovat toto okýnkdo, kde bude možné napsat cokoli. Pokud bude vše v pořádku vůbec tady to okénko viditelné být nemusí.</p>
                </div>
            </div>
    </div>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BellIcon, MenuIcon, XIcon, DeviceMobileIcon } from '@heroicons/vue/outline'

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    MenuIcon,
    XIcon,
    DeviceMobileIcon
  },
  setup() {
    return {
      navigation,
    }
  },
}
</script>