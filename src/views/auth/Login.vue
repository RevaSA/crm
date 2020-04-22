<template>
    <form class="card auth-card" @submit.prevent="onSubmit">
        <div class="card-content">
            <span class="card-title">Домашняя бухгалтерия</span>

            <div class="input-field">
                <input id="email" type="text"
                       v-model.trim="email"
                       :class="{
                           invalid: $v.email.$dirty && !($v.email.required && $v.email.email)
                       }"
                >
                <label for="email">Email</label>
                <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.required">
                    Введите почту
                </small>
                <small class="helper-text invalid" v-else-if="$v.email.$dirty && !$v.email.email">
                    Введите корректный Email
                </small>
            </div>

            <div class="input-field">
                <input id="password" type="password"
                       v-model.trim="password"
                       :class="{
                           invalid: $v.password.$dirty && !($v.password.required && $v.password.minLength)
                       }"
                >
                <label for="password">Пароль</label>
                <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.required">
                    Введите пароль
                </small>
                <small class="helper-text invalid" v-else-if="$v.password.$dirty && !$v.password.minLength">
                    Пароль должен быть {{ $v.password.$params.minLength.min }} символов
                </small>
            </div>
        </div>

        <div class="card-action">
            <button class="btn waves-effect waves-light auth-submit">
                Войти
                <i class="material-icons right">send</i>
            </button>

            <p class="center">
                Нет аккаунта?
                <router-link to="/register">Зарегистрироваться</router-link>
            </p>
        </div>
    </form>
</template>

<script>
    import { validationMixin } from 'vuelidate';
    import { required, email, minLength } from 'vuelidate/lib/validators';

    export default {
        data: () => ({
            email: '',
            password: '',
        }),
        methods: {
            onSubmit() {
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }

                const data = {
                    email: this.email,
                    password: this.password,
                };

                console.log(data);
                this.$router.push('/');
            },
        },
        validations: {
            email: {
                required,
                email,
            },
            password: {
                required,
                minLength: minLength(6),
            },
        },
        mixins: [validationMixin],
    };
</script>
