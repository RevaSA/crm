<template>
    <div>
        <div class="page-title">
            <h3>История записей</h3>
        </div>

        <Loader v-if="isLoading" />

        <h6 v-else-if="!allItems.length">
            Записей пока нет.
            <router-link to="/record">Добавить новую.</router-link>
        </h6>

        <section v-else>
            <div class="history-chart">
                <HistoryChart :items="chartData" />
            </div>

            <HistoryTable :records="items" />

            <Paginate
                v-model="page"
                :page-count="pageCount"
                :click-handler="pageChangeHandler"
                :prev-text="'Назад'"
                :next-text="'Вперед'"
                :container-class="'pagination'"
                :page-class="'waves-effect'"
            />
        </section>
    </div>
</template>

<script>
    import HistoryChart from '@/components/history/Chart';
    import HistoryTable from '@/components/history/Table';
    import paginationMixin from '@/mixins/pagination';

    export default {
        data: () => ({
            isLoading: true,
            chartData: [],
        }),
        async mounted() {
            const records = await this.$store.dispatch('fetchRecords');
            const categories = await this.$store.dispatch('fetchCategories');

            this.chartData = categories.map(category => ({
                label: category.title,
                data: records
                    .filter(record => record.categoryId === category.id && record.type === 'outcome')
                    .reduce((acc, { amount }) => acc + amount, 0),
            }));

            this.setupPagination(records.map((record, index) => ({
                ...record,
                position: index + 1,
                categoryName: categories.find(({ id }) => id === record.categoryId).title,
                typeText: record.type === 'income' ? 'Доход' : 'Расход',
                typeClass: record.type === 'income' ? 'green' : 'red',
            })));

            this.isLoading = false;
        },
        mixins: [paginationMixin],
        components: { HistoryChart, HistoryTable },
    };
</script>
