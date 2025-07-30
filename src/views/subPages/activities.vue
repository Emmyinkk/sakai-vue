<template>
    <div class="bg-white dark:bg-[#27272a] rounded-lg p-5">
        <div class="flex justify-between items-start flex-col md:flex-row md:items-center">
            <div class="flex gap-3 items-center h-full mb-5">
                <div class="w-5 bg-green-500 rounded-md min-h-[25px] h-full"></div>
                <h1 class="text-lg m-0">Activities</h1>
            </div>
            <div class="flex gap-2 items-center w-full md:w-auto flex-wrap">
                <IconField class="w-full sm:w-auto">
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText v-model="searchQuery" placeholder="Keyword Search" class="w-full md:w-auto" />
                </IconField>
                <Button label="Mark All As Read" icon="pi pi-check" severity="secondary" size="normal"
                    class="hover:bg-primary" @click="markAllUnreadAsRead" />
            </div>
        </div>
        <div class="mt-10">
            <div v-if="activityStore.loading">Loading...</div>
            <div v-else-if="activityStore.error">Error loading activities: {{
                activityStore.error.message }}
            </div>
            <div v-else-if="paginatedActivities.length === 0"
                class="flex flex-col gap-2 justify-center items-center h-40 text-gray-500 text-lg">
                <i class="pi pi-bell" style="color: gray; font-size: 3rem"></i>
                No unread activities.
            </div>
            <div class="flex flex-col gap-2" v-else>
                <div v-for="(item) in paginatedActivities" :key="item.id"
                    class="grid grid-cols-2 items-center gap-5 md:gap-0 md:grid-cols-6 border border-[#06a28d2a] rounded-lg p-4 transition-all duration-600 ease-in-out"
                    :class="[
                        item.isExpanded ? 'max-h-[700px] md:items-start' : 'max-h-auto md:items-center',
                        item.isRead ? 'bg-transparent' : 'bg-[#1351970D]']">
                    <div class="flex gap-4 items-center col-span-3 ">
                        <img :src="item.image" alt="" class="w-[48px] h-[48px] rounded-full object-cover">
                        <div class="flex flex-col">
                            <p class="font-semibold text-lg mb-0" :class="[
                                item.isExpanded ? 'whitespace-normal' : 'whitespace-nowrap overflow-hidden text-ellipsis max-w-[350px]'
                            ]">{{ item.activity }}
                            </p>
                            <p class="text-xs text-gray-500">{{ item.country }}</p>
                        </div>
                    </div>
                    <p class="text-sm mb-0 text-center">{{ formatActivityDate(item.date) }}</p>
                    <p class="text-base font-semibold  text-gray-500 mb-0 text-center">{{ item.user }}</p>
                    <div class="text-center">
                        <Button label="view" severity="info" rounded :variant="item.isRead ? 'outlined' : 'undefined'"
                            @click="handleReadActivities(item.id)" />
                    </div>
                </div>
            </div>
            <Paginator v-if="activityStore.activities.length > 0" :rows="rows"
                :totalRecords="activityStore.activities.length" :first="first" @page="onPageChange" class="mt-4">
            </Paginator>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useApi } from '@/composables/useApi';
import { useActivityStore } from '@/stores/activities'

const activityStore = useActivityStore();
const searchQuery = ref('');

const first = ref(0);
const rows = ref(10);

onMounted(() => {
    activityStore.loadActivities();
});

const applySearchFilter = (list) => {
    if (!searchQuery.value) {
        return list;
    }
    const query = searchQuery.value.toLowerCase();
    return list.filter(item =>
        item.activity.toLowerCase().includes(query)
    );
};

const allActivitiesFilteredBySearch = computed(() => {
    return applySearchFilter(activityStore.activities);
});

const paginatedActivities = computed(() => {
    const start = first.value;
    const end = first.value + rows.value;
    return allActivitiesFilteredBySearch.value.slice(start, end);
});

const onPageChange = (event) => {
    first.value = event.first;
    rows.value = event.rows;
};

const handleReadActivities = (id) => {
    activityStore.markActivity(id, true);

    const activity = activityStore.activities.find(n => n.id === id);
    if (activity) {
        activity.isExpanded = !activity.isExpanded;
    }
};

const markAllUnreadAsRead = () => {
    activityStore.activities.forEach(item => {
        if (!item.isRead) {
            activityStore.markActivity(item.id, true);
            item.isExpanded = false;
        }
    });
};

const formatActivityDate = (dateString) => {
    const activityDate = new Date(dateString);
    const now = new Date();

    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    startOfYesterday.setDate(startOfYesterday.getDate() - 1);
    const startOfTwoDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    startOfTwoDaysAgo.setDate(startOfTwoDaysAgo.getDate() - 2);

    const notifDateOnly = new Date(activityDate.getFullYear(), activityDate.getMonth(), activityDate.getDate());

    if (notifDateOnly.getTime() === startOfToday.getTime()) {
        return 'Today ' + activityDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (notifDateOnly.getTime() === startOfYesterday.getTime()) {
        return 'Yesterday ' + activityDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (notifDateOnly.getTime() === startOfTwoDaysAgo.getTime()) {
        return '2 days ago ' + activityDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
        return activityDate.toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric'
        });
    }
};


</script>