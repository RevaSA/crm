<template>
    <div>
        <div class="page-title">
            <h3>История записей</h3>
        </div>

        <div class="history-chart">
            <canvas></canvas>
        </div>

        <Loader v-if="isLoading" />

        <h6 v-else-if="!records.length">
            Записей пока нет.
            <router-link to="/record">Добавить новую.</router-link>
        </h6>

        <HistoryTable v-else :records="records" />
    </div>
</template>

<script>
    import HistoryTable from '@/components/history/Table';

    export default {
        data: () => ({
            isLoading: true,
            records: [],
            categories: [],
        }),
        async mounted() {
            const records = await this.$store.dispatch('fetchRecords');

            this.categories = await this.$store.dispatch('fetchCategories');
            this.records = records.reverse().map(record => ({
                ...record,
                categoryName: this.categories.find(category => category.id === record.categoryId).title,
                typeText: record.type === 'income' ? 'Доход' : 'Расход',
                typeClass: record.type === 'income' ? 'green' : 'red',
            }));
            this.isLoading = false;
        },
        components: { HistoryTable },
    };
</script>
