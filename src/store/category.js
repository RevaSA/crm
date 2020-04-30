import { database } from 'firebase/app';

export default {
    actions: {
        async fetchCategories({ dispatch, commit }) {
            try {
                const uid = await dispatch('getUid');
                const categoriesSnapshot = await database().ref(`/users/${uid}/category`).once('value');
                const categories = categoriesSnapshot.val() || {};

                return Object.entries(categories).map(([key, category]) => ({ id: key, ...category }));
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
        async createCategory({ dispatch, commit }, { title, limit }) {
            try {
                const uid = await dispatch('getUid');
                const category = await database().ref(`/users/${uid}/category`).push({ title, limit });

                return {
                    id: category.key,
                    title,
                    limit,
                };
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
        async updateCategory({ dispatch, commit }, { id, title, limit }) {
            try {
                const uid = await dispatch('getUid');

                await database().ref(`/users/${uid}/category`)
                    .child(id)
                    .update({ title, limit });
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
    },
};
