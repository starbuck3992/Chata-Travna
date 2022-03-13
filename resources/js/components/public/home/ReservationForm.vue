<template>
    <form @submit.prevent="submit" class="space-y-8 divide-y divide-gray-200 max-w-5xl mx-auto">
        <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-4 gap-6">
                    <div class="col-span-4">
                        Vyberte termín
                    </div>
                    <div class="col-span-2">
                        <v-date-picker
                            trim-weeks
                            is-range
                            is-expanded
                            v-model="form.reservationRange"
                            is-required
                            locale="cs"
                            :model-config="datePickerSettings.modelConfig"
                        >
                        </v-date-picker>
                    </div>
                    <div class="col-span-2 space-y-2">
                        <p><span class="font-semibold">Od: </span>{{ currentReservation.start }}</p>
                        <p><span class="font-semibold">Do: </span>{{ currentReservation.end }}</p>
                        <p><span class="font-semibold">Počet nocí: </span>{{ currentReservation.totalNights }}</p>
                        <p><span class="font-semibold">Cena za 1 noc: </span>{{ currentReservation.pricePerNight }}
                        </p>
                        <p><span class="font-semibold">Cena celkem: </span>{{ currentReservation.totalPrice }}</p>
                    </div>
                    <div class="col-span-2">
                        <label for="first-name"
                               class="block text-sm font-medium text-gray-700">Jméno</label>
                        <input required v-model="form.name" type="text" name="first-name"
                               id="first-name"
                               autocomplete="given-name"
                               class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                    </div>

                    <div class="col-span-2">
                        <label for="last-name"
                               class="block text-sm font-medium text-gray-700">Příjmení</label>
                        <input required v-model="form.surname" type="text" name="last-name"
                               id="last-name"
                               autocomplete="family-name"
                               class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                    </div>

                    <div class="col-span-2">
                        <label for="email-address"
                               class="block text-sm font-medium text-gray-700">Email</label>
                        <input required v-model="form.email" type="text" name="email-address"
                               id="email-address"
                               autocomplete="email"
                               class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                    </div>

                    <div class="col-span-2">
                        <label for="phone-number"
                               class="block text-sm font-medium text-gray-700">Telefon</label>
                        <input required v-model="form.phone" type="tel" name="phone-number"
                               id="phone-number"
                               class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                    </div>
                    <div class="col-span-2">
                        <label for="adult-count"
                               class="block text-sm font-medium text-gray-700">Počet
                            dospělých</label>
                        <input required v-model="form.adultCount" type="number" min="1" max="4"
                               name="adult-count"
                               id="adult-count"
                               class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                    </div>

                    <div class="col-span-2">
                        <label for="child-count"
                               class="block text-sm font-medium text-gray-700">Počet
                            dětí</label>
                        <input required v-model="form.childCount" type="number" min="0" max="4"
                               name="child-count"
                               id="child-count"
                               class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                    </div>

                    <div class="col-span-4">
                        <div class="flex items-center h-5">
                            <input v-model="form.pet" id="pet" name="pet" type="checkbox"
                                   class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                            <div class="ml-3 text-sm">
                                <label for="pet" class="font-medium text-gray-700">Domácí
                                    mazlíček</label>
                            </div>
                        </div>
                    </div>
                </div>

                <input
                    v-model="form.title"
                    type="hidden"
                    id="title"
                    name="title"
                />
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <p>Odesláním rezervačního formuláře souhlasíte se zpracováním osobních údajů dle
                    <b>GDPR</b>.
                </p>
                <button type="submit"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Rezervovat
                </button>
            </div>
        </div>
    </form>
</template>

<script>
import moment from "moment";
import {computed, onMounted, reactive, ref} from "vue";
import {useStore} from "vuex";
import Form from "../../../utilities/form";
import Api from "../../../services/api";

export default {
    setup() {
        const store = useStore();

        const datePickerSettings = {
            modelConfig: {
                type: 'string',
                mask: 'YYYY-MM-DD',
            }
        }

        const currentReservations = ref([]);

        const reservationSettings = reactive({
            pricePerNight: 2500,
        })

        const form =
            reactive(new Form({
                title: '',
                reservationRange: {
                    start: '',
                    end: '',
                    span: 2
                },
                name: 'a',
                surname: 'a',
                email: 'a',
                phone: 123456789,
                adultCount: 1,
                childCount: 0,
                pet: 0
            }));

        const currentReservation = computed(() => {
                if (form.reservationRange.start && form.reservationRange.end) {


                    let start = moment(form.reservationRange.start);
                    let end = moment(form.reservationRange.end);

                    let days = end.diff(start, 'days');
                    let totalPrice = (reservationSettings.pricePerNight * days).toLocaleString('cs');

                    return {
                        start: start.locale('cs').format('D. M. YYYY'),
                        end: end.locale('cs').format('D. M. YYYY'),
                        totalNights: days,
                        pricePerNight: `${reservationSettings.pricePerNight.toLocaleString('cs')} Kč`,
                        totalPrice: `${totalPrice} Kč`
                    }
                } else {
                    return {
                        start: '',
                        end: '',
                        totalNights: '',
                        pricePerNight: '',
                        totalPrice: ''
                    }
                }
            }
        )

        const attrs = ref([
            {
                highlight: {
                    color: 'black',
                    fillMode: 'solid',

                },
                dates: {start: new Date(2022, 3, 9), end: new Date(2022, 7, 11)},
            },
            {
                highlight: {
                    color: 'red',
                    fillMode: 'solid',

                },
                dates: {start: new Date(2022, 3, 6), end: new Date(2022, 3, 8)},
            },
            {
                highlight: {
                    color: 'green',
                    fillMode: 'solid',

                },
                dates: {start: new Date(2022, 3, 1), end: new Date(2022, 3, 5)},
            },
        ])

        const maxDate = computed(() => {
            let dt = new Date();
            return dt.setFullYear(dt.getFullYear() + 1)
        });

        onMounted(() => {
                Api.get('/api/reservations').then(response => {
                        console.log(response)
                    }
                ).catch((error) => {
                    if (error.response) {
                        store.dispatch('messagesModule/showException', error.response.data.message);
                    } else {
                        console.log(error);
                    }
                })
            }
        )

        function submit() {
            console.log(form.objectToFormData().values());

            Api.post('/api/reservations', form.objectToFormData()).then((response) => {
                store.dispatch('messagesModule/showSuccess', response.data.message);
            }).catch((error) => {
                if (error.response) {
                    if (error.response.status === 422) {
                        form.onFail(error.response.data.errors);
                    } else {
                        store.dispatch('messagesModule/showException', error.response.data.message);
                    }
                } else {
                    console.log(error);
                }
            })
        }

        return {
            form,
            attrs,
            maxDate,
            reservationSettings,
            currentReservation,
            datePickerSettings,
            submit
        }
    }
}
</script>
