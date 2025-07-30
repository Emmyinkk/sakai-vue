<template>
    <div class="bg-white dark:bg-[#27272a] rounded-lg p-5">
        <div class="flex gap-3 items-center h-full mb-5">
            <div class="w-5 bg-green-500 rounded-md min-h-[25px] h-full"></div>
            <h1 class="text-lg m-0">Notification</h1>
        </div>

        <Tabs :value="activeTab" @tab-change="handleTabChange">
            <Tablist>
                <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value"
                    class="font-bold whitespace-nowrap text-lg">{{ tab.title }}</Tab>
            </Tablist>
            <TabPanels>
                <TabPanel value="0" pt="root: 'p-0'">
                    <div v-if="notificationStore.loading">Loading...</div>
                    <div v-else-if="notificationStore.error">Error loading notifications: {{ notificationStore.error.message }}
                    </div>
                    <div v-else-if="paginatedNotifications.length === 0 && notificationStore.notifications.length === 0"
                        class="flex flex-col gap-2 justify-center items-center h-40 text-gray-500 text-lg">
                        <i class="pi pi-bell" style="color: gray; font-size: 3rem"></i>
                        No Notifications
                    </div>
                    <div v-else>
                        <div v-for="(item) in paginatedNotifications" :key="item.id"
                            class="grid grid-cols-2 md:grid-cols-4 items-start md:items-center flex-wrap gap-4 p-4 bg-[#1351970D] rounded-lg mb-2 cursor-pointer transition-all duration-300 ease-in-out"
                            :class="{
                                'max-h-none': item.isExpanded,
                                'max-h-[80px] overflow-hidden': !item.isExpanded
                            }"
                             @click="handleNotificationClickInTab(item.id, '0')"> <div class="col-span-2">
                                <p class="text-base font-semibold"
                                   :class="{
                                       'whitespace-normal': item.isExpanded,
                                       'whitespace-nowrap overflow-hidden text-ellipsis': !item.isExpanded
                                   }"
                                >{{ item.notification }}</p>
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

                    <Paginator v-if="notificationStore.notifications.length > rows"
                        :rows="rows"
                        :totalRecords="notificationStore.notifications.length"
                        :first="first"
                        @page="onPageChange"
                        :template="{
                            '640px': 'PrevPageLink CurrentPageReport NextPageLink',
                            '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                            '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                            default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
                        }"
                        :rowsPerPageOptions="[10, 20, 30]"
                        class="mt-4"
                    ></Paginator>

                </TabPanel>

                <TabPanel value="1" pt="root: 'p-0'">
                    <div v-if="notificationStore.loading">Loading...</div>
                    <div v-else-if="notificationStore.error">Error loading notifications: {{ notificationStore.error.message }}
                    </div>
                    <div v-else-if="paginatedTodayNotifications.length === 0 && todayNotifications.length === 0"
                        class="flex flex-col gap-2 justify-center items-center h-40 text-gray-500 text-lg">
                        <i class="pi pi-bell" style="color: gray; font-size: 3rem"></i>
                        No new notifications today.
                    </div>
                    <div v-else>
                        <div v-for="(item) in paginatedTodayNotifications" :key="item.id"
                            class="grid grid-cols-2 md:grid-cols-4 items-start md:items-center flex-wrap gap-4 p-4 bg-[#1351970D] rounded-lg mb-2 cursor-pointer transition-all duration-300 ease-in-out"
                            :class="{
                                'max-h-none': item.isExpanded,
                                'max-h-[80px] overflow-hidden': !item.isExpanded
                            }"
                            @click="handleNotificationClickInTab(item.id, '1')"> <div class="col-span-2">
                                <p class="text-base font-semibold"
                                   :class="{
                                       'whitespace-normal': item.isExpanded,
                                       'whitespace-nowrap overflow-hidden text-ellipsis': !item.isExpanded
                                   }"
                                >{{ item.notification }}</p>
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

                    <Paginator v-if="todayNotifications.length > todayRows"
                        :rows="todayRows"
                        :totalRecords="todayNotifications.length"
                        :first="todayFirst"
                        @page="onTodayPageChange"
                        :template="{
                            '640px': 'PrevPageLink CurrentPageReport NextPageLink',
                            '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                            '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                            default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
                        }"
                        :rowsPerPageOptions="[10, 20, 30]"
                        class="mt-4"
                    ></Paginator>
                </TabPanel>

                <TabPanel value="2" pt="root: 'p-0'">
                    <div v-if="notificationStore.loading">Loading...</div>
                    <div v-else-if="notificationStore.error">Error loading notifications: {{ notificationStore.error.message }}
                    </div>
                    <div v-else-if="paginatedUnreadNotifications.length === 0 && unreadNotificationsFiltered.length === 0"
                        class="flex flex-col gap-2 justify-center items-center h-40 text-gray-500 text-lg">
                        <i class="pi pi-bell" style="color: gray; font-size: 3rem"></i>
                        No unread notifications.
                    </div>
                    <div v-else>
                        <div v-for="(item) in paginatedUnreadNotifications" :key="item.id"
                            class="grid grid-cols-2 md:grid-cols-4 items-start md:items-center flex-wrap gap-4 p-4 bg-[#1351970D] rounded-lg mb-2 cursor-pointer transition-all duration-300 ease-in-out"
                            :class="{
                                'max-h-none': item.isExpanded,
                                'max-h-[80px] overflow-hidden': !item.isExpanded
                            }"
                            @click="handleNotificationClickInTab(item.id, '2')"> <div class="col-span-2">
                                <p class="text-base font-semibold"
                                   :class="{
                                       'whitespace-normal': item.isExpanded,
                                       'whitespace-nowrap overflow-hidden text-ellipsis': !item.isExpanded
                                   }"
                                >{{ item.notification }}</p>
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

                    <Paginator v-if="unreadNotificationsFiltered.length > unreadRows"
                        :rows="unreadRows"
                        :totalRecords="unreadNotificationsFiltered.length"
                        :first="unreadFirst"
                        @page="onUnreadPageChange"
                        :template="{
                            '640px': 'PrevPageLink CurrentPageReport NextPageLink',
                            '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                            '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                            default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
                        }"
                        :rowsPerPageOptions="[10, 20, 30]"
                        class="mt-4"
                    ></Paginator>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, onBeforeUnmount } from 'vue'; // Added watch, onBeforeUnmount
import { useNotificationStore } from '@/stores/notifications';

// PrimeVue components
import Paginator from 'primevue/paginator';
import Tabs from 'primevue/tabs';
import Tablist from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

const displayConfirmation = ref(false);
const notificationStore = useNotificationStore();

// --- Tab Tracking ---
const activeTab = ref('0'); // Default active tab to '0' (All)

// --- Pagination State for 'All' Tab ---
const first = ref(0);
const rows = ref(10);

// --- Pagination State for 'New' (Today) Tab ---
const todayFirst = ref(0);
const todayRows = ref(10);

// --- Pagination State for 'Unread' Tab ---
const unreadFirst = ref(0);
const unreadRows = ref(10);

onMounted(() => {
    notificationStore.loadNotifications();
});

// --- Computed Property for 'All' Tab Pagination ---
const paginatedNotifications = computed(() => {
    const allNotifications = notificationStore.notifications;
    const start = first.value;
    const end = first.value + rows.value;
    return allNotifications.slice(start, end);
});

// --- Computed Property for 'New' (Today) Tab Filtering ---
const todayNotifications = computed(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return notificationStore.notifications.filter(item => {
        const itemDate = new Date(item.date);
        itemDate.setHours(0, 0, 0, 0);
        return itemDate.getTime() === today.getTime();
    });
});

// --- Computed Property for 'New' (Today) Tab Pagination ---
const paginatedTodayNotifications = computed(() => {
    const start = todayFirst.value;
    const end = todayFirst.value + todayRows.value;
    return todayNotifications.value.slice(start, end);
});

// --- Computed Property for 'Unread' Tab Filtering ---
const unreadNotificationsFiltered = computed(() => {
    return notificationStore.notifications.filter(item => !item.isRead);
});

// --- Computed Property for 'Unread' Tab Pagination ---
const paginatedUnreadNotifications = computed(() => {
    const start = unreadFirst.value;
    const end = unreadFirst.value + unreadRows.value;
    return unreadNotificationsFiltered.value.slice(start, end);
});


// --- Paginator Page Change Handler for 'All' Tab ---
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


// NEW: Handles tab change event from PrimeVue Tabs component
const handleTabChange = (event) => {
    const oldTab = activeTab.value;
    activeTab.value = event.value; // Update activeTab ref

    // If leaving the 'Unread' tab, mark all expanded unread notifications as read
    if (oldTab === '2' && activeTab.value !== '2') {
        markExpandedUnreadNotifications();
    }
};

// MODIFIED: Handles notification click behavior based on the current tab
const handleNotificationClickInTab = (id, tabValue) => {
    const notification = notificationStore.notifications.find(n => n.id === id);
    if (notification) {
        notification.isExpanded = !notification.isExpanded; // Always toggle expansion

        // Only mark as read immediately if NOT in the 'Unread' tab
        if (tabValue === '0' || tabValue === '1') {
            notificationStore.markNotification(id, true);
        }
        // If in 'Unread' tab ('2'), it will NOT mark as read here.
        // It relies on the explicit 'Mark as Read' button or automatic mark on tab/page change.
    }
};

// NEW: Explicitly marks a notification as read and optionally collapses it
const markNotificationAsRead = (id) => {
    notificationStore.markNotification(id, true);
    // Optional: Collapse the notification immediately after marking as read
    const notification = notificationStore.notifications.find(n => n.id === id);
    if (notification) {
        notification.isExpanded = false;
    }
};

// NEW: Function to mark all currently expanded AND unread notifications as read
const markExpandedUnreadNotifications = () => {
    console.log('Marking expanded unread notifications as read due to tab/component change...');
    notificationStore.notifications.forEach(item => {
        if (!item.isRead && item.isExpanded) {
            notificationStore.markNotification(item.id, true);
            item.isExpanded = false; // Collapse them as they are now read
        }
    });
};

// NEW: Watch for activeTab changes to trigger auto-mark-as-read
// This is handled by handleTabChange now, so watch is not strictly needed for tab changes.
// watch(activeTab, (newTab, oldTab) => {
//     if (oldTab === '2' && newTab !== '2') {
//         markExpandedUnreadNotifications();
//     }
// });

// NEW: Lifecycle hook to mark unread notifications as read when component is unmounted
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