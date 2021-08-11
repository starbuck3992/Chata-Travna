window.axios = require('axios');
window._ = require('lodash');

import Vue from 'vue';
import router from './router';
import VCalendar from 'v-calendar';

require('bootstrap');

Vue.config.productionTip = false;
Vue.use(VCalendar);

const app = new Vue({
    el: '#app',
    components: {
        'App': { template: '<router-view></router-view>' },
    },
    router,
});
