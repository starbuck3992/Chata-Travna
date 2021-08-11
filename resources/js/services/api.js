import axios from "axios";

export const client = axios.create({
    withCredentials: true,
});

export default {
    getAdminReservations () {
        return client.get('/api/admin/reservations');
    },
    getReservations () {
        return client.get('/api/reservations');
    },
    postReservation (payload) {
        return client.post('/api/reservations',payload)
    }
};
