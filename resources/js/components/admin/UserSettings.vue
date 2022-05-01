<template>
<div class="lg:grid lg:grid-cols-3">
    <div class="lg:col-span-1">
        <div>
            <form>
                <label for="email" class="block text-sm font-medium text-gray-700">Změna hesla</label>
                <div class="mt-1 table">
                    <label for="pass1" class="block text-sm text-gray-500">Heslo poprvé</label>
                    <input type="text" name="pass1" id="pass1" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mr-10" placeholder="14"/>
                </div>
                <div class="mt-2 table">
                    <label for="pass2" class="block text-sm text-gray-500">Heslo pro kontrolu podruhé</label>
                    <input type="text" name="pass2" id="pass2" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mr-10" placeholder="14"/>
                </div>
                <button type="submit"
                                class="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Uložit
                </button>
            </form>
        </div>
        <p class="mt-2 text-sm text-gray-500" id="maxNight-description">Zadejte dvakrát heslo.</p>
    </div>
    <div class="lg:col-span-2 hidden lg:relative lg:block">
        <div class="absolute right-2 top-[20%]">
            <img class="hidden lg:block w-full md:max-w-[50%] xl:max-w-full opacity-20 text-gray-400 -z-10" src="/storage/images/watterMark2.svg" alt="Workflow" />
        </div>
    </div>
</div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>