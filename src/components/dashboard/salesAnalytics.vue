<template>
    <div class="card shadow-lg h-[330px]">
        <div class="relative rounded-xl w-full flex flex-col justify-between h-full">
            <h2 class="mb-4 text-sm text-gray-500 flex gap-4 items-center">Sales Analytics <span
                    class="font-semibold text-lg text-[#3C3C3C]">₦{{ sales.toLocaleString() }}</span></h2>
            <div class="flex justify-between items-center flex-wrap gap-2 md:gap-0">
                <h3 class="font-bold text-base mb-0 flex justify-between items-center gap-2">Revenue</h3>
                <span class="text-gray-500 font-thin shrink-0">|</span>
                <p class="text-gray-500 mb-0 text-sm">Order Summary</p>
                <div class="flex gap-2 items-center">
                    <div class="flex gap-1 items-center">
                        <div class="bg-[#13B554] w-[6.33px] h-[6.33px] rounded-full"></div>
                        <p class="text-sm">Income</p>
                    </div>
                    <div class="flex gap-1 items-center">
                        <div class="bg-[#EC4F46] w-[6.33px] h-[6.33px] rounded-full"></div>
                        <p class="text-sm">Expense</p>
                    </div>
                </div>

                <div
                    class="flex justify-center bg-black rounded-md text-white w-full max-w-[100px] md:max-w-[105px]">
                    <Select v-model="selectedRange" :options="ranges" optionLabel="label" placeholder="Weekly"
                        size="small" class="w-full md:w-full" :pt="{
                            label: 'padding-small'
                        }"/>
                </div>
            </div>
            <div class="mt-2">
                <div class="h-full">
                    <Chart type="line" :data="chartData" :options="chartOptions" class="w-full h-full"  />
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import Chart from 'primevue/chart';
import Select from 'primevue/select';
import { useRevenueChart } from '@/composables/useRevenueChart';

const {
    chartData,
    chartOptions,
    selectedRange,
    setRange,
    loading,
    error,
    sales
} = useRevenueChart();

const ranges = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
];



</script>

<style scoped>
    .card {
        padding: 1rem;
    }
    .heightImportant {
        height: 100% !important;
    }
</style>