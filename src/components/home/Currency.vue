<template>
    <div class="card orange darken-3 bill-card">
        <div class="card-content white-text">
            <div class="card-header">
                <span class="card-title">{{ 'CurrencyAmountTitle' | localize }}</span>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>{{ 'Currency' | localize }}</th>
                        <th>{{ 'CurrencyType' | localize }}</th>
                        <th>{{ 'Date' | localize }}</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="currency of currencies" :key="currency">
                        <td>{{ currency }}</td>
                        <td>{{ parseFloat((rates[currency]).toFixed(5)) }}</td>
                        <td>{{ date | dateFilter('date') }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import dateFilter from '@/filters/date';

    export default {
        props: ['rates', 'date'],
        data: () => ({
            currencies: ['RUB', 'USD', 'EUR'],
        }),
        filters: {
            dateFilter,
        },
    };
</script>
