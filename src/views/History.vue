<template>
    <div>
        <div class="page-title">
            <h3>История записей</h3>
        </div>

        <div class="history-chart">
            <canvas></canvas>
        </div>

        <Loader v-if="isLoading" />

        <h6 v-else-if="!allItems.length">
            Записей пока нет.
            <router-link to="/record">Добавить новую.</router-link>
        </h6>

        <section v-else>
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
    import HistoryTable from '@/components/history/Table';
    import paginationMixin from '@/mixins/pagination';

    export default {
        data: () => ({
            isLoading: true,
        }),
        async mounted() {
            const records = await this.$store.dispatch('fetchRecords');
            const categories = await this.$store.dispatch('fetchCategories');

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
        components: { HistoryTable },
    };
</script>
