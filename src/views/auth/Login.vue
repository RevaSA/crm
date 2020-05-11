<template>
    <form class="card auth-card" @submit.prevent="onSubmit">
        <div class="card-content">
            <span class="card-title">{{ 'CRM_Title' | localize }}</span>

            <div class="input-field">
                <input id="email" type="text"
                       v-model.trim="email"
                       :class="{
                           invalid: $v.email.$dirty && !($v.email.required && $v.email.email)
                       }"
                >
                <label for="email">Email</label>
                <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.required">
                    {{ 'Message_EmailRequired' | localize }}
                </small>
                <small class="helper-text invalid" v-else-if="$v.email.$dirty && !$v.email.email">
                    {{ 'Message_EmailValid' | localize }}
                </small>
            </div>

            <div class="input-field">
                <input id="password" type="password"
                       v-model.trim="password"
                       :class="{
                           invalid: $v.password.$dirty && !($v.password.required && $v.password.minLength)
                       }"
                >
                <label for="password">{{ 'Password' | localize }}</label>
                <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.required">
                    {{ 'Message_EnterPassword' | localize }}
                </small>
                <small class="helper-text invalid" v-else-if="$v.password.$dirty && !$v.password.minLength">
                    {{ 'Message_MinLength' | localize }} {{ $v.password.$params.minLength.min }}
                </small>
            </div>
        </div>

        <div class="card-action">
            <button class="btn waves-effect waves-light auth-submit">
                {{ 'Login' | localize }}
                <i class="material-icons right">send</i>
            </button>

            <p class="center">
                {{ 'NoAccount' | localize }}
                <router-link to="/register">{{ 'Register' | localize }}</router-link>
            </p>
        </div>
    </form>
</template>

<script>
    import { validationMixin } from 'vuelidate';
    import { required, email, minLength } from 'vuelidate/lib/validators';
    import localize from '@/filters/localize';

    const messages = {
        login: 'FirstLogin',
        logout: 'Logout',
    };

    export default {
        data: () => ({
            email: '',
            password: '',
        }),
        mounted() {
            this.$message(localize(messages[this.$route.query.message]));
        },
        methods: {
            async onSubmit() {
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }

                const data = {
                    email: this.email,
                    password: this.password,
                };

                try {
                    await this.$store.dispatch('login', data);
                    this.$router.push('/');
                } catch (e) {}
            },
        },
        metaInfo() {
            return {
                title: this.$title('Login'),
            };
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
