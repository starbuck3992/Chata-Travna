import { createWebHistory, createRouter } from "vue-router";

//Public
import LandingPage from "../components/public/LandingPage";
import HomeIndex from "../components/public/home/HomeIndex";
import ReservationForm from "../components/public/home/ReservationForm";
import Contact from "../components/public/home/Contact";

import NotFound from '../components/public/404'

//Admin
import AdminPage from '../components/admin/AdminPage'
import Dashboard from '../components/admin/Dashboard'
import AdminReservationsIndex from '../components/admin/reservations/Index'

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
                path: 'reservations',
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
            }
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
