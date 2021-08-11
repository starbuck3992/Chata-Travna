import Vue from 'vue';
import VueRouter from 'vue-router';

//Public
import LandingPage from "../components/public/LandingPage";
import Home from "../components/public/home/Home"
import NotFound from '../components/public/404'

//Admin
import AdminPage from '../components/admin/AdminPage'
import Dashboard from '../components/admin/Dashboard'
import AdminReservationsIndex from '../components/admin/reservations/Index'

Vue.use(VueRouter);

//Routes
const routes = [
    {
        path: '/admin',
        component: AdminPage,
        children: [
            {
                path: '',
                name: 'dashboard',
                component: Dashboard,
            },
            {
                path: 'reservations',
                name: 'adminReservationsIndex',
                component: AdminReservationsIndex,
            }
        ]
    },
    {
        path: '/',
        component: LandingPage,
        children: [
            {
                path: '',
                name: 'home',
                component: Home,
            }
        ]
    },
    {
        path: '/404',
        alias: '*',
        component:NotFound
    },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
