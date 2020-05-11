export default {
    actions: {
        async fetchCurrency() {
            const res = await fetch('https://api.openrates.io/latest?symbols=RUB,USD');
            const json = await res.json();

            json.rates.EUR = 1;

            return json;
        },
    },
};
