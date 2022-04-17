import router from './router'
import store from './store'
import Loading from './components/Loading';
import Success from './components/Success';
import Exception from './components/Exception';
import VCalendar from 'v-calendar';
import {useStore} from "vuex";
import {onMounted} from "vue";
import Api from "./services/api";

window.Vue = require('vue')
window.axios = require('axios')
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const app = Vue.createApp({
    el: '#app',
    components: {
        'App': {
            template:
                '<loading></loading>' +
                '<router-view></router-view>' +
                '<success></success>' +
                '<exception></exception>'
        },
    },
    setup() {
        const store = useStore();

        onMounted(() => {
                try {
                    Api.get('/api/edits').then((response) => {
                        console.log('response: ', response.data);
                        store.commit('editableModule/saveData', response.data);
                    }
                    ).catch((error) => {
                        console.log(error);
                    })
                } catch (error) {
                    if (error.response) {
                        store.commit('messagesModule/setException', error.response.data.message);
                    } else {
                        console.log(error);
                    }
                }
        })
    }
})

app.component('loading', Loading);
app.component('success', Success);
app.component('exception', Exception);
app.use(router);
app.use(store);
app.use(VCalendar);
app.mount('#app');
