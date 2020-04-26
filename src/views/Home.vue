<template>
    <div>
        <div class="page-title">
            <h3>Счет</h3>

            <button type="button"
                    class="btn waves-effect waves-light btn-small"
                    @click="refresh"
                    :disabled="loading"
            >
                <i class="material-icons">refresh</i>
            </button>
        </div>

        <Loader v-if="loading" />

        <div v-else class="row">
            <div class="col s12 m6 l4">
                <Bill :rates="currency.rates" />
            </div>

            <div class="col s12 m6 l8">
                <Currency :rates="currency.rates" :date="currency.date" />
            </div>
        </div>
    </div>
</template>

<script>
    import Bill from '@/components/home/Bill';
    import Currency from '@/components/home/Currency';

    export default {
        data: () => ({
            loading: true,
            currency: null,
        }),
        methods: {
            async refresh() {
                this.loading = true;
                this.currency = await this.$store.dispatch('fetchCurrency');
                this.loading = false;
            },
        },
        async mounted() {
            this.currency = await this.$store.dispatch('fetchCurrency');
            this.loading = false;
        },
        components: {
            Bill,
            Currency,
        },
    };
</script>
