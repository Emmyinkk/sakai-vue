// src/stores/activities.js
import { defineStore } from 'pinia';
// You might want to import your API service here if not using useApi directly
import { fetchActivities } from '@/api/fetchActivities'; // Assuming you created this

export const useActivityStore = defineStore('activities', {
  state: () => ({
    allActivities: [], // This will hold all activities, including their read status
    loading: false,
    error: null,
  }),
  getters: {
    // Getters for specific views
    unreadActivities: (state) => state.allActivities.filter(n => !n.isRead),
    readActivities: (state) => state.allActivities.filter(n => n.isRead),
    // Or just a general getter if you filter in the component
    activities: (state) => state.allActivities,
    activityCount: (state) => state.allActivities.filter(n => !n.isRead).length, // For the badge
  },
  actions: {
    async loadActivities() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetchActivities(); // Your API call
        // Initialize isRead status based on localStorage or default to false
        const storedReadStatus = JSON.parse(localStorage.getItem('activityReadStatus') || '{}');

        this.allActivities = response.data.map(n => ({
          ...n,
          isRead: storedReadStatus[n.id] === true, // Check if ID exists and is true in storage
          isExpanded: false,
        }));

      } catch (err) {
        this.error = err;
        console.error('Failed to load activities:', err);
      } finally {
        this.loading = false;
      }
    },

    async markActivity(id, isReadStatus = true) {
      const activity = this.allActivities.find(n => n.id === id);
      if (activity) {
        // Optimistic UI update in the store
        activity.isRead = isReadStatus;

        // Persist to localStorage immediately
        this.saveReadStatusToLocalStorage();

        // try {
        //   // Make API call to update server (if applicable)
        //   await markActivityAsRead(id); // Your API call to server
        // } catch (err) {
        //   console.error(`Failed to mark activity ${id} as ${isReadStatus ? 'read' : 'unread'} on server:`, err);
        //   // Revert if API call fails
        //   activity.isRead = !isReadStatus;
        //   this.saveReadStatusToLocalStorage(); // Revert localStorage too
        //   this.error = err; // Set store error for UI
        //   throw err; // Re-throw for component to catch if needed
        // }
      }
    },

    // Helper to save read status to localStorage
    saveReadStatusToLocalStorage() {
      const readStatus = {};
      this.allActivities.forEach(n => {
        if (n.isRead) {
          readStatus[n.id] = true; // Store only read activities
        }
      });
      console.log(readStatus)
      localStorage.setItem('activityReadStatus', JSON.stringify(readStatus));
    },

    // Optional: Clear a specific activity's read status from localStorage
    clearReadStatusFromLocalStorage(id) {
        const storedReadStatus = JSON.parse(localStorage.getItem('activityReadStatus') || '{}');
        delete storedReadStatus[id];
        localStorage.setItem('activityReadStatus', JSON.stringify(storedReadStatus));
    },

    // Optional: Clear all read status (e.g., on logout)
    clearAllReadStatusFromLocalStorage() {
        localStorage.removeItem('activityReadStatus');
    }
  }
});