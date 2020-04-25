import firebase from 'firebase/app';

export default {
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        async register({ dispatch, commit }, { email, password, name }) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password);

                const uid = await dispatch('getUid');
                const info = {
                    bill: 10000,
                    name,
                };

                await firebase.database().ref(`/users/${uid}/info`).set(info);
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
        async login({ commit }, { email, password }) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password);
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
        async logout() {
            await firebase.auth().signOut();
        },
        getUid() {
            const user = firebase.auth().currentUser;

            return user ? user.uid : null;
        },
    },
};
