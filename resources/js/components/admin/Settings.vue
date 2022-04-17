<template>
    <div class="mt-10">
        <form>
            <label for="email" class="block text-sm font-medium text-gray-700">Minimální možný počet rezervovaných nocí</label>
            <div class="mt-1 inline-flex">
                <input type="number" name="minNight" id="minNight" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mr-10" placeholder="1"/>
                <button type="submit"
                            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Uložit
                </button>
            </div>
        </form>
        <p class="mt-2 text-sm text-gray-500" id="email-description">Zadejte minimální počet nocí, které si může uživatel rezervovat.</p>
    </div>

    <div class="mt-10">
        <form>
            <label for="email" class="block text-sm font-medium text-gray-700">Maximální možný počet rezervovaných nocí</label>
            <div class="mt-1 inline-flex">
                <input type="number" name="maxNight" id="maxNight" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mr-10" placeholder="14"/>
            </div>
            <button type="submit"
                            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Uložit
            </button>
        </form>
        <p class="mt-2 text-sm text-gray-500" id="email-description">Zadejte maximální počet nocí, které si může uživatel rezervovat.</p>
    </div>
    <div class="mt-10">
        <form>
            <label for="email" class="block text-sm font-medium text-gray-700">Zobrazovat hlášení/upozirnění na uvodní stránce?</label>
            <div class="mt-1 inline-flex">
                <select id="show" name="show" class="mt-1 mr-10 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>Ano zobrazovat</option>
                    <option selected="">Ne nezobrazovat</option>
                </select>
            </div>
            <button type="submit"
                            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Uložit
            </button>
        </form>
        <p class="mt-2 text-sm text-gray-500" id="email-description">Zvolte si zda chcete zobrazovat ne úvodní stránce textové pole upozornění.</p>
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