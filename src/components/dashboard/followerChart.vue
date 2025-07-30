<template>
    <div class="card shadow-lg w-full md:w-[50%] px-1 h-[330px]">
        <div class="relative rounded-xl w-full">
            <h2 class="font-semibold text-lg leading-7 mb-0">New Followers Growth Rate</h2>
            <p class="mb-0 text-sm text-gray-500">Based on categories</p>
            <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full h-[150px] max-w-[200px] mx-auto my-0" />
            <div
                class="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-[300px] my-0 mx-auto">
                <div class="text-xl font-semibold text-black dark:text-white">{{ value }}%</div>
                <div
                    :class="['text-sm font-bold flex gap-1 items-center justify-center', change >= 0 ? 'text-green-600' : 'text-red-600']">
                    {{ change >= 0 ? '+' : '' }}{{ change }}%
                </div>
            </div>
            <div class="mt-2 flex flex-col gap-2">
                <div class="flex justify-between items-center">
                    <div class="flex gap-3 items-center">
                        <div
                            class="rounded-full flex flex-col justify-center items-center w-[31.89px] h-[31.89px] bg-[#F8F8F8]">
                            <img src="@/assets/images/icons/home.png" loading="lazy" alt="">
                        </div>
                        <div>
                            <p class="font-medium text-sm mb-0">New Followers</p>
                            <p class="font-normal text-gray-500 text-[10px]">How many followers following</p>
                        </div>
                    </div>
                    <div class="flex flex-col items-end">
                        <p class="font-semibold text-base mb-0">{{ newFollowers.toLocaleString() }}K</p>
                        <p class="font-medium text-green-500 text-xs flex gap-1 items-center justify-center">{{ change
                            >= 0 ? '+' : '' }}{{ change }}%
                        </p>
                    </div>
                </div>
                <div class="flex justify-between items-center">
                    <div class="flex gap-3 items-center">
                        <div
                            class="rounded-full flex flex-col justify-center items-center w-[31.89px] h-[31.89px] bg-[#F8F8F8]">
                            <img src="@/assets/images/icons/chef-hat-heart.png" loading="lazy" alt="">
                        </div>
                        <div>
                            <p class="font-medium text-sm mb-0">Active Followers</p>
                            <p class="font-normal text-gray-500 text-[10px]">How many followers active</p>
                        </div>
                    </div>
                    <div>
                        <p class="font-semibold text-base">{{ activeFollowers.toLocaleString() }}K</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import Chart from 'primevue/chart';
import { useFollowersChart } from '@/composables/useFollowersChart';

const {
    chartData,
    chartOptions,
    value,
    change,
    newFollowers,
    activeFollowers
} = useFollowersChart();
</script>

<style scoped>
    .card {
        padding: 1rem;
        margin-bottom: 0;
    }
</style>