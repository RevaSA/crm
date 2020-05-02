import { database } from 'firebase/app';

export default {
    actions: {
        async fetchRecords({ dispatch, commit }) {
            try {
                const uid = await dispatch('getUid');
                const recordsSnapshot = await database().ref(`/users/${uid}/records`).once('value');
                const records = recordsSnapshot.val() || {};

                return Object.entries(records).map(([key, record]) => ({ id: key, ...record }));
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
        async createRecord({ dispatch, commit }, record) {
            try {
                const uid = await dispatch('getUid');

                return await database().ref(`/users/${uid}/records`).push(record);
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
    },
};
