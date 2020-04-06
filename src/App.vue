<template>
    <div id="app">
        <component v-if="layout" :is="layout">
            <router-view/>
        </component>
    </div>
</template>

<script>
    import MainLayout from '@/layouts/Main';
    import AuthLayout from '@/layouts/Auth';

    export default {
        computed: {
            layout() {
                return this.$route.meta.layout ? `${this.$route.meta.layout}-layout` : null;
            },
        },
        components: {
            MainLayout,
            AuthLayout,
        },
    };
</script>

<style lang="less">
    @import '~materialize-css/dist/css/materialize.min.css';
    @import 'assets/index.css';
</style>
