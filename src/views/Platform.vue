<template>
    <div class="bg-white dark:bg-[#27272a] rounded-lg p-5">
        <div class="flex gap-3 items-center h-full mb-4">
            <div class="w-5 bg-green-500 rounded-md min-h-[25px] h-full"></div>
            <h1 class="text-2xl m-0">Platform</h1>
        </div>
        <p class="text-lg font-bold mb-5">My Manager Usage Rate</p>

        <Tabs>
            <TabList>
                <div>
                    <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value"
                        class="font-bold whitespace-nowrap text-lg">{{ tab.title }}</Tab>
                </div>
            </TabList>
            <TabPanels>
                <TabPanel value="0">
                    <div class="p-5 bg-[#0F161E] rounded-lg relative">
                        <img src="/demo/images/bg/bg-001.png" alt="" class="absolute top-0 left-0 w-full h-full rounded-lg object-cover">
                        <div class="relative z-50">
                            
                        </div>
                    </div>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useApi } from '@/composables/useApi';
import { fetchRecentGigs, fetchActiveUsers } from '@/api/fetchTabData';

// tab list
const tabs = ref([
    { title: 'Overview', value: '0' },
    // { title: 'Track', value: '1' },
    { title: 'Task Completion Rate', value: '1' },
    { title: 'Milestone Updates per Project', value: '2' },
]);

</script>