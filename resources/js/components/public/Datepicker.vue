<template>
    <div class="col-span-2">
        <div class="text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 xl:col-start-9">
            <div class="flex items-center text-gray-900">
                <button @click="switchMonth(-1)" :disabled="isPreviousMonthDisabled" type="button"
                        class="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                    <span class="sr-only">Předchozí měsíc</span>
                    <ChevronLeftIcon class="h-5 w-5" aria-hidden="true"/>
                </button>
                <div class="flex-auto font-semibold">{{ selectedMonthName }}</div>
                <button @click="switchMonth(+1)" :disabled="isNextMonthDisabled" type="button"
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
                class="isolate mt-2 grid grid-cols-7 gap-px rounded-lg text-sm shadow ring-1 ring-gray-200">
                <button v-for="(day) in selectedMonth.days" type="button" @click="selectRange(day.date)"
                        :class="setClass(day)" :disabled="day.isDisabled || day.isReserved">
                    <time :datetime="day.date">{{ day.date.split('-').pop().replace(/^0/, '') }}</time>
                </button>
            </div>
            <div v-if="validationMessage" class="text-red-800"> {{ validationMessage }}</div>
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
import {computed, onMounted, reactive, watch, ref, toRefs, toRef} from "vue";
import {DateTime, Interval} from "luxon";

export default {
    name: "Datepicker",
    components: {ChevronLeftIcon, ChevronRightIcon},
    props: {
        modelValue: {
            type: Object,
            required: true
        },
        minDate: {
            type: String,
            required: false
        },
        maxDate: {
            type: String,
            required: false
        },
        reservedDates: {
            type: Array,
            required: false
        }
    },

    setup(props, context) {

        const selectedRange = reactive({
            start: '',
            end: ''
        });

        const styleConfig = {
            default: 'py-1.5 focus:z-10 text-gray-900',
            currentMonth: 'bg-white',
            previousNextMonth: 'text-gray-400 bg-gray-50',
            today: 'text-indigo-600 font-semibold',
            open: 'hover:bg-gray-100',
            reserved: 'text-white bg-red-500',
            disabled: 'text-gray-400',
            selected: {
                range: 'text-white bg-cyan-600 font-semibold',
                startDay: 'text-white bg-date-range-start font-semibold',
                endDay: 'text-white bg-date-range-end font-semibold',
            }
        }

        const rangeConfig = {
            minimum: 1,
            maximum: 14
        }

// <button v-for="(day) in selectedMonth.days" type="button" @click="selectRange(day.date)"
// :class="['py-1.5 focus:z-10',
// day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
// (day.isSelected || day.isToday) && 'font-semibold',
// day.isSelected && 'text-white bg-cyan-600',
// !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
// !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
// day.isToday && !day.isSelected && !day.isDisabled && 'text-indigo-600',
// day.isSelectedFirstDay && 'bg-date-range-start',
// day.isSelectedLastDay && 'bg-date-range-end',
// day.isReserved && 'bg-red-500 hover:bg-red-500 text-white',
//     'hover:bg-cyan-500',
// day.isDisabled && 'bg-red-500 hover:bg-red-500 text-white',
//     'hover:bg-cyan-500'
// ]" :disabled="day.isDisabled">
// <time :datetime="day.date">{{ day.date.split('-').pop().replace(/^0/, '') }}</time>

        let currentDate = DateTime.now();

        function setClass(day) {
            //DEFAULT
            let cssObject = {
                [styleConfig.default]: true
            }
            //CURRENT MONTH
            if (day.isCurrentMonth) {
                cssObject[styleConfig.currentMonth] = true;
            } else {
                cssObject[styleConfig.previousNextMonth] = true;
            }
            //TODAY
            if (day.isToday && !day.isSelected && !day.isDisabled) {
                cssObject[styleConfig.today] = true;
            }
            //SELECTED
            if (day.isSelected) {
                if (day.isSelectedStartDay) {
                    cssObject[styleConfig.selected.startDay] = true;
                } else if (day.isSelectedEndDay) {
                    cssObject[styleConfig.selected.endDay] = true;
                } else {
                    cssObject[styleConfig.selected.range] = true;
                }
            }
            if (day.isDisabled) {
                cssObject[styleConfig.disabled] = true;
            }
            //OPEN
            if (!day.isDisabled && !day.isReserved && !day.isSelected) {
                cssObject[styleConfig.open] = true;
            }
            if (day.isReserved) {
                cssObject[styleConfig.reserved] = true;
            }


            //console.log(cssObject)

            return cssObject

            // [styleConfig.default]: true,
            // [styleConfig.currentMonth]: day.isCurrentMonth,
            // [styleConfig.today]: day.isToday && !day.isSelected && !day.isDisabled,
            // [styleConfig.previousMonth]: !day.isSelected && !day.isCurrentMonth && !day.isToday,
            // [styleConfig.selected.range]: day.isSelected,
            // [styleConfig.selected.startDay]: day.isSelectedStartDay,
            // [styleConfig.selected.endDay]: day.isSelectedEndDay
        }

        const selectedMonth = reactive({
            'date': currentDate,
            'days': []
        });

        const render = ref(false);

        const validationMessage = ref();

        const minDate = computed(() => {
            if (props.minDate) {
                return DateTime.fromISO(props.minDate);
            } else {
                return false;
            }
        });

        const maxDate = computed(() => {
            if (props.maxDate) {
                return DateTime.fromISO(props.maxDate);
            } else {
                return false;
            }
        });

        const selectedMonthName = computed(() => {
            return selectedMonth.date.setLocale('cs').monthLong + ' ' + selectedMonth.date.year;
        });

        const selectedRangeInterval = computed(() => {
            return Interval.fromDateTimes(DateTime.fromISO(selectedRange.start), DateTime.fromISO(selectedRange.end).plus({days: 1}));
        });

        const isPreviousMonthDisabled = computed(() => {
            if (props.minDate) {
                return minDate.value.month >= selectedMonth.date.month && selectedMonth.date.year === currentDate.year;
            } else {
                return false;
            }
        });

        const isNextMonthDisabled = computed(() => {
            if (props.maxDate) {
                return maxDate.value <= selectedMonth.date;
            } else {
                return false
            }
        });

        watch(() => props.reservedDates, () => {
                    renderMonth()
        });

        onMounted(() => {
                renderMonth()
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

        function isSelectedStartDay(date) {
            if (selectedRange.start) {
                return date.toISODate() === selectedRange.start;
            } else {
                return false
            }
        }

        function isSelectedEndDay(date) {
            if (selectedRange.end) {
                return date.toISODate() === selectedRange.end;
            } else {
                return false
            }
        }

        function isReserved(date) {
            if (Array.isArray(props.reservedDates) && props.reservedDates.length) {
                return props.reservedDates.some((reservedDate) => reservedDate === date.toISODate())
            } else {
                return false
            }
        }

        function isDisabled(date) {
            if (minDate.value && maxDate.value) {
                return date < minDate.value || date > maxDate.value
            } else if (minDate.value && !maxDate.value) {
                return date < minDate.value
            } else if (!minDate.value && maxDate.value) {
                return date > maxDate.value
            } else {
                return false
            }
        }

        function switchMonth(step) {
            selectedMonth.date = selectedMonth.date.plus({months: step});
            renderMonth();
            //emit('switchMonth');
        }

        function renderMonth() {
            console.log(1)

            let firstDayOfThisMonth = selectedMonth.date.startOf('month');
            let firstDayOfThisMonthWeekDay = firstDayOfThisMonth.weekday;

            let lastDayOfThisMonth = selectedMonth.date.endOf('month').startOf('day');
            let lastDayOfThisMonthWeekDay = selectedMonth.date.endOf('month').weekday;

            let startDate = firstDayOfThisMonth.minus({days: firstDayOfThisMonthWeekDay - 1});
            let endDate = lastDayOfThisMonth.plus({days: 7 - lastDayOfThisMonthWeekDay});

            let daysDiff = endDate.diff(startDate, 'days').toObject().days + 1;

            selectedMonth.days = [];

            for (let i = 0; i < daysDiff; i++) {
                let day = {
                    date: startDate.toISODate(),
                    isCurrentMonth: isCurrentMonth(startDate),
                    isToday: isToday(startDate),
                    isSelected: isSelected(startDate),
                    isDisabled: isDisabled(startDate),
                    isReserved: isReserved(startDate),
                    isSelectedStartDay: isSelectedStartDay(startDate),
                    isSelectedEndDay: isSelectedEndDay(startDate)
                };
                selectedMonth.days.push(day);
                startDate = startDate.plus({days: 1});
            }
        }

        function selectRange(date) {
            validationMessage.value = '';

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

            if (isRangeValid()) {
                clearRange();
                showRange();
            } else {
                cancel();
            }
            context.emit('update:range', {
                start: selectedRange.start,
                end: selectedRange.end
            });
        }

        function isRangeValid() {
            let daysDiff = DateTime.fromISO(selectedRange.end).diff(DateTime.fromISO(selectedRange.start), 'days').toObject().days;

            if (props.reservedDates && props.reservedDates.some((date) => {
                return selectedRangeInterval.value.contains(DateTime.fromISO(date))
            })) {
                validationMessage.value = 'Vybraný termín obsahuje již rezervované termíny';
                return false;
            } else if (daysDiff < rangeConfig.minimum) {
                validationMessage.value = `Vybrali jste příliš malé rozpětí - (${rangeConfig.minimum}) dnů`;
                return false;
            } else if (daysDiff >= rangeConfig.maximum) {
                validationMessage.value = `Vybrali jste příliš velké rozpětí - delší než (${rangeConfig.maximum}) dnů`;
                return false;
            } else {
                return true;
            }
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
                selectedMonth.days[startIndex].isSelectedStartDay = true;
            } else {

                if (startIndex !== 0) {
                    selectedMonth.days[startIndex].isSelected = true;
                    selectedMonth.days[startIndex].isSelectedStartDay = true;
                } else {
                    selectedMonth.days[startIndex].isSelected = true;
                    selectedMonth.days[startIndex].isSelectedStartDay = false;
                }

                let endIndex = selectedMonth.days.findIndex(
                    (day) => {
                        return day.date === selectedRange.end;
                    }
                );

                if (endIndex !== -1) {
                    selectedMonth.days[endIndex].isSelected = true;
                    selectedMonth.days[endIndex].isSelectedEndDay = true;
                } else {
                    endIndex = selectedMonth.days.length - 1;
                    selectedMonth.days[endIndex].isSelected = true;
                    selectedMonth.days[endIndex].isSelectedEndDay = false;
                }

                let count = endIndex - startIndex;

                for (let i = 1; i < count; i++) {
                    selectedMonth.days[startIndex + i].isSelected = true;
                }
            }
        }

        function clearRange() {
            selectedMonth.days.forEach(function (day) {
                day.isSelected = false;
                day.isSelectedStartDay = false;
                day.isSelectedEndDay = false;
            })
        }

        function cancel() {
            if (selectedRange.start || selectedRange.end) {
                selectedRange.start = '';
                selectedRange.end = '';
                clearRange();
            }
        }

        return {
            selectedMonth,
            selectedMonthName,
            selectedRange,
            isPreviousMonthDisabled,
            isNextMonthDisabled,
            validationMessage,
            isDisabled,
            setClass,
            switchMonth,
            selectRange,
            clearRange,
            cancel,

        }
    }
}
</script>
