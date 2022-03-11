<template>
        <div class="container-fluid">
            <nav class="container navbar navbar-expand-lg d-flex justify-content-between tex-white">
                <router-link class="p-1 tex-white menu-li" :to="{ name: 'homeIndex' }">Domů</router-link>
                <router-link class="p-1 tex-white menu-li" :to="{ name: 'dashboard' }">Admin rozhraní</router-link>
            </nav>
        </div>
</template>

<style scoped>
</style>
