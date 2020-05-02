<template>
    <div>
        <div class="page-title">
            <h3>Планирование</h3>
            <h4>{{ info.bill | currency }}</h4>
        </div>

        <Loader v-if="isLoading" />

        <h6 v-else-if="!categories.length">
            Категорий нет.
            <router-link to="/categories">Добавить новую.</router-link>
        </h6>

        <section v-else>
            <div v-for="category of categories" :key="category.id">
                <p>
                    <strong>{{ category.title }}:</strong>
                    {{ category.spend | currency }} из {{ category.limit | currency }}
                </p>

                <div class="progress" v-tooltip="category.tooltipText">
                    <div class="determinate"
                         :class="category.progressColor"
                         :style="{ width: category.progressPercent + '%' }"
                    />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import currency from '@/filters/currency';
    import tooltip from '@/directives/tooltip';

    export default {
        data: () => ({
            isLoading: true,
            categories: [],
        }),
        computed: {
            ...mapGetters(['info']),
        },
        async mounted() {
            const records = await this.$store.dispatch('fetchRecords');
            const categories = await this.$store.dispatch('fetchCategories');
            this.isLoading = false;
            this.categories = categories.map(category => {
                const spend = records
                    .filter(r => r.categoryId === category.id)
                    .filter(r => r.type === 'outcome')
                    .reduce((total, record) => total + record.amount, 0);
                const percent = (100 * spend) / category.limit;
                const progressPercent = Math.min(percent, 100);
                const progressColor = percent < 60 ? 'green' : percent <= 100 ? 'yellow' : 'red';
                const tooltipValue = category.limit - spend;
                const tooltipText = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${currency(Math.abs(tooltipValue))}`;

                return {
                    ...category,
                    progressPercent,
                    progressColor,
                    spend,
                    tooltipText,
                };
            });
        },
        directives: { tooltip },
        filters: { currency },
    };
</script>
