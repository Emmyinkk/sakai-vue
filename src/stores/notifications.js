// src/stores/notifications.js
import { defineStore } from 'pinia';
// You might want to import your API service here if not using useApi directly
import { fetchNotifications, markNotificationAsRead } from '@/api/fetchNotification'; // Assuming you created this

export const useNotificationStore = defineStore('notifications', {
  state: () => ({
    allNotifications: [], // This will hold all notifications, including their read status
    loading: false,
    error: null,
  }),
  getters: {
    // Getters for specific views
    unreadNotifications: (state) => state.allNotifications.filter(n => !n.isRead),
    readNotifications: (state) => state.allNotifications.filter(n => n.isRead),
    // Or just a general getter if you filter in the component
    notifications: (state) => state.allNotifications,
    notificationCount: (state) => state.allNotifications.filter(n => !n.isRead).length, // For the badge
  },
  actions: {
    async loadNotifications() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetchNotifications(); // Your API call
        // Initialize isRead status based on localStorage or default to false
        const storedReadStatus = JSON.parse(localStorage.getItem('notificationReadStatus') || '{}');

        this.allNotifications = response.data.map(n => ({
          ...n,
          isRead: storedReadStatus[n.id] === true, // Check if ID exists and is true in storage
          isExpanded: false,
        }));

      } catch (err) {
        this.error = err;
        console.error('Failed to load notifications:', err);
      } finally {
        this.loading = false;
      }
    },

    async markNotification(id, isReadStatus = true) {
      const notification = this.allNotifications.find(n => n.id === id);
      if (notification) {
        // Optimistic UI update in the store
        notification.isRead = isReadStatus;

        // Persist to localStorage immediately
        this.saveReadStatusToLocalStorage();

        // try {
        //   // Make API call to update server (if applicable)
        //   await markNotificationAsRead(id); // Your API call to server
        // } catch (err) {
        //   console.error(`Failed to mark notification ${id} as ${isReadStatus ? 'read' : 'unread'} on server:`, err);
        //   // Revert if API call fails
        //   notification.isRead = !isReadStatus;
        //   this.saveReadStatusToLocalStorage(); // Revert localStorage too
        //   this.error = err; // Set store error for UI
        //   throw err; // Re-throw for component to catch if needed
        // }
      }
    },

    // Helper to save read status to localStorage
    saveReadStatusToLocalStorage() {
      const readStatus = {};
      this.allNotifications.forEach(n => {
        if (n.isRead) {
          readStatus[n.id] = true; // Store only read notifications
        }
      });
      console.log(readStatus)
      localStorage.setItem('notificationReadStatus', JSON.stringify(readStatus));
    },

    // Optional: Clear a specific notification's read status from localStorage
    clearReadStatusFromLocalStorage(id) {
        const storedReadStatus = JSON.parse(localStorage.getItem('notificationReadStatus') || '{}');
        delete storedReadStatus[id];
        localStorage.setItem('notificationReadStatus', JSON.stringify(storedReadStatus));
    },

    // Optional: Clear all read status (e.g., on logout)
    clearAllReadStatusFromLocalStorage() {
        localStorage.removeItem('notificationReadStatus');
    }
  }
});