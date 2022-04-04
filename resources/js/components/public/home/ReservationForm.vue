<template>
    <form class="space-y-8 divide-y divide-gray-200 max-w-5xl mx-auto">
        <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-4 gap-6">
                    <div class="col-span-4">
                        Vyberte termín
                    </div>

<!--                    <div class="col-span-2 space-y-2">-->
<!--                        <p><span class="font-semibold">Od: </span>{{ currentReservation.start }}</p>-->
<!--                        <p><span class="font-semibold">Do: </span>{{ currentReservation.end }}</p>-->
<!--                        <p><span class="font-semibold">Počet nocí: </span>{{ currentReservation.totalNights }}</p>-->
<!--                        <p><span class="font-semibold">Cena za 1 noc: </span>{{ currentReservation.pricePerNight }}-->
<!--                        </p>-->
<!--                        <p><span class="font-semibold">Cena celkem: </span>{{ currentReservation.totalPrice }}</p>-->
<!--                    </div>-->
                    <Datepicker></Datepicker>


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
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/vue/solid'
import {computed, onMounted, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import Form from "../../../utilities/form";
import Api from "../../../services/api";
import Datepicker from "../Datepicker";
import 'vue3-date-time-picker/dist/main.css'

const days = [
    { date: '2021-12-27' },
    { date: '2021-12-28' },
    { date: '2021-12-29' },
    { date: '2021-12-30' },
    { date: '2021-12-31' },
    { date: '2022-01-01', isCurrentMonth: true },
    { date: '2022-01-02', isCurrentMonth: true },
    { date: '2022-01-03', isCurrentMonth: true },
    { date: '2022-01-04', isCurrentMonth: true },
    { date: '2022-01-05', isCurrentMonth: true },
    { date: '2022-01-06', isCurrentMonth: true },
    { date: '2022-01-07', isCurrentMonth: true },
    { date: '2022-01-08', isCurrentMonth: true },
    { date: '2022-01-09', isCurrentMonth: true },
    { date: '2022-01-10', isCurrentMonth: true },
    { date: '2022-01-11', isCurrentMonth: true },
    { date: '2022-01-12', isCurrentMonth: true, isToday: true },
    { date: '2022-01-13', isCurrentMonth: true },
    { date: '2022-01-14', isCurrentMonth: true },
    { date: '2022-01-15', isCurrentMonth: true },
    { date: '2022-01-16', isCurrentMonth: true },
    { date: '2022-01-17', isCurrentMonth: true },
    { date: '2022-01-18', isCurrentMonth: true },
    { date: '2022-01-19', isCurrentMonth: true },
    { date: '2022-01-20', isCurrentMonth: true },
    { date: '2022-01-21', isCurrentMonth: true },
    { date: '2022-01-22', isCurrentMonth: true, isSelected: true },
    { date: '2022-01-23', isCurrentMonth: true },
    { date: '2022-01-24', isCurrentMonth: true },
    { date: '2022-01-25', isCurrentMonth: true },
    { date: '2022-01-26', isCurrentMonth: true },
    { date: '2022-01-27', isCurrentMonth: true },
    { date: '2022-01-28', isCurrentMonth: true },
    { date: '2022-01-29', isCurrentMonth: true },
    { date: '2022-01-30', isCurrentMonth: true },
    { date: '2022-01-31', isCurrentMonth: true },
    { date: '2022-02-01' },
    { date: '2022-02-02' },
    { date: '2022-02-03' },
    { date: '2022-02-04' },
    { date: '2022-02-05' },
    { date: '2022-02-06' },
]



export default {
    components: {Datepicker, ChevronLeftIcon, ChevronRightIcon},
    setup() {
        // const store = useStore();
        const form = reactive(new Form({
                title: '',
                reservationRange: [],
                name: 'a',
                surname: 'a',
                email: 'a',
                phone: 123456789,
                adultCount: 1,
                childCount: 0,
                pet: 0
        }));
        //
        // const disabledDates = ref([]);


        // watch(() => form.reservationRange, (currentValue) => {
        //     if (currentValue.length !== 0) {
        //         console.log(2)
        //         if (validateRange()) {
        //             console.log(3)
        //             form.reservationRange = []
        //         }
        //         form.reservationRange = form.reservationRange.map(date => {
        //             return moment(date).format('YYYY-MM-DD')
        //         });
        //     }
        //     console.log(4)
        // }
        // )



        //
        // function validateRange() {
        //     return disabledDates.value.some(function (o) {
        //         return moment(o).isBetween(form.reservationRange[0], form.reservationRange[1]);
        //     })
        // }

        // const reservationSettings = reactive({
        //     pricePerNight: 2500,
        // })


        // const currentReservation = computed(() => {
        //         if (form.reservationRange[0] && form.reservationRange[1]) {
        //             let start = moment(form.reservationRange[0]);
        //             let end = moment(form.reservationRange[1]);
        //
        //             let days = end.diff(start, 'days');
        //             let totalPrice = (reservationSettings.pricePerNight * days).toLocaleString('cs');
        //
        //             return {
        //                 start: start.locale('cs').format('D. M. YYYY'),
        //                 end: end.locale('cs').format('D. M. YYYY'),
        //                 totalNights: days,
        //                 pricePerNight: `${reservationSettings.pricePerNight.toLocaleString('cs')} Kč`,
        //                 totalPrice: `${totalPrice} Kč`
        //             }
        //         } else {
        //             return {
        //                 start: '',
        //                 end: '',
        //                 totalNights: '',
        //                 pricePerNight: '',
        //                 totalPrice: ''
        //             }
        //         }
        //     }
        // )
        //
        // const maxDate = computed(() => {
        //     let dt = new Date();
        //     return dt.setFullYear(dt.getFullYear() + 1)
        // });
        //
        // onMounted(() => {
        //         Api.get('/api/reservations').then(response => {
        //                 disabledDates.value = response.data.flat()
        //             }
        //         ).catch((error) => {
        //             if (error.response) {
        //                 store.dispatch('messagesModule/showException', error.response.data.message);
        //             } else {
        //                 console.log(error);
        //             }
        //         })
        //     }
        // )
        //
        // function submit() {
        //     Api.post('/api/reservations', form.objectToFormData()).then((response) => {
        //         store.dispatch('messagesModule/showSuccess', response.data.message);
        //         form.onSuccess();
        //     }).catch((error) => {
        //         if (error.response) {
        //             if (error.response.status === 422) {
        //                 form.onFail(error.response.data.errors);
        //             } else {
        //                 store.dispatch('messagesModule/showException', error.response.data.message);
        //             }
        //         } else {
        //             console.log(error);
        //         }
        //     })
        // }

        return {
            form,
        }
    }
}
</script>

<style scoped>

</style>
