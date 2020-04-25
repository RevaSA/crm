<template>
    <div class="grey darken-1 empty-layout">
        <router-view/>
    </div>
</template>

<script>
    const messages = {
        defaultError: 'Что-то пошло не так',
        'auth/user-not-found': 'Пользователя с таким email не существует',
        'auth/wrong-password': 'Неверный пароль',
        'auth/email-already-in-use': 'Email уже занят',
    };

    export default {
        computed: {
            error() {
                return this.$store.getters.error;
            },
        },
        watch: {
            error(firebaseError) {
                this.$message(messages[firebaseError.code] || messages.defaultError, 'error');
            },
        },
    };
</script>
