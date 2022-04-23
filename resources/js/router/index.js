import { createWebHistory, createRouter } from "vue-router";

//Public
import LandingPage from "../components/public/LandingPage";
import HomeIndex from "../components/public/home/HomeIndex";
import ReservationForm from "../components/public/home/ReservationForm";
import Contact from "../components/public/home/Contact";

import NotFound from '../components/public/404'

//Admin
import AdminPage from '../components/admin/AdminPage'
import Reservations from '../components/admin/Reservations'
import Settings from '../components/admin/Settings'

//Auth
import Login from '../components/auth/Login'
import ForgotPassword from '../components/auth/ForgotPassword'
import ResetPassword from '../components/auth/ResetPassword'

//Routes
const routes = [
    {
        path: '/admin',
        component: AdminPage,
        children: [
            {
                path: '',
                name: 'reservations',
                component: Reservations,
            },
            {
                path: 'settings',
                name: 'settings',
                component: Settings,
            },
        ]
    },
    {
        path: '/',
        component: LandingPage,
        meta: {
            hideHeader: false,
            showValue : "Chata Travná",
        },
        children: [
            {
                path: '',
                name: 'homeIndex',
                component: HomeIndex,
                meta: {
                    hideHeader: false,
                    showValue : "Chata Travná",
                },
            },
            {
                path: 'rezervace',
                name: 'reservationsForm',
                component: ReservationForm,
                meta: {
                    hideHeader: true,
                    showValue : "Rezervace",
                },
            },
            {
                path: 'contact',
                name: 'contact',
                component: Contact,
                meta: {
                    hideHeader: true,
                    showValue : "Kontakt",
                },
            },
        ]
    },

    //Auth
    {
        path: '/auth/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/auth/forgotPassword',
        name: 'forgotPassword',
        component: ForgotPassword,
    },
    {
        path: '/auth/resetPassword',
        name: 'resetPassword',
        component: ResetPassword,
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
