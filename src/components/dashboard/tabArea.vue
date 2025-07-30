<template>
    <div class="card">
        <div class="flex justify-end gap-4 items-center">
            <div class="flex justify-center bg-black rounded-md text-white w-full max-w-[100px] md:max-w-[150px]">
                <Select v-model="selectedRange" :options="ranges" optionLabel="label" placeholder="Today" size="small"
                    class="w-full md:w-full" :pt="{
                        label: 'padding-small'
                    }" />
            </div>
            <router-link to="/">
                <button class="py-2 px-3 rounded-2xl bg-[#C5F0D3] text-[#27B264] text-sm cursor-pointer">View
                    All</button>
            </router-link>
        </div>
        <Tabs value="0">
            <TabList>
                <div>
                    <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value"
                        class="font-bold whitespace-nowrap text-lg">{{ tab.title }}</Tab>
                </div>
            </TabList>
            <TabPanels>
                <TabPanel value="0">
                    <div v-if="loadingGigs">Loading gigs...</div>
                    <div v-else-if="!loadingGigs && paginatedGigs.length === 0"
                        class="flex flex-col justify-center items-center h-40 text-gray-500 text-lg">
                        <i class="pi pi-folder-open" style="color: gray; font-size: 6rem"></i>
                        No data found
                    </div>
                    <div v-else class="overflow-x-auto w-full">
                        <table class="min-w-[600px] w-full text-left border">
                            <thead class="">
                                <tr class="bg-gray-100 dark:bg-black">
                                    <th class="p-3">S/N</th>
                                    <th class="p-3">Job Title</th>
                                    <th class="p-3">View</th>
                                    <th class="p-3">Applied</th>
                                    <th class="p-3">Location</th>
                                    <th class="p-3">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(gig, index) in paginatedGigs" :key="index" class="border-t">
                                    <td class="p-3">{{ index + 1 }}</td>
                                    <td class="p-3 flex gap-2 items-center">
                                        <img :src="gig.image" alt="avatar" loading="lazy"
                                            class="w-[30px] h-[30px] rounded-full object-cover">
                                        <div class="flex flex-col gap-0">
                                            <h3 class="font-semibold text-lg mb-0">{{ gig.titleHeader }}</h3>
                                            <p class="text-gray-500 text-xs">{{ gig.titleSubHeader }}</p>
                                        </div>

                                    </td>
                                    <td class="p-3">{{ gig.view }}</td>
                                    <td class="p-3">{{ gig.applied }}</td>
                                    <td class="p-3">{{ gig.location }}</td>
                                    <td class="p-3">{{ gig.price }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <Paginator :rows="rowsGigs" :totalRecords="gigs?.length || 0" :first="firstGigs"
                                @page="onGigsPageChange" class="mt-4" />
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value="1">
                    <div v-if="loadingUsers">Loading users...</div>
                    <div v-else-if="!loadingUsers && paginatedUsers.length === 0"
                        class="flex flex-col justify-center items-center h-40 text-gray-500 text-lg">
                        <i class="pi pi-folder-open" style="color: gray; font-size: 6rem"></i>
                        No data found
                    </div>
                    <div v-else class="overflow-x-auto w-full">
                        <table class="min-w-[700px] w-full text-left border">
                            <thead class="">
                                <tr class="bg-gray-100">
                                    <th class="p-3">S/N</th>
                                    <th class="p-3">Client Name</th>
                                    <th class="p-3">Phone</th>
                                    <th class="p-3">Wallet Balance</th>
                                    <th class="p-3">Location</th>
                                    <th class="p-3">Active Gig</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(user, index) in paginatedUsers" :key="index" class="border-t">
                                    <td class="p-3">{{ index + 1 }}</td>
                                    <td class="p-3 flex gap-2 items-center">
                                        <img :src="user.image" alt="avatar" loading="lazy"
                                            class="w-[30px] h-[30px] rounded-full object-cover">
                                        <div class="flex flex-col gap-0">
                                            <h3 class="font-semibold text-lg mb-0">{{ user.clientName }}</h3>
                                            <p class="text-gray-500 text-xs">{{ user.titleSubHeader }}</p>
                                        </div>

                                    </td>
                                    <td class="p-3">{{ user.phone }}</td>
                                    <td class="p-3">{{ user.walletBalance }}</td>
                                    <td class="p-3">{{ user.location }}</td>
                                    <td class="p-3">{{ user.activeGig }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <Paginator :rows="rowsUsers" :totalRecords="users?.length || 0" :first="first"
                                @page="onUsersPageChange" class="mt-4" />
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
    { title: 'Recent Gig Post', value: '0' },
    { title: 'Active Users', value: '1' },
]);

// Fetch data
const { data: gigs, loading: loadingGigs } = useApi(fetchRecentGigs);
const { data: users, loading: loadingUsers } = useApi(fetchActiveUsers);

// filter by time
const selectedRange = ref({ label: 'Today', value: 'today' }); // default selection

const ranges = [
    { label: 'Today', value: 'today' },
    { label: 'Past 7 days', value: 'week' },
    { label: 'This month', value: 'month' },
];

function isWithinRange(dateStr, range) {
    const date = new Date(dateStr);
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    if (range === 'today') {
        return date >= startOfToday;
    }

    if (range === 'week') {
        const pastWeek = new Date(startOfToday);
        pastWeek.setDate(pastWeek.getDate() - 7);
        return date >= pastWeek;
    }

    if (range === 'month') {
        const pastMonth = new Date(startOfToday);
        pastMonth.setMonth(pastMonth.getMonth() - 1);
        return date >= pastMonth;
    }

    return true;
}


// for gigs
const firstGigs = ref(0); // current starting index
const rowsGigs = ref(5);  // items per page

const filteredGigs = computed(() => {
    return gigs.value?.filter(gig => isWithinRange(gig.date, selectedRange.value.value)) || [];
});

const paginatedGigs = computed(() => {
    return filteredGigs.value?.slice(firstGigs.value, firstGigs.value + rowsGigs.value) || [];
});

const onGigsPageChange = (event) => {
    firstGigs.value = event.first;
    rowsGigs.value = event.rows;
};

// for users
const firstUsers = ref(0);
const rowsUsers = ref(5);

const filteredUsers = computed(() => {
    return users.value?.filter(user => isWithinRange(user.date, selectedRange.value.value)) || [];
});

const paginatedUsers = computed(() => {
    return filteredUsers.value?.slice(firstUsers.value, firstUsers.value + rowsUsers.value) || [];
});

const onUsersPageChange = (event) => {
    firstUsers.value = event.first;
    rowsUsers.value = event.rows;
};
</script>

<style scoped>
.card {
    padding: 1rem;
}
</style>
