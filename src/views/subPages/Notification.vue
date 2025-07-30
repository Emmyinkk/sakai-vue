<template>
    <div class="bg-white dark:bg-[#27272a] rounded-lg p-5">
        <div class="flex justify-between items-start flex-col md:flex-row md:items-center">
            <div class="flex gap-3 items-center h-full mb-5">
                <div class="w-5 bg-green-500 rounded-md min-h-[25px] h-full"></div>
                <h1 class="text-lg m-0">Notification</h1>
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


        <Tabs v-model:value="activeTab" :pt="{root: '!rounded-md'}">
            <Tablist>
                <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value"
                    class="font-bold whitespace-nowrap text-lg">{{ tab.title }}</Tab>
            </Tablist>
            <TabPanels>
                <TabPanel value="0">
                    <div v-if="notificationStore.loading" class="flex flex-col justify-center items-center text-xl">
                        Loading...</div>
                    <div v-else-if="notificationStore.error" class="flex flex-col justify-center items-center text-xl">
                        Error loading notifications: {{ error.message }}
                    </div>
                    <div v-else-if="paginatedNotifications.length === 0"
                        class="flex flex-col gap-2 justify-center items-center h-40 text-gray-500 text-lg">
                        <i class="pi pi-bell" style="color: gray; font-size: 3rem"></i>
                        No Notifications
                    </div>
                    <div v-else>
                        <div v-for="(item) in paginatedNotifications" :key="item.id"
                            class="grid grid-cols-2 md:grid-cols-4 items-start gap-4 p-4 border border-[#06a28d2a] rounded-lg mb-2 pb-4 transition-all duration-600 ease-in-out cursor-pointer"
                            :class="[
                                item.isExpanded ? 'max-h-[700px] md:items-start' : 'max-h-auto md:items-center',
                                item.isRead ? 'bg-transparent' : 'bg-[#1351970D]']"
                            @click="handleNotificationClickInTab(item.id, '0')">
                            <div class="col-span-2">
                                <p class="text-base font-semibold" :class="[
                                    item.isExpanded ? 'whitespace-normal' : 'whitespace-nowrap overflow-hidden text-ellipsis max-w-[600px]'
                                ]">{{ item.notification }}</p>
                            </div>
                            <div class="text-start md:text-center">
                                <div v-if="!item.isRead"
                                    class="py-2 px-4 text-center text-[#219653] bg-[#6FCF974D] rounded-2xl max-w-[60px] md:mx-auto my-0">
                                    <span class="text-xs">New</span>
                                </div>
                                <span v-else class="text-xs">{{ formatNotificationDate(item.date) }}</span>
                            </div>
                            <div class="flex justify-end">
                                <button
                                    class="py-2 px-4 text-center text-[#EB5757] bg-[#EB57572B] rounded-2xl max-w-[60px] md:mx-auto my-0"
                                    @click="openConfirmation">
                                    <span class="text-sm">Delete</span>
                                </button>
                                <Dialog header="Confirmation" v-model:visible="displayConfirmation"
                                    :style="{ width: '350px' }" :modal="true">
                                    <div class="flex items-center justify-center">
                                        <i class="pi pi-exclamation-triangle mr-4" style="font-size: 2rem" />
                                        <span>Are you sure you want to proceed?</span>
                                    </div>
                                    <template #footer>
                                        <Button label="No" icon="pi pi-times" @click="closeConfirmation" text
                                            severity="secondary" />
                                        <Button label="Yes" icon="pi pi-check" @click="closeConfirmation"
                                            severity="danger" outlined autofocus />
                                    </template>
                                </Dialog>
                            </div>
                        </div>
                    </div>

                    <Paginator v-if="notificationStore.notifications.length > 0" :rows="rows"
                        :totalRecords="notificationStore.notifications.length" :first="first" @page="onPageChange"
                        class="mt-4">
                    </Paginator>

                </TabPanel>
                <TabPanel value="1">
                    <div v-if="notificationStore.loading">Loading...</div>
                    <div v-else-if="notificationStore.error">Error loading notifications: {{
                        notificationStore.error.message }}
                    </div>
                    <div v-else-if="paginatedTodayNotifications.length === 0 && todayNotifications.length === 0"
                        class="flex flex-col gap-2 justify-center items-center h-40 text-gray-500 text-lg">
                        <i class="pi pi-bell" style="color: gray; font-size: 3rem"></i>
                        No new notifications today.
                    </div>
                    <div v-else>
                        <div v-for="(item) in paginatedTodayNotifications" :key="item.id"
                            class="grid grid-cols-2 md:grid-cols-4 items-start md:items-center flex-wrap gap-4 p-4 bg-[#1351970D] rounded-lg mb-2 cursor-pointer transition-all duration-300 ease-in-out"
                            :class="[
                                item.isExpanded ? 'max-h-[700px] md:items-start' : 'max-h-auto md:items-center',
                                item.isRead ? 'bg-transparent' : 'bg-[#1351970D]']"
                            @click="handleNotificationClickInTab(item.id, '1')">
                            <div class="col-span-2">
                                <p class="text-base font-semibold" :class="[
                                    item.isExpanded ? 'whitespace-normal' : 'whitespace-nowrap overflow-hidden text-ellipsis max-w-[600px]'
                                ]">{{ item.notification }}</p>
                            </div>
                            <div class="text-start md:text-center">
                                <div v-if="!item.isRead"
                                    class="py-2 px-4 text-center text-[#219653] bg-[#6FCF974D] rounded-2xl max-w-[60px] md:mx-auto my-0">
                                    <span class="text-xs">New</span>
                                </div>
                                <span v-else class="text-xs">{{ formatNotificationDate(item.date) }}</span>
                            </div>
                            <div class="flex justify-end">
                                <button
                                    class="py-2 px-4 text-center text-[#EB5757] bg-[#EB57572B] rounded-2xl max-w-[60px] md:mx-auto my-0"
                                    @click.stop="openConfirmation">
                                    <span class="text-sm">Delete</span>
                                </button>
                                <Dialog header="Confirmation" v-model:visible="displayConfirmation"
                                    :style="{ width: '350px' }" :modal="true">
                                    <div class="flex items-center justify-center">
                                        <i class="pi pi-exclamation-triangle mr-4" style="font-size: 2rem" />
                                        <span>Are you sure you want to proceed?</span>
                                    </div>
                                    <template #footer>
                                        <Button label="No" icon="pi pi-times" @click="closeConfirmation" text
                                            severity="secondary" />
                                        <Button label="Yes" icon="pi pi-check" @click="closeConfirmation"
                                            severity="danger" outlined autofocus />
                                    </template>
                                </Dialog>
                            </div>
                        </div>
                    </div>

                    <Paginator v-if="todayNotifications.length > todayRows" :rows="todayRows"
                        :totalRecords="todayNotifications.length" :first="todayFirst" @page="onTodayPageChange"
                        class="mt-4"></Paginator>
                </TabPanel>

                <TabPanel value="2">
                    <div v-if="notificationStore.loading">Loading...</div>
                    <div v-else-if="notificationStore.error">Error loading notifications: {{
                        notificationStore.error.message }}
                    </div>
                    <div v-else-if="paginatedUnreadNotifications.length === 0 && unreadNotificationsFiltered.length === 0"
                        class="flex flex-col gap-2 justify-center items-center h-40 text-gray-500 text-lg">
                        <i class="pi pi-bell" style="color: gray; font-size: 3rem"></i>
                        No unread notifications.
                    </div>
                    <div v-else>
                        <div v-for="(item) in paginatedUnreadNotifications" :key="item.id"
                            class="grid grid-cols-2 md:grid-cols-4 items-start md:items-center flex-wrap gap-4 p-4 bg-[#1351970D] rounded-lg mb-2 cursor-pointer transition-all duration-300 ease-in-out max-h-[700px]"
                            :class="[
                                item.isExpanded ? 'max-h-[700px] md:items-start' : 'max-h-auto md:items-center',
                                item.isRead ? 'bg-transparent' : 'bg-[#1351970D]']"
                            @click="handleNotificationClickInTab(item.id, '2')">
                            <div class="col-span-2">
                                <p class="text-base font-semibold" :class="[
                                    item.isExpanded ? 'whitespace-normal' : 'whitespace-nowrap overflow-hidden text-ellipsis max-w-[600px]'
                                ]">{{ item.notification }}</p>
                                <div v-if="item.isExpanded && !item.isRead" class="mt-2">
                                    <Button label="Mark as Read" icon="pi pi-check" severity="success" size="small"
                                        @click.stop="markNotificationAsRead(item.id)" />
                                </div>
                            </div>
                            <div class="text-start md:text-center">
                                <div v-if="!item.isRead"
                                    class="py-2 px-4 text-center text-[#219653] bg-[#6FCF974D] rounded-2xl max-w-[60px] md:mx-auto my-0">
                                    <span class="text-xs">New</span>
                                </div>
                                <span v-else class="text-xs">{{ formatNotificationDate(item.date) }}</span>
                            </div>
                            <div class="flex justify-end">
                                <button
                                    class="py-2 px-4 text-center text-[#EB5757] bg-[#EB57572B] rounded-2xl max-w-[60px] md:mx-auto my-0"
                                    @click.stop="openConfirmation">
                                    <span class="text-sm">Delete</span>
                                </button>
                                <Dialog header="Confirmation" v-model:visible="displayConfirmation"
                                    :style="{ width: '350px' }" :modal="true">
                                    <div class="flex items-center justify-center">
                                        <i class="pi pi-exclamation-triangle mr-4" style="font-size: 2rem" />
                                        <span>Are you sure you want to proceed?</span>
                                    </div>
                                    <template #footer>
                                        <Button label="No" icon="pi pi-times" @click="closeConfirmation" text
                                            severity="secondary" />
                                        <Button label="Yes" icon="pi pi-check" @click="closeConfirmation"
                                            severity="danger" outlined autofocus />
                                    </template>
                                </Dialog>
                            </div>
                        </div>
                    </div>

                    <Paginator v-if="unreadNotificationsFiltered.length > unreadRows" :rows="unreadRows"
                        :totalRecords="unreadNotificationsFiltered.length" :first="unreadFirst"
                        @page="onUnreadPageChange" class="mt-4">
                    </Paginator>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount, watch } from 'vue';
import { useApi } from '@/composables/useApi';
import { useNotificationStore } from '@/stores/notifications';

const displayConfirmation = ref(false);
const notificationStore = useNotificationStore();

const searchQuery = ref('');

// --- Tab Tracking ---
const activeTab = ref('0');

// --- Pagination Stateb ---
const first = ref(0);
const rows = ref(10);
const todayFirst = ref(0);
const todayRows = ref(10);
const unreadFirst = ref(0);
const unreadRows = ref(10);

onMounted(() => {
    notificationStore.loadNotifications();
});

// --- Search-filtered Computed Properties (NEW) ---
const applySearchFilter = (list) => {
    if (!searchQuery.value) {
        return list;
    }
    const query = searchQuery.value.toLowerCase();
    return list.filter(item =>
        item.notification.toLowerCase().includes(query)
    );
};

const allNotificationsFilteredBySearch = computed(() => {
    return applySearchFilter(notificationStore.notifications);
});

const todayNotificationsFilteredBySearch = computed(() => {
    // Start with already 'today' filtered notifications
    const baseList = todayNotifications.value;
    return applySearchFilter(baseList);
});

const unreadNotificationsFilteredBySearch = computed(() => {
    // Start with already 'unread' filtered notifications
    const baseList = unreadNotificationsFiltered.value;
    return applySearchFilter(baseList);
});

// --- Paginated Notifications Computed Property ---
const paginatedNotifications = computed(() => {
    const start = first.value;
    const end = first.value + rows.value;
    return allNotificationsFilteredBySearch.value.slice(start, end);
});

// --- Computed Property for 'New' (Today) Tab Filtering ---
const todayNotifications = computed(() => {
    const today = new Date();
    // Normalize 'today' to start of day for comparison
    today.setHours(0, 0, 0, 0);

    return notificationStore.notifications.filter(item => {
        const itemDate = new Date(item.date);
        // Normalize itemDate to start of day for comparison
        itemDate.setHours(0, 0, 0, 0);
        return itemDate.getTime() === today.getTime();
    });
});

// --- computed Property for 'Unread' Tab Filtering ---
const unreadNotificationsFiltered = computed(() => {
    return notificationStore.notifications.filter(item => !item.isRead);
});

// --- Computed Property for 'New' (Today) Tab Pagination ---
const paginatedTodayNotifications = computed(() => {
    const start = todayFirst.value;
    const end = todayFirst.value + todayRows.value;
    return todayNotifications.value.slice(start, end);
});

// --- Computed Property for 'Unread' Tab Pagination ---
const paginatedUnreadNotifications = computed(() => {
    const start = unreadFirst.value;
    const end = unreadFirst.value + unreadRows.value;
    return unreadNotificationsFiltered.value.slice(start, end);
});


// --- Paginator Page Change Handler ---
const onPageChange = (event) => {
    first.value = event.first;
    rows.value = event.rows;
};

// --- Paginator Page Change Handler for 'New' (Today) Tab ---
const onTodayPageChange = (event) => {
    todayFirst.value = event.first;
    todayRows.value = event.rows;
};


// --- Paginator Page Change Handler for 'Unread' Tab ---
const onUnreadPageChange = (event) => {
    unreadFirst.value = event.first;
    unreadRows.value = event.rows;
};

// Handles tab change event from PrimeVue Tabs component

watch([activeTab, searchQuery], ([newTab, newSearchQuery], [oldTab, oldSearchQuery]) => {
    // Only log if either changed to avoid excessive logs from other re-renders
    if (newTab !== oldTab || newSearchQuery !== oldSearchQuery) {
        switch (activeTab.value) {
            case '0':
                first.value = 0;
                break;
            case '1':
                todayFirst.value = 0;
                break;
            case '2':
                unreadFirst.value = 0;
                break;
        }
    }

    // Existing logic for marking unread items as read when leaving the Unread tab
    if (oldTab === '2' && newTab !== '2') {
        markExpandedUnreadNotifications();
    }
});

// Handles notification click behavior based on the current tab
const handleNotificationClickInTab = (id, tabValue) => {
    const notification = notificationStore.notifications.find(n => n.id === id);
    if (notification) {
        notification.isExpanded = !notification.isExpanded; // Always toggle expansion

        // Only mark as read immediately if NOT in the 'Unread' tab
        if (tabValue === '0' || tabValue === '1') {
            notificationStore.markNotification(id, true);
        }
    }
};

// Explicitly marks a notification as read and optionally collapses it
const markNotificationAsRead = (id) => {
    notificationStore.markNotification(id, true);

    const notification = notificationStore.notifications.find(n => n.id === id);
    if (notification) {
        notification.isExpanded = false;
    }
};

// Function to mark all currently expanded AND unread notifications as read
const markExpandedUnreadNotifications = () => {
    notificationStore.notifications.forEach(item => {
        if (!item.isRead && item.isExpanded) {
            notificationStore.markNotification(item.id, true);
            item.isExpanded = false; // Collapse them as they are now read
        }
    });
};

// Mark all unread notifications as read
const markAllUnreadAsRead = () => {
    notificationStore.notifications.forEach(item => {
        if (!item.isRead) {
            notificationStore.markNotification(item.id, true);
            item.isExpanded = false; // Collapse any expanded ones
        }
    });
    // After marking all as read, reset the pagination for the unread tab
    // to ensure the user sees the new (likely empty) state from the beginning.
    unreadFirst.value = 0;
};

// Lifecycle hook to mark unread notifications as read when component is unmounted
onBeforeUnmount(() => {
    markExpandedUnreadNotifications();
});

const formatNotificationDate = (dateString) => {
    const notificationDate = new Date(dateString);
    const now = new Date();

    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    startOfYesterday.setDate(startOfYesterday.getDate() - 1);
    const startOfTwoDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    startOfTwoDaysAgo.setDate(startOfTwoDaysAgo.getDate() - 2);

    const notifDateOnly = new Date(notificationDate.getFullYear(), notificationDate.getMonth(), notificationDate.getDate());

    if (notifDateOnly.getTime() === startOfToday.getTime()) {
        return 'Today ' + notificationDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (notifDateOnly.getTime() === startOfYesterday.getTime()) {
        return 'Yesterday ' + notificationDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (notifDateOnly.getTime() === startOfTwoDaysAgo.getTime()) {
        return '2 days ago ' + notificationDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
        return notificationDate.toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric'
        });
    }
};

// tab list
const tabs = ref([
    { title: 'All', value: '0' },
    { title: 'New', value: '1' },
    { title: 'Unread', value: '2' },
]);

function openConfirmation() {
    displayConfirmation.value = true;
}

function closeConfirmation() {
    displayConfirmation.value = false;
}
</script>