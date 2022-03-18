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
        children: [
            {
                path: '',
                name: 'homeIndex',
                component: HomeIndex,
            },
            {
                path: 'reservations',
                name: 'reservationsForm',
                component: ReservationForm,
            },
            {
                path: 'contact',
                name: 'contact',
                component: Contact,
            }
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
