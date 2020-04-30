<template>
    <div>
        <div class="page-title">
            <h3>Категории</h3>
        </div>

        <Loader v-if="isLoading" />

        <div v-else class="row">
            <div class="col s12 m6">
                <Create @created="addNewCategory" />
            </div>

            <div class="col s12 m6">
                <Edit
                    @updated="updatedCategory"
                    :categories="categories"
                    :key="categories.length + updateCount"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import Create from '@/components/category/Create';
    import Edit from '@/components/category/Edit';

    export default {
        data: () => ({
            isLoading: true,
            categories: [],
            updateCount: 0,
        }),
        methods: {
            addNewCategory(category) {
                this.categories.push(category);
            },
            updatedCategory({ id, title, limit }) {
                const index = this.categories.findIndex((category) => category.id === id);

                this.categories[index].title = title;
                this.categories[index].limit = limit;
                this.updateCount++;
            },
        },
        async mounted() {
            this.categories = await this.$store.dispatch('fetchCategories');
            this.isLoading = false;
        },
        components: {
            Create,
            Edit,
        },
    };
</script>
