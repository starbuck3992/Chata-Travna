<template>
    <div class="container-fluid">
        <nav class="container navbar navbar-expand-lg d-flex justify-content-between tex-white">
            <router-link class="p-1 tex-white menu-li" :to="{ name: 'home' }">Domů</router-link>
            <router-link class="p-1 tex-white menu-li" :to="{ name: 'dashboard' }">Dashboard</router-link>
            <router-link class="p-1 tex-white menu-li" :to="{ name: 'adminReservationsIndex' }">Seznam rezervací</router-link>
        </nav>
    </div>
</template>

<style scoped>
</style>
