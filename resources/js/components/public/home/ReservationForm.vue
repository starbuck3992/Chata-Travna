<template>
    <form @submit.prevent="submit" class="space-y-8 divide-y divide-gray-200 max-w-5xl mx-auto">
        <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-4 gap-6">
                    <div class="col-span-4">
                        Vyberte termín
                    </div>
                    <div class="col-span-2">
                    <Datepicker ref="datepicker" v-model:range="form.reservationRange" :reserved-dates="reservedDates" :min-date="minDate" :max-date="maxDate"></Datepicker>
                        <div
                            v-if="form.errors.has('reservationRange_start')"
                            class="mt-1 text-sm text-red-600"
                            v-text="form.errors.get('reservationRange_start')"
                        ></div>
                        <div
                            v-if="form.errors.has('reservationRange_end')"
                            class="mt-1 text-sm text-red-600"
                            v-text="form.errors.get('reservationRange_end')"
                        ></div>
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
                        <input required v-model="form.email" type="email" name="email-address"
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
                <button @click="clearRange">CLEAR RANGE</button>


                <button :disabled="!validateForm" type="submit"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Rezervovat
                </button>
            </div>
        </div>
    </form>
</template>

<script>
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/vue/solid'
import {computed, onMounted, reactive, ref} from "vue";
import {useStore} from "vuex";
import Form from "../../../utilities/form";
import Api from "../../../services/api";
import Datepicker from "../Datepicker";
import {DateTime} from "luxon";

const reservedDates = ['2022-04-16','2022-04-18']


export default {
    components: {Datepicker, ChevronLeftIcon, ChevronRightIcon},
    setup() {
        const store = useStore();
        const form = reactive(new Form({
                title: '',
                reservationRange: {
                    start: '',
                    end: ''
                },
                name: 'aaa',
                surname: 'a',
                email: 'mcvespr@gmail.com',
                phone: 123456789,
                adultCount: 1,
                childCount: 0,
                pet: 0
        }));

        const reservedDates = ref([]);

        const reservationSettings = reactive({
            pricePerNight: 2500,
        })
        const datepicker = ref();

        let currentDate = DateTime.now();
        const minDate = currentDate.startOf('day').toISODate();
        const maxDate = currentDate.startOf('day').plus({years: 1}).toISODate();

        const currentReservation = computed(() => {
                if (form.reservationRange.start && form.reservationRange.end) {
                    let start = DateTime.fromISO(form.reservationRange.start);
                    let end = DateTime.fromISO(form.reservationRange.end);

                    let days = end.diff(start, 'days').toObject().days;
                    let totalPrice = (reservationSettings.pricePerNight * days).toLocaleString('cs');

                    return {
                        start: start.toFormat('d. M. y'),
                        end: end.toFormat('d. M. y'),
                        totalNights: days,
                        pricePerNight: `${reservationSettings.pricePerNight.toLocaleString('cs')} Kč`,
                        totalPrice: `${totalPrice} Kč`
                    }
                } else {
                    return {
                        start: '-',
                        end: '-',
                        totalNights: '0',
                        pricePerNight: `${reservationSettings.pricePerNight.toLocaleString('cs')} Kč`,
                        totalPrice: '0 Kč'
                    }
                }
            }
        )

        const validateForm = computed(() => {
            //TODO deep rekurze
            return !!form.reservationRange.start && !!form.reservationRange.end && !!form.name && !!form.surname && !!form.email && !!form.phone && !!form.adultCount
        })

        onMounted(() => {
                Api.get('/api/reservations').then(response => {
                        reservedDates.value = response.data.flat()
                    }
                ).catch((error) => {
                        console.log(error);
                })
            }
        )

        function getReservedDates() {
            Api.get('/api/reservations').then(response => {

                    reservedDates.value = response.data.flat()
                }
            ).catch((error) => {
                console.log(error);
            })
        }


        function submit() {
            Api.post('/api/reservations', form.objectToFormData()).then((response) => {
                store.dispatch('messagesModule/showSuccess', response.data.message);
                datepicker.value.clearRange();
                form.onSuccess();
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
            reservedDates,
            minDate,
            maxDate,
            currentReservation,
            getReservedDates,
            validateForm,
            submit,
            datepicker
        }
    }
}
</script>

<style scoped>

</style>
