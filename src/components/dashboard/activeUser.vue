<template>
    <div class="rounded-lg bg-blue-900 p-4 shadow-lg">
        <h2 class="font-semibold text-white text-lg">Active User Ratio</h2>
        <div class="relative">
            <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full h-full" />
            <div class="absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
                <div class="text-xl font-bold text-white">{{ value }}%</div>
            </div>
        </div>
        <div class="flex flex-col gap-1">
            <div class="flex gap-2 items-center">
                <div class="rounded-full bg-[#661EFF] h-[9px] w-[9px]"></div>
                <p class="text-sm font-normal text-white">All Users</p>
            </div>
            <div class="flex gap-2 items-center">
                <div class="rounded-full bg-[#64CFF6] h-[9px] w-[9px]"></div>
                <p class="text-sm font-normal text-white">Active Users</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import Chart from 'primevue/chart'
import { useActiveUserChart } from '@/composables/useActiveUserChart';

const {
    chartData,
    chartOptions,
    value,
    allUsers,
    activeUsers
} = useActiveUserChart();
</script>