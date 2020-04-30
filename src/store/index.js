import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import info from './info';
import currency from './currency';
import category from './category';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        error: null,
    },
    getters: {
        error: (state) => state.error,
    },
    mutations: {
        setError(state, error) {
            state.error = error;
        },
        clearError(state) {
            state.error = null;
        },
    },
    actions: {
    },
    modules: {
        auth,
        info,
        currency,
        category,
    },
});
