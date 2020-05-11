<template>
    <div>
        <div class="page-subtitle">
            <h4>{{ 'Create' | localize }}</h4>
        </div>

        <form @submit.prevent="onSubmit">
            <div class="input-field">
                <input id="create-name"
                       type="text"
                       v-model="title"
                       :class="{
                           invalid: $v.title.$dirty && !$v.title.required
                       }"
                >
                <label for="create-name">{{ 'Title' | localize }}</label>
                <small class="helper-text invalid" v-if="$v.title.$dirty && !$v.title.required">
                    {{ 'Message_CategoryTitle' | localize }}
                </small>
            </div>

            <div class="input-field">
                <input id="create-limit"
                       type="number"
                       v-model.number="limit"
                       :class="{
                           invalid: $v.limit.$dirty && !($v.limit.required && $v.limit.minValue)
                       }"
                >
                <label for="create-limit">{{ 'Limit' | localize }}</label>
                <small class="helper-text invalid" v-if="$v.limit.$dirty && !$v.limit.required">
                    {{ 'Message_EnterLimit' | localize }}
                </small>
                <small class="helper-text invalid" v-else-if="$v.limit.$dirty && !$v.limit.minValue">
                    {{ 'Message_MinLength' | localize }} {{ $v.limit.$params.minValue.min }}
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

    const MIN_LIMIT = 100;

    export default {
        data: () => ({
            title: '',
            limit: MIN_LIMIT,
        }),
        methods: {
            async onSubmit() {
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }

                const category = await this.$store.dispatch('createCategory', {
                    title: this.title,
                    limit: this.limit,
                });

                this.title = '';
                this.limit = MIN_LIMIT;
                this.$v.$reset();
                this.$message(localize('Category_HasBeenCreated'));
                this.$emit('created', category);
            },
        },
        mounted() {
            window.M.updateTextFields();
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
