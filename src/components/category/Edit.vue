<template>
    <div>
        <div class="page-subtitle">
            <h4>{{ 'Edit' | localize }}</h4>
        </div>

        <form v-if="categories.length" @submit.prevent="onSubmit">
            <div class="input-field">
                <select ref="select" v-model="current">
                    <option
                        v-for="category of categories"
                        :key="category.id"
                        :value="category.id"
                    >{{ category.title }}</option>
                </select>
                <label>{{ 'SelectCategory' | localize }}</label>
            </div>

            <div class="input-field">
                <input id="update-name"
                       type="text"
                       v-model="title"
                       :class="{
                           invalid: $v.title.$dirty && !$v.title.required
                       }"
                >
                <label for="update-name">{{ 'Title' | localize }}</label>
                <small class="helper-text invalid" v-if="$v.title.$dirty && !$v.title.required">
                    {{ 'Message_CategoryTitle' | localize }}
                </small>
            </div>

            <div class="input-field">
                <input id="update-limit"
                       type="number"
                       v-model.number="limit"
                       :class="{
                           invalid: $v.limit.$dirty && !($v.limit.required && $v.limit.minValue)
                       }"
                >
                <label for="update-limit">{{ 'Limit' | localize }}</label>
                <small class="helper-text invalid" v-if="$v.limit.$dirty && !$v.limit.required">
                    {{ 'Message_EnterLimit' | localize }}
                </small>
                <small class="helper-text invalid" v-else-if="$v.limit.$dirty && !$v.limit.minValue">
                    {{ 'Message_MinLength' | localize }} {{ $v.limit.$params.minValue.min }}
                </small>
            </div>

            <button class="btn waves-effect waves-light">
                {{ 'Update' | localize }}
                <i class="material-icons right">send</i>
            </button>
        </form>

        <h6 v-else>{{ 'NoCategories' | localize }}</h6>
    </div>
</template>

<script>
    import localize from '@/filters/localize';
    import { validationMixin } from 'vuelidate';
    import { required, minValue } from 'vuelidate/lib/validators';

    const MIN_LIMIT = 100;

    export default {
        props: {
            categories: {
                type: Array,
                required: true,
            },
        },
        data: () => ({
            select: null,
            current: null,
            title: '',
            limit: MIN_LIMIT,
        }),
        watch: {
            current(value) {
                this.updateValues(this.categories.find(({ id }) => id === value));
            },
        },
        methods: {
            updateValues({ id, title, limit }) {
                this.current = id;
                this.title = title;
                this.limit = limit;
            },
            async onSubmit() {
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }

                const data = {
                    id: this.current,
                    title: this.title,
                    limit: this.limit,
                };

                await this.$store.dispatch('updateCategory', data);
                this.$message(localize('Category_HasBeenUpdated'));
                this.$emit('updated', data);
            },
        },
        created() {
            this.updateValues(this.categories[0]);
        },
        mounted() {
            this.select = window.M.FormSelect.init(this.$refs.select);
            window.M.updateTextFields();
        },
        destroyed() {
            this.select && this.select.destroy && this.select.destroy();
        },
        validations: {
            title: {
                required,
            },
            limit: {
                required,
                minValue: minValue(MIN_LIMIT),
            },
        },
        mixins: [validationMixin],
    };
</script>
