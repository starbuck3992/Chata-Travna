import router from './router'
import store from './store'
import Loading from './components/Loading';
import Success from './components/Success';
import Exception from './components/Exception';
import VCalendar from 'v-calendar';

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
    }
})

app.component('loading', Loading);
app.component('success', Success);
app.component('exception', Exception);
app.use(router);
app.use(store);
app.use(VCalendar);
app.mount('#app');
