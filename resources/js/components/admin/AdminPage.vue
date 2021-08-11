<template>
    <div>
        <Menu></Menu>
        <router-view></router-view>
        <footer></footer>
    </div>
</template>

<script>
import Menu from './Menu';
import Footer from './Footer';
export default {
    components: {
        Menu,Footer
    }
}
</script>

<style scoped>
</style>
