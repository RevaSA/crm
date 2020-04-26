<template>
    <div class="card light-blue bill-card">
        <div class="card-content white-text">
            <span class="card-title">Счет в валюте</span>

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
                const { info } = this.$store.getters;
                const bill = info ? info.bill : 0;

                return bill / (this.rates.RUB / this.rates.EUR);
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
