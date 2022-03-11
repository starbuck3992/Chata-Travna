import Api from "../../services/api";

const user = {
    namespaced: true,
    state: {
        user: {
            id: null,
            name: null,
        },
    },
    getters: {
        user(state) {
            return state.user;
        },
        loggedIn(state) {
            return !!state.user.id;
        }
    },
    mutations: {
        createSession(state, user) {
            state.user.id = user.id;
        },
        destroySession(state) {
            Object.keys(state.user).forEach(k => state.user[k] = null);
        }
    },
    actions: {
        async register({}, payload) {
            await Api.get('/sanctum/csrf-cookie');
            return new Promise((resolve, reject) => {
                Api.post('/register', payload).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        async login({commit}, payload) {
            await Api.get('/sanctum/csrf-cookie');
            return new Promise((resolve, reject) => {
                Api.post('/login', payload).then((response) => {
                    commit('createSession', response.data);
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        async forgotPassword({}, payload) {
            await Api.get('/sanctum/csrf-cookie');
            return new Promise((resolve, reject) => {
                Api.post('/forgot-password', payload).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                Api.post('/logout').then((response) => {
                    commit('destroySession')
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        }
    }
};

export default user;
