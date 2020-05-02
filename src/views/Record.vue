<template>
    <div>
        <div class="page-title">
            <h3>Новая запись</h3>
        </div>

        <Loader v-if="isLoading" />

        <h6 v-else-if="!categories.length">
            Категорий нет.
            <router-link to="/categories">Добавить новую.</router-link>
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
                <label>Выберите категорию</label>
            </div>

            <p>
                <label>
                    <input class="with-gap" name="type" type="radio" value="income" v-model="type"/>
                    <span>Доход</span>
                </label>
            </p>

            <p>
                <label>
                    <input class="with-gap" name="type" type="radio" value="outcome" v-model="type"/>
                    <span>Расход</span>
                </label>
            </p>

            <div class="input-field">
                <input id="amount"
                       type="number"
                       v-model.number="amount"
                       :class="{ invalid: $v.amount.$dirty && !($v.amount.required && $v.amount.minValue) }"
                >
                <label for="amount">Сумма</label>
                <small class="helper-text invalid" v-if="$v.amount.$dirty && !$v.amount.required">
                    Введите сумму
                </small>
                <small class="helper-text invalid" v-else-if="$v.amount.$dirty && !$v.amount.minValue">
                    Минимальное значение {{ $v.amount.$params.minValue.min }}
                </small>
            </div>

            <div class="input-field">
                <input id="description"
                       type="text"
                       v-model.trim="description"
                       :class="{ invalid: $v.description.$dirty && !$v.description.required }"
                >
                <label for="description">Описание</label>
                <small class="helper-text invalid" v-if="$v.description.$dirty && !$v.description.required">
                    Введите описание
                </small>
            </div>

            <button class="btn waves-effect waves-light">
                Создать
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
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
                    this.$message(`Недостаточно средств на счёте (${this.amount - this.info.bill})`);
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
                this.$message('Запись успешно создана');
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
