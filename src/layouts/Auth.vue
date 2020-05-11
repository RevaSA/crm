<template>
    <div class="grey darken-1 empty-layout">
        <router-view/>
    </div>
</template>

<script>
    import localize from '@/filters/localize';

    const messages = {
        defaultError: 'DefaultError',
        'auth/user-not-found': 'NoUserWithEmail',
        'auth/wrong-password': 'WrongPassword',
        'auth/email-already-in-use': 'EmailInUse',
    };

    export default {
        computed: {
            error() {
                return this.$store.getters.error;
            },
        },
        watch: {
            error(firebaseError) {
                this.$message(localize(messages[firebaseError.code] || messages.defaultError), 'error');
            },
        },
    };
</script>
