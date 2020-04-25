import firebase from 'firebase/app';

export default {
    state: {
        info: null,
    },
    getters: {
        info: (state) => state.info,
    },
    mutations: {
        setInfo(state, info) {
            state.info = info;
        },
        clearInfo(state) {
            state.info = null;
        },
    },
    actions: {
        async fetchInfo({ dispatch, commit }) {
            const uid = await dispatch('getUid');
            const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();

            commit('setInfo', info);
        },
    },
};
