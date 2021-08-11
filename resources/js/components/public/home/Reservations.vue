<template>
    <div class="container mt-5">
        <h1 class="navbar-title text-center mt-5">Rezervace</h1>
        <div class="row mt-5 gx-5">
            <div class="col-6">
                <form @submit.prevent="submit">
                    <label>Rezervovat OD</label>
                    <v-date-picker
                        trim-weeks
                        is-range
                        :masks="masks"
                        v-model="reservation.range"
                        v-on:nextPage="pageChange"
                        class="inline-block h-full">
                        <template v-slot="{ inputValue, inputEvents, isDragging, togglePopover }">
                            <div class="row mt-3">
                                <div class="col-4">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                                <span class="input-group-text" @click="togglePopover()">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                         fill="currentColor" class="bi bi-calendar-date"
                                                         viewBox="0 0 16 16">
                                                      <path
                                                          d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z"></path>
                                                      <path
                                                          d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"></path>
                                                    </svg>
                                                </span>
                                        </div>
                                        <input
                                            class="form-control bg-white text-gray-700"
                                            :value="inputValue.start"
                                            v-on="inputEvents.start"
                                            required
                                        />
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                                <span class="input-group-text" @click="togglePopover()">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                         fill="currentColor" class="bi bi-calendar-date"
                                                         viewBox="0 0 16 16">
                                                      <path
                                                          d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z"></path>
                                                      <path
                                                          d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"></path>
                                                    </svg>
                                                </span>
                                        </div>
                                        <input
                                            class="form-control bg-white text-gray-700"
                                            :value="inputValue.end"
                                            v-on="inputEvents.end"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </template>
                    </v-date-picker>
                    <div class="row mt-3">
                        <div class="col-4">
                            <label>Jméno</label>
                            <input type="text" class="form-control" required v-model="reservation.name">
                        </div>
                        <div class="col-4">
                            <label>Příjmení</label>
                            <input type="text" class="form-control" required v-model="reservation.surname">
                        </div>
                        <div class="col-4">
                            <label>Email</label>
                            <input type="email" class="form-control" required v-model="reservation.email">
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-4">
                            <label>Město</label>
                            <input type="text" class="form-control" required v-model="reservation.city">
                        </div>
                        <div class="col-4">
                            <label>Ulice</label>
                            <input type="text" class="form-control" required v-model="reservation.street">
                        </div>
                        <div class="col-4">
                            <label>PSČ</label>
                            <input type="text" class="form-control" required v-model="reservation.zip">
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-4">
                            <label>Počet dospělých</label>
                            <input type="text" class="form-control" required v-model="reservation.adult_count">
                        </div>
                        <div class="col-4">
                            <label>Počet dětí</label>
                            <input type="text" class="form-control" required v-model="reservation.child_count">
                        </div>
                        <div class="col-4">
                            <label>Domácí mazlíček</label>
                            <input type="checkbox" required v-model="reservation.pet">
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-6">
                            <p>Odesláním rezervačního formuláře souhlasíte se zpracováním osobních údajů dle <b>GDPR</b>.
                            </p>
                        </div>
                        <div class="col-6">
                            <button class="title-button">REZERVOVAT</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-6 text-center">
                <label>Obsazenost</label>
                <v-date-picker
                    :popover="{ visibility: 'focus' }"
                    v-model="range"
                    :attributes="attrs"
                    is-range
                    :disabled-dates="{ weekdays: [1, 7] }"
                />
            </div>
        </div>
    </div>
</template>

<script>
import api from "../../../services/api";

export default {
    data() {
        const date = new Date();
        return {
            reservation: {
                range: {
                    start: '',
                    end: ''
                },
                name: '',
                surname: '',
                email: '',
                city: '',
                street: '',
                zip: '',
                adult_count: '',
                child_count: '',
                pet: ''
            },
            range: {
                start: '',
                end: ''
            },
            attrs: [
                {
                    highlight: {
                        color: 'red',
                        fillMode: 'solid',

                    },
                    dates: {start: new Date(2021, 7, 7), end: new Date(2021, 7, 8)},
                },
            ],
            masks: {
                input: 'DD.MM.YYYY',
            },
            success: false,
            loading: ''
        }
    },
    mounted() {
        console.log('Component mounted.')
    },
    computed: {
        maxDate: function () {
            let dt = new Date();
            return dt.setFullYear(dt.getFullYear() + 1)
        }
    },
    methods: {
        pageChange(page) {
            console.log('test');
            const calendar = this.$refs.calendar
            calendar.move({month: page.month, year: page.year})
        },
        submit() {
            api.postReservation(this.reservation)
                .then(response => {
                    console.log('ok');
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => this.loading = false)
        }
    }
}
</script>

<style scoped>
</style>

