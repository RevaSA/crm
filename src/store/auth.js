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
        async login({ dispatch, commit }, { email, password }) {
            await firebase.auth().signInWithEmailAndPassword(email, password);
        },
    },
};
