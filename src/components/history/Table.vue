<template>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>{{ 'Amount' | localize }}</th>
                <th>{{ 'Date' | localize }}</th>
                <th>{{ 'Category' | localize }}</th>
                <th>{{ 'Type' | localize }}</th>
                <th>{{ 'Open' | localize }}</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="record of records" :key="record.id">
                <td>{{ record.position }}</td>
                <td>{{ record.amount | currency }}</td>
                <td>{{ record.date | date }}</td>
                <td>{{ record.categoryName }}</td>
                <td>
                    <span class="white-text badge" :class="[record.typeClass]">
                        {{ record.typeText }}
                    </span>
                </td>
                <td>
                    <router-link
                        tag="button"
                        class="btn-small btn"
                        :to="'/detail/' + record.id"
                        v-tooltip="{
                            position: 'left',
                            html: 'OpenRecord',
                        }"
                    >
                        <i class="material-icons">open_in_new</i>
                    </router-link>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import currency from '@/filters/currency';
    import date from '@/filters/date';
    import tooltip from '@/directives/tooltip';

    export default {
        props: {
            records: {
                required: true,
                type: Array,
            },
        },
        filters: { currency, date },
        directives: { tooltip },
    };
</script>
