<template>
    <div class="col-span-2">
        <div class="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
            <div class="flex items-center text-gray-900">
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
            <div class="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
                <div>Po</div>
                <div>Út</div>
                <div>St</div>
                <div>Čt</div>
                <div>Pá</div>
                <div>So</div>
                <div>Ne</div>
            </div>
            <div
                class="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
                <button v-for="(day) in selectedMonth.days" type="button" @click="selectRange(day.date)"
                        :class="['py-1.5 hover:bg-gray-100 focus:z-10',
                          day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                         (day.isSelected || day.isToday) && 'font-semibold',
                          day.isSelected && 'text-white bg-cyan-600',
                          !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
                          !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
                          day.isToday && !day.isSelected && 'text-indigo-600',
                          day.isSelectedFirstDay && 'bg-date-range-start',
                          day.isSelectedLastDay && 'bg-date-range-end',
                          ]">
                    <time :datetime="day.date">{{ day.date.split('-').pop().replace(/^0/, '') }}</time>
                </button>
            </div>
            <div v-if="selectedRange.start">Datum od: {{ selectedRange.start }}</div>
            <div v-if="selectedRange.end">Datum od: {{ selectedRange.end }}</div>
            <button type="button" @click="cancel"
                    class="focus:outline-none mt-8 w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Zrušit
            </button>
        </div>
    </div>
</template>

<script>

import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/vue/solid'
import {computed, onMounted, reactive} from "vue";
import {DateTime, Interval} from "luxon";

export default {
    name: "Datepicker",
    components: {ChevronLeftIcon, ChevronRightIcon},

    setup() {

        let currentDate = DateTime.now();

        const selectedMonth = reactive({
            'date': currentDate,
            'days': []
        });

        const selectedRange = reactive({
            start: '',
            end: ''
        });

        const selectedMonthName = computed(() => {
            return selectedMonth.date.setLocale('cs').monthLong + ' ' + selectedMonth.date.year;
        });

        const selectedRangeInterval = computed(() => {
            return Interval.fromDateTimes(DateTime.fromISO(selectedRange.start), DateTime.fromISO(selectedRange.end).plus({days: 1}));
        });

        onMounted(() => {
                filterMonth();
            }
        )

        function isCurrentMonth(date) {
            return date.month === selectedMonth.date.month;
        }

        function isToday(date) {
            return date.toISODate() === currentDate.toISODate();
        }

        function isSelected(date) {
            return selectedRangeInterval.value.contains(date);
        }

        function isSelectedFirstDay(date) {
            if (selectedRange.start) {
                return date.toISODate() === selectedRange.start;
            }
        }

        function isSelectedLastDay(date) {
            if (selectedRange.end) {
                return date.toISODate() === selectedRange.end;
            }
        }

        function switchMonth(step) {
            selectedMonth.date = selectedMonth.date.plus({months: step});
            filterMonth();
        }

        function filterMonth() {

            let firstDayOfThisMonth = selectedMonth.date.startOf('month');

            let firstDayOfThisMonthWeekDay = firstDayOfThisMonth.weekday;

            let lastDayOfThisMonth = selectedMonth.date.endOf('month').startOf('day');
            let lastDayOfThisMonthWeekDay = selectedMonth.date.endOf('month').weekday;

            let monthBeforeDaysCount = firstDayOfThisMonthWeekDay - 1;
            let monthAfterDaysCount = 7 - lastDayOfThisMonthWeekDay;

            let minDate = firstDayOfThisMonth.minus({days: monthBeforeDaysCount});
            let maxDate = lastDayOfThisMonth.plus({days: monthAfterDaysCount});

            let daysDiff = maxDate.diff(minDate, 'days').toObject().days + 1;

            selectedMonth.days = [];

            for (let i = 0; i < daysDiff; i++) {
                selectedMonth.days.push({
                    date: minDate.toISODate(),
                    isCurrentMonth: isCurrentMonth(minDate),
                    isToday: isToday(minDate),
                    isSelected: isSelected(minDate),
                    isSelectedFirstDay: isSelectedFirstDay(minDate),
                    isSelectedLastDay: isSelectedLastDay(minDate)
                })
                minDate = minDate.plus({days: 1});
            }
        }

        function selectRange(date) {
            if (!selectedRange.start && !selectedRange.end) {
                selectedRange.start = date;
            } else {
                if (date < selectedRange.start) {
                    selectedRange.end = selectedRange.start;
                    selectedRange.start = date;
                } else {
                    selectedRange.end = date;
                }
            }
            clearRange()
            showRange()
        }

        function showRange() {

            let startIndex = selectedMonth.days.findIndex(
                (day) => {
                    return day.date === selectedRange.start;
                }
            );

            if (startIndex === -1) {
                startIndex = 0;
            }

            if (selectedRange.start && !selectedRange.end) {
                selectedMonth.days[startIndex].isSelected = true;
                selectedMonth.days[startIndex].isSelectedFirstDay = true;
            } else {

                let endIndex = selectedMonth.days.findIndex(
                    (day) => {
                        return day.date === selectedRange.end;
                    }
                );

                if (endIndex !== -1) {
                    selectedMonth.days[endIndex].isSelected = true;
                    selectedMonth.days[endIndex].isSelectedLastDay = true;
                } else {
                    endIndex = selectedMonth.days.length - 1;
                    selectedMonth.days[endIndex].isSelected = true;
                    selectedMonth.days[endIndex].isSelectedLastDay = false;
                }

                let count = endIndex - startIndex;

                if (startIndex !== 0) {
                    selectedMonth.days[startIndex].isSelected = true;
                    selectedMonth.days[startIndex].isSelectedFirstDay = true;
                } else {
                    selectedMonth.days[startIndex].isSelected = true;
                    selectedMonth.days[startIndex].isSelectedFirstDay = false;
                }
                for (let i = 1; i < count; i++) {
                    selectedMonth.days[startIndex + i].isSelected = true;
                }
            }
        }

        function clearRange() {
            selectedMonth.days.forEach(function (day) {
                day.isSelected = false;
                day.isSelectedFirstDay = false;
                day.isSelectedLastDay = false;
            })
        }

        function cancel() {
            selectedRange.start = '';
            selectedRange.end = '';
            clearRange();
        }

        return {
            selectedMonth,
            selectedMonthName,
            selectedRange,
            switchMonth,
            selectRange,
            clearRange,
            cancel
        }
    }
}
</script>
