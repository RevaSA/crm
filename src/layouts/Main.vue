<template>
    <div class="app-main-layout">
        <Navbar @click="isOpenSidebar = !isOpenSidebar" />
        <Sidebar v-model="isOpenSidebar" />

        <main class="app-content" :class="{ full: ! isOpenSidebar }">
            <div class="app-page">
                <router-view/>
            </div>
        </main>

        <div class="fixed-action-btn">
            <router-link class="btn-floating btn-large blue" to="/record">
                <i class="large material-icons">add</i>
            </router-link>
        </div>
    </div>
</template>

<script>
    import Navbar from '@/components/Navbar';
    import Sidebar from '@/components/Sidebar';

    export default {
        data: () => ({
            isOpenSidebar: true,
        }),
        async mounted() {
            if (!this.$store.getters.info) {
                await this.$store.dispatch('fetchInfo');
            }
        },
        components: {
            Navbar,
            Sidebar,
        },
    };
</script>
