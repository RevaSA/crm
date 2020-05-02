import { database } from 'firebase/app';

export default {
    actions: {
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
