<script setup>
import { computed, ref, onMounted } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useApi } from '@/composables/useApi';
import { fetchNotifications, markNotificationAsRead } from '@/api/fetchNotification';
import { useNotificationStore } from '@/stores/notifications';
const op = ref(null);
// import AppConfigurator from './AppConfigurator.vue';

const topNavStyle = computed(() => {
    return {
        left: layoutState.staticMenuDesktopInactive ? '0' : '20rem',
        width: layoutState.staticMenuDesktopInactive ? '100%' : 'calc(100% - 20rem)'
    };
});

const { toggleMenu, toggleDarkMode, isDarkTheme, layoutState } = useLayout();

function toggleDataTable(event) {
    op.value.toggle(event);
}

const { data: notifications, loading, error } = useApi(fetchNotifications);

// Function to mark a notification as read
const markAsRead = (id) => {
    const notification = notifications.value.find(n => n.id === id);
    if (notification) {
        notification.isRead = true;
        // In a real application, you would also make an API call here
        // to update the read status on the server.
        // e.g., await api.post('/notifications/mark-read', { id });
    }
};

// const markAsRead = async (id) => { // Made it async because we'll await the API call
//   const notification = notifications.value.find(n => n.id === id);
//   if (notification) {
//     // 1. Optimistic UI update (update immediately for responsiveness)
//     notification.isRead = true; // This will update the UI immediately

//     try {
//       // 2. Make the API call to update the status on the server
//       await markNotificationAsRead(id);
//       // If the API call fails, you might want to revert the UI change:
//       // notification.isRead = false;
//       // You could also show a toast notification here (e.g., PrimeVue's Toast)
//     } catch (apiError) {
//       console.error("Failed to mark notification as read on server:", apiError);
//       // Revert UI if API call fails (important for data consistency)
//       notification.isRead = false;
//       // Potentially show an error message to the user
//       // toast.add({severity:'error', summary: 'Error', detail:'Failed to update notification status.', life: 3000});
//     }
//   }
// };

const notificationStore = useNotificationStore();

// Load notifications when the component mounts
onMounted(() => {
    notificationStore.loadNotifications();
});

// Computed property to show only the first 5 unread notifications for the popover
const recentNotificationsForPopover = computed(() => {
    const all = [...notificationStore.notifications]; // Create a shallow copy

    // Sort by date in descending order (most recent first)
    all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Slice the first 5 after sorting
    return all.slice(0, 5);
});

// Wrapper function to call Pinia action
const handleClickNotification = (id) => {
    const notification = notificationStore.notifications.find(n => n.id === id);

    if (notification) {
        notificationStore.markNotification(id, true);
        notification.isExpanded = !notification.isExpanded;
    }
};

// Utility function to format the date
const formatNotificationDate = (dateString) => {
    const notificationDate = new Date(dateString);
    const now = new Date(); // Current date and time

    // Get start of today (local time) for comparison
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // Get start of yesterday (local time)
    const startOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    startOfYesterday.setDate(startOfYesterday.getDate() - 1);
    // Get start of 2 days ago (local time)
    const startOfTwoDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    startOfTwoDaysAgo.setDate(startOfTwoDaysAgo.getDate() - 2);

    // Strip time for comparison, focusing on date
    const notifDateOnly = new Date(notificationDate.getFullYear(), notificationDate.getMonth(), notificationDate.getDate());

    // Check if today
    if (notifDateOnly.getTime() === startOfToday.getTime()) {
        return 'Today<br>' + notificationDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    // Check if yesterday
    else if (notifDateOnly.getTime() === startOfYesterday.getTime()) {
        return 'Yesterday<br>' + notificationDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    // Check if 2 days ago
    else if (notifDateOnly.getTime() === startOfTwoDaysAgo.getTime()) {
        return '2 days ago ';
    }
    // For older dates
    else {
        return notificationDate.toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric'
        });
    }
};
</script>

<template>
    <div class="layout-topbar" :style="topNavStyle">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" @click="toggleMenu">
                <i class="pi pi-bars"></i>
            </button>
            <router-link to="/" class="layout-topbar-logo">
                <div class="flex flex-col gap-2">
                    <span>Dashboard</span>
                    <div class="text-xs text-gray-400">Home / <router-link to="/"
                            class="text-black dark:text-white">Dashboard</router-link></div>
                </div>
            </router-link>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                    <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                </button>
                <!-- <div class="relative">
                    <button
                        v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                        type="button" class="layout-topbar-action layout-topbar-action-highlight">
                        <i class="pi pi-palette"></i>
                    </button>
                    <AppConfigurator />
                </div> -->
            </div>

            <button class="layout-topbar-menu-button layout-topbar-action"
                v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }">
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <div>
                        <button type="button" class="layout-topbar-action" @click="toggleDataTable">
                            <i class="pi pi-bell"></i>
                            <span>Notification</span>
                        </button>
                        <Popover ref="op" id="overlay_panel" class="mx-auto my-0" style="width: 100%; max-width: 420px">
                            <h2 class="text-lg">Notification (<span>{{ notificationStore.notificationCount }}</span>)
                            </h2>
                            <div v-if="notificationStore.loading">Loading notifications...</div>
                            <div v-else-if="notificationStore.error">Error loading notifications: {{ error.message }}
                            </div>
                            <div v-else-if="recentNotificationsForPopover.length === 0"
                                class="flex flex-col gap-2 justify-center items-center h-40 text-gray-500 text-lg">
                                <i class="pi pi-bell" style="color: gray; font-size: 3rem"></i>
                                No Notifications
                            </div>
                            <div v-else>
                                <div class="flex flex-col gap-2 mt-2">
                                    <div v-for="(item) in recentNotificationsForPopover" :key="item.id" :class="[
                                        'flex gap-3 justify-between border-1 border-[#E0E0E0] rounded-lg p-3 items-center cursor-pointer text-center mb-2 overflow-hidden transition-all duration-300 ease-in-out',
                                        item.isRead ? 'bg-white dark:bg-transparent' : 'bg-[#F1F1F1] dark:bg-black',
                                        item.isExpanded ? 'max-h-[150px]' : 'max-h-[60px]'
                                    ]" @click="handleClickNotification(item.id)">
                                        <div
                                            class="flex flex-col justify-center items-center rounded-lg bg-white w-[32px] h-[32px]">
                                            <i class="pi pi-database" style="color: #603BE2; font-size: 1rem;"></i>
                                        </div>
                                        <div :class="['flex-grow font-medium text-md',
                                            item.isExpanded ? 'whitespace-normal' : 'whitespace-nowrap overflow-hidden text-ellipsis w-[200px]'
                                        ]" style="min-width: 0;">
                                            {{ item.notification }}
                                        </div>
                                        <div class="text-[10px] ml-4"
                                            :class="{ 'text-gray-500': item.isRead, 'font-bold': !item.isRead }">
                                            <span v-if="!item.isRead">Unread</span>
                                            <span v-else>
                                                <span v-html="formatNotificationDate(item.date)"
                                                    class="text-left"></span>
                                                <!-- {{  }} -->
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-center w-full mt-5" @click="toggleDataTable">
                                    <router-link to="/notification" class="text-center text-blue-500 dark:text-white ">
                                        View all
                                    </router-link>
                                </div>
                            </div>
                            <!-- v-for="(item, index) in notifications" :key="index" -->
                        </Popover>
                    </div>
                    <!-- <button type="button" class="layout-topbar-action">
                        <i class="pi pi-inbox"></i>
                        <span>Messages</span>
                    </button> -->
                    <router-link to="/profile">
                        <button type="button">
                            <div class="w-full flex gap-1 items-center">
                                <img src="/demo/images/image1.png" alt=""
                                    class="w-[42px] h-[42px] rounded-full p-1 border border-gray-500 object-cover">
                                <div class="flex flex-col text-left">
                                    <span class="text-sm text-black dark:text-white font-semibold">Dean Smith</span>
                                    <span class="text-gray-500 text-xs">Super Admin</span>
                                </div>
                            </div>
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
} */
</style>
