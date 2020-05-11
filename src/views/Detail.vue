<template>
    <section>
        <Loader v-if="isLoading" />

        <div v-else-if="record">
            <div class="breadcrumb-wrap">
                <router-link class="breadcrumb" to="/history">
                    {{ 'Menu_History' | localize }}
                </router-link>
                <a class="breadcrumb">
                    {{ record.type === 'income' ? 'Income' : 'Outcome' | localize }}
                </a>
            </div>

            <div class="row">
                <div class="col s12 m6">
                    <div class="card"
                        :class="{
                            green: record.type === 'income',
                            red: record.type === 'outcome',
                        }"
                    >
                        <div class="card-content white-text">
                            <p>{{ 'Description' | localize }}: {{ record.description }}</p>
                            <p>{{ 'Amount' | localize }}: {{ record.amount | currencyFilter }}</p>
                            <p>{{ 'Category' | localize }}: {{ record.categoryName }}</p>
                            <small>{{ record.date | dateFilter('datetime') }}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <h6 v-else>
            {{ 'RecordNotFound' | localize }}. ID - {{ $route.params.id }}
        </h6>
    </section>
</template>

<script>
    import currencyFilter from '@/filters/currency';
    import dateFilter from '@/filters/date';

    export default {
        data: () => ({
            isLoading: true,
            record: null,
        }),
        async mounted() {
            const { id } = this.$route.params;
            const record = await this.$store.dispatch('fetchRecordById', id);

            if (record) {
                const category = await this.$store.dispatch('fetchCategoryById', record.categoryId);

                this.record = {
                    ...record,
                    categoryName: category.title,
                };
            }

            this.isLoading = false;
        },
        metaInfo() {
            return {
                title: this.$title('Detail_Title'),
            };
        },
        filters: { currencyFilter, dateFilter },
    };
</script>
