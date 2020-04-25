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

            <div class="input-field">
                <input id="repeat-password" type="password"
                       v-model.trim="repeatPassword"
                       :class="{
                           invalid: $v.repeatPassword.$dirty && !$v.repeatPassword.sameAsPassword
                       }"
                >
                <label for="repeat-password">Повторите пароль</label>
                <small class="helper-text invalid" v-if="$v.repeatPassword.$dirty && !$v.repeatPassword.sameAsPassword">
                    Пароли не совпадают
                </small>
            </div>

            <div class="input-field">
                <input id="name" type="text"
                       v-model.trim="name"
                       :class="{
                           invalid: $v.name.$dirty && !$v.name.required
                       }"
                >
                <label for="name">Имя</label>
                <small class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">
                    Введите имя
                </small>
            </div>

            <label class="input-field">
                <input type="checkbox"
                       v-model="agree"
                       :class="{
                           invalid: $v.agree.$dirty && !$v.agree.checked
                       }"
                >
                <span>С правилами согласен</span>
            </label>
        </div>

        <div class="card-action">
            <button class="btn waves-effect waves-light auth-submit">
                Зарегистрироваться
                <i class="material-icons right">send</i>
            </button>

            <p class="center">
                Уже есть аккаунт?
                <router-link to="/login">Войти!</router-link>
            </p>
        </div>
    </form>
</template>

<script>
    import { validationMixin } from 'vuelidate';
    import {
        required, email, minLength, sameAs,
    } from 'vuelidate/lib/validators';

    export default {
        data: () => ({
            email: '',
            password: '',
            repeatPassword: '',
            name: '',
            agree: false,
        }),
        methods: {
            async onSubmit() {
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }

                const data = {
                    email: this.email,
                    password: this.password,
                    name: this.name,
                };

                try {
                    await this.$store.dispatch('register', data);
                    this.$router.push('/');
                } catch (e) {}
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
            repeatPassword: {
                sameAsPassword: sameAs('password'),
            },
            name: {
                required,
            },
            agree: {
                checked: (value) => value,
            },
        },
        mixins: [validationMixin],
    };
</script>
