import Api from "../../services/api";

const user = {
    namespaced: true,
    state: {
        user: {
            name: null
        },
    },
    getters: {
        user(state) {
            return state.user;
        },
        loggedIn(state) {
            return !!state.user.name;
        }
    },
    mutations: {
        createSession(state, user) {
            state.user.name = user.name;
        },
        destroySession(state) {
            Object.keys(state.user).forEach(k => state.user[k] = null);
        }
    },
    actions: {
        async login({commit}, payload) {
            try {
                await Api.get('/sanctum/csrf-cookie');
                const response = await Api.post('/login', payload);
                commit('createSession', response.data);
                return response;
            } catch (error) {
                return error
            }
        },
        async forgotPassword({commit}, payload) {
            try {
                await Api.get('/sanctum/csrf-cookie');
                return await Api.post('/forgot-password', payload);
            } catch (error) {
                return error
            }
        },
        async resetPassword({commit}, payload) {
            try {
                await Api.get('/sanctum/csrf-cookie');
                return await Api.post('/reset-password', payload);
            } catch (error) {
                return error
            }
        },
        async updatePassword({commit}, payload) {
            try {
                await Api.get('/sanctum/csrf-cookie');
                return await Api.put('/user/password', payload);
            } catch (error) {
                return error
            }
        },
        async logout({commit}) {
            try {
                await Api.post('/logout');
                commit('destroySession');
            } catch (error) {
                return error
            }
        }
    }
};

export default user;
