import { database } from 'firebase';

export default {
    state: {
        info: {},
    },
    getters: {
        info: state => state.info,
    },
    mutations: {
        setInfo(state, info) {
            state.info = info;
        },
        clearInfo(state) {
            state.info = {};
        },
    },
    actions: {
        async fetchInfo({ dispatch, commit }) {
            try {
                const uid = await dispatch('getUid');
                const info = (await database().ref(`/users/${uid}/info`).once('value')).val();

                commit('setInfo', info);
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
        async updateInfo({ dispatch, commit, getters }, updateInfo) {
            try {
                const uid = await dispatch('getUid');
                const info = { ...getters.info, ...updateInfo };

                await database().ref(`/users/${uid}/info`).update(info);
                commit('setInfo', info);
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
    },
};
