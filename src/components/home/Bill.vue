<template>
    <div class="card light-blue bill-card">
        <div class="card-content white-text">
            <span class="card-title">{{ 'BillInCurrency' | localize }}</span>

            <p class="currency-line" v-for="currency of currencies" :key="currency">
                <span>{{ getCurrency(currency) | currencyFilter(currency) }}</span>
            </p>
        </div>
    </div>
</template>

<script>
    import currencyFilter from '@/filters/currency';

    export default {
        props: ['rates'],
        data: () => ({
            currencies: ['RUB', 'USD', 'EUR'],
        }),
        computed: {
            base() {
                return this.$store.getters.info.bill / (this.rates.RUB / this.rates.EUR);
            },
        },
        methods: {
            getCurrency(currency) {
                return this.base * this.rates[currency];
            },
        },
        filters: {
            currencyFilter,
        },
    };
</script>
