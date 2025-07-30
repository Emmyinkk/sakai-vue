<script setup>
import TabArea from '@/components/dashboard/tabArea.vue';
import FollowerChart from '@/components/dashboard/followerChart.vue';
import saleAnalytics from '@/components/dashboard/salesAnalytics.vue';
import Activities from '@/components/dashboard/activitiesTab.vue';
import StatsWidget from '@/components/dashboard/StatsWidget.vue';
import ActiveUser from '@/components/dashboard/activeUser.vue';
</script>

<template>
    <div class="grid grid-cols-12 gap-8">
        <StatsWidget />

        <div class="col-span-12 xl:col-span-6">
            <div class="flex flex-col h-full">
                <saleAnalytics />
            </div>
        </div>
        <div class="col-span-12 xl:col-span-6">
            <div class="flex justify-between items-center w-full gap-8 flex-wrap md:flex-nowrap h-full">
                <FollowerChart />
                <Activities />
            </div>

        </div>
        <div class="col-span-12 xl:col-span-9">
            <TabArea />
        </div>
        <div class="col-span-12 xl:col-span-3">
            <ActiveUser />
        </div>
    </div>
</template>
