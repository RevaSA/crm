/* eslint-disable no-unused-vars */

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
            await firebase.auth().createUserWithEmailAndPassword(email, password);

            const uid = await dispatch('getUid');
            const info = {
                bill: 10000,
                name,
            };

            await firebase.database().ref(`/users/${uid}/info`).set(info);
        },
        async login({ dispatch, commit }, { email, password }) {
            await firebase.auth().signInWithEmailAndPassword(email, password);
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
