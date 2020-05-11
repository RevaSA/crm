<template>
    <div>
        <div class="page-title">
            <h3>{{ 'Menu_NewRecord' | localize }}</h3>
        </div>

        <Loader v-if="isLoading" />

        <h6 v-else-if="!categories.length">
            {{ 'NoCategories' | localize }}.
            <router-link to="/categories">{{ 'AddFirst' | localize }}.</router-link>
        </h6>

        <form v-else class="form" @submit.prevent="onSubmit">
            <div class="input-field">
                <select ref="select" v-model="category">
                    <option
                        v-for="category of categories"
                        :key="category.id"
                        :value="category.id"
                    >{{ category.title }}</option>
                </select>
                <label>{{ 'SelectCategory' | localize }}</label>
            </div>

            <p>
                <label>
                    <input class="with-gap" name="type" type="radio" value="income" v-model="type"/>
                    <span>{{ 'Income' | localize }}</span>
                </label>
            </p>

            <p>
                <label>
                    <input class="with-gap" name="type" type="radio" value="outcome" v-model="type"/>
                    <span>{{ 'Outcome' | localize }}</span>
                </label>
            </p>

            <div class="input-field">
                <input id="amount"
                       type="number"
                       v-model.number="amount"
                       :class="{ invalid: $v.amount.$dirty && !($v.amount.required && $v.amount.minValue) }"
                >
                <label for="amount">{{ 'Amount' | localize }}</label>
                <small class="helper-text invalid" v-if="$v.amount.$dirty && !$v.amount.required">
                    {{ 'Message_EnterAmount' | localize }}
                </small>
                <small class="helper-text invalid" v-else-if="$v.amount.$dirty && !$v.amount.minValue">
                    {{ 'Message_MinLength' | localize }} {{ $v.amount.$params.minValue.min }}
                </small>
            </div>

            <div class="input-field">
                <input id="description"
                       type="text"
                       v-model.trim="description"
                       :class="{ invalid: $v.description.$dirty && !$v.description.required }"
                >
                <label for="description">{{ 'Description' | localize }}</label>
                <small class="helper-text invalid" v-if="$v.description.$dirty && !$v.description.required">
                    {{ 'Message_EnterDescription' | localize }}
                </small>
            </div>

            <button class="btn waves-effect waves-light">
                {{ 'Create' | localize }}
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
    import localize from '@/filters/localize';
    import { validationMixin } from 'vuelidate';
    import { required, minValue } from 'vuelidate/lib/validators';
    import { mapGetters } from 'vuex';

    const MIN_AMOUNT = 1;

    export default {
        data: () => ({
            isLoading: true,
            categories: [],
            category: null,
            type: 'outcome',
            amount: MIN_AMOUNT,
            description: '',
        }),
        computed: {
            ...mapGetters(['info']),
            canCreate() {
                if (this.type === 'income') {
                    return true;
                }

                return this.info.bill >= this.amount;
            },
        },
        methods: {
            async onSubmit() {
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }

                if (!this.canCreate) {
                    this.$message(`${localize('NotEnoughMoney')} (${this.amount - this.info.bill})`);
                    return;
                }

                const bill = this.type === 'income'
                    ? this.info.bill + this.amount
                    : this.info.bill - this.amount;
                const data = {
                    categoryId: this.category,
                    type: this.type,
                    amount: this.amount,
                    description: this.description,
                    date: (new Date()).toJSON(),
                };

                await this.$store.dispatch('createRecord', data);
                await this.$store.dispatch('updateInfo', { bill });
                this.$message(localize('RecordHasBeenCreated'));
                this.type = 'outcome';
                this.amount = MIN_AMOUNT;
                this.description = '';
                this.$v.$reset();
            },
        },
        async mounted() {
            this.categories = await this.$store.dispatch('fetchCategories');
            this.isLoading = false;

            if (this.categories.length) {
                this.category = this.categories[0].id;
            }

            this.$nextTick(() => {
                this.select = window.M.FormSelect.init(this.$refs.select);
                window.M.updateTextFields();
            });
        },
        destroyed() {
            this.select && this.select.destroy && this.select.destroy();
        },
        metaInfo() {
            return {
                title: this.$title('Menu_NewRecord'),
            };
        },
        validations: {
            amount: {
                required,
                minValue: minValue(MIN_AMOUNT),
            },
            description: {
                required,
            },
        },
        mixins: [validationMixin],
    };
</script>
