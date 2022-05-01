<template>
    <div v-if="selectedMonth.days.length" class="lg:flex lg:h-full lg:flex-col text-center">
        <div class="flex items-center text-gray-900 mb-5">
            <button @click="switchMonth(-1)" type="button"
                    class="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                <span class="sr-only">Předchozí měsíc</span>
                <ChevronLeftIcon class="h-5 w-5" aria-hidden="true"/>
            </button>
            <div class="flex-auto font-semibold">{{ selectedMonthName }}</div>
            <button @click="switchMonth(+1)" type="button"
                    class="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                <span class="sr-only">Následující měsíc</span>
                <ChevronRightIcon class="h-5 w-5" aria-hidden="true"/>
            </button>
        </div>
        <div class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
            <div
                class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
                <div class="bg-white py-2">Po</div>
                <div class="bg-white py-2">Út</div>
                <div class="bg-white py-2">St</div>
                <div class="bg-white py-2">Čt</div>
                <div class="bg-white py-2">Pá</div>
                <div class="bg-white py-2">So</div>
                <div class="bg-white py-2">Ne</div>
            </div>
            <div class="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
                <div class="hidden w-full lg:grid lg:grid-cols-7 lg:gap-px">
                    <div v-for="day in selectedMonth.days" :key="day.date"
                         :class="[day.currentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500', 'relative py-2 px-3']">
                        <time :datetime="day.date"
                              :class="day.today ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white' : undefined">
                            {{ day.date.split('-').pop().replace(/^0/, '') }}
                        </time>
                        <ol v-if="day.events.length > 0" class="mt-2">
                            <li v-for="event in day.events" :key="event.id">
                                <a :href="event.href" class="group flex">
                                    <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                        {{ event.name }}
                                    </p>
                                    <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                        {{ event.surname }}
                                    </p>
                                    <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                        {{ event.phone }}
                                    </p>
                                    <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                        {{ event.email }}
                                    </p>
                                    <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                        {{ event.adult_count }}
                                    </p>
                                    <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                        {{ event.child_count }}
                                    </p>
                                    <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                        {{ event.pet }}
                                    </p>
                                </a>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon, DotsHorizontalIcon} from '@heroicons/vue/solid'
import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import {onMounted, ref, computed, reactive} from "vue";
import Api from "../../services/api";
import {useStore} from "vuex";
import {DateTime} from "luxon";

export default {
    components: {
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        ChevronDownIcon,
        ChevronLeftIcon,
        ChevronRightIcon,
        ClockIcon,
        DotsHorizontalIcon,
    },
    setup() {
        const store = useStore();
        const currentDate = DateTime.now();
        const selectedMonth = reactive({
            'date': currentDate,
            'days': []
        });
        const reservations = ref([]);

        const selectedMonthName = computed(() => {
            return selectedMonth.date.setLocale('cs').monthLong + ' ' + selectedMonth.date.year;
        });

        onMounted(async () => {
                try {
                    const response = await Api.get('/api/admin/reservations');
                    reservations.value = response.data;
                    console.log(response.data);
                    renderMonth();
                } catch (e) {
                    await store.dispatch('messagesModule/showException', e.response.data.message);
                }
            }
        )

        function switchMonth(step) {
            selectedMonth.date = selectedMonth.date.plus({months: step});
            renderMonth();
        }

        function isCurrentMonth(date) {
            return date.month === selectedMonth.date.month;
        }

        function isToday(date) {
            return date === currentDate.toISODate();
        }

        function getEvents(date) {
            return reservations.value.filter(reservation => {
                    return reservation.start <= date && reservation.end >= date
                }
            )
        }

        function renderMonth() {
            let firstDayOfThisMonth = selectedMonth.date.startOf('month');
            let firstDayOfThisMonthWeekDay = firstDayOfThisMonth.weekday;

            let lastDayOfThisMonth = selectedMonth.date.endOf('month').startOf('day');
            let lastDayOfThisMonthWeekDay = selectedMonth.date.endOf('month').weekday;

            let startDate = firstDayOfThisMonth.minus({days: firstDayOfThisMonthWeekDay - 1});
            let endDate = lastDayOfThisMonth.plus({days: 7 - lastDayOfThisMonthWeekDay});

            let daysDiff = endDate.diff(startDate, 'days').toObject().days + 1;

            selectedMonth.days = [];

            for (let i = 0; i < daysDiff; i++) {
                let isoDate = startDate.toISODate();
                let day = {
                    date: isoDate,
                    currentMonth: isCurrentMonth(startDate),
                    today: isToday(isoDate),
                    events: getEvents(isoDate)
                };
                selectedMonth.days.push(day);
                startDate = startDate.plus({days: 1});
            }
        }


        return {
            selectedMonth,
            selectedMonthName,
            switchMonth
        }
    },
}
</script>
