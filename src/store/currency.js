export default {
    actions: {
        async fetchCurrency() {
            const key = process.env.VUE_APP_FIXER;
            const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=RUB,USD,EUR`);

            return res.json();
        },
    },
};
