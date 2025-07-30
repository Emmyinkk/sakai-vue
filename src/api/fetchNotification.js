//src/api/notificationService.js (or just add to fetchNotification.js if you prefer a single file)

import axios from 'axios'; // Assuming you're using axios or a similar HTTP client

// Create an axios instance or use your global one if you have it set up
// This is just an example. Your actual API base URL might be different.
const api = axios.create({
    baseURL: 'https://your-api.com/api', // REPLACE WITH YOUR ACTUAL API BASE URL
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${yourAuthToken}` // If you have authentication
    }
});

export const fetchNotifications = async () => {
    // Simulate API call with dummy data for now
    // In a real scenario, this would be: return await api.get('/notifications');
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: [
                    {
                        id: 1, // Add an ID for tracking
                        notification: 'Welcome! Your account has been created.',
                        date: '2025-07-22T08:00:00.000Z', // Today (WAT time is UTC+1, so use Z for UTC)
                        isRead: false // Default to unread
                    },
                    {
                        id: 2,
                        notification: 'New gig posted: Urgent UI/UX Designer needed!',
                        date: '2025-07-21T16:30:00.000Z', // Yesterday
                        isRead: false
                    },
                    {
                        id: 3,
                        notification: 'Your payment for "Project Alpha" has been processed.',
                        date: '2025-07-20T10:00:00.000Z', // 2 days ago
                        isRead: false
                    },
                    {
                        id: 4,
                        notification: 'Client "Jane Doe" sent you a message. Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quaerat quam, deleniti doloribus at dolorum laboriosam fugiat? Harum voluptates voluptatibus perferendis praesentium blanditiis minima tempore esse, illum, rem dignissimos est.Consectetur tenetur quis consequuntur, reiciendis perferendis quidem numquam molestiae odit vero totam quisquam vitae, dolorum nemo! Alias exercitationem deserunt ullam necessitatibus officia rem optio praesentium quae, nobis ad excepturi possimus.Quisquam non quam eveniet aspernatur harum, nesciunt repudiandae doloribus dolorem modi dolorum natus ab corporis eius, distinctio sequi? Et quae eum animi amet quo ipsa quisquam libero deserunt sint voluptate.',
                        date: '2025-07-15T11:00:00.000Z', // A week ago (or more)
                        isRead: false
                    },
                    {
                        id: 5,
                        notification: 'Your profile reached 100 views this week!',
                        date: '2025-06-25T09:00:00.000Z', // Last month
                        isRead: false
                    },
                    {
                        id: 6,
                        notification: 'Your profile reached 100 views this week!',
                        date: '2025-06-25T09:00:00.000Z', // Last month
                        isRead: false
                    },
                    {
                        id: 7,
                        notification: 'Your profile reached 100 views this week!',
                        date: '2025-06-25T09:00:00.000Z', // Last month
                        isRead: false
                    },
                    {
                        id: 8,
                        notification: 'Your profile reached 100 views this week!',
                        date: '2025-06-25T09:00:00.000Z', // Last month
                        isRead: false
                    },
                    {
                        id: 9,
                        notification: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quaerat quam, deleniti doloribus at dolorum laboriosam fugiat? Harum voluptates voluptatibus perferendis praesentium blanditiis minima tempore esse, illum, rem dignissimos est.Consectetur tenetur quis consequuntur, reiciendis perferendis quidem numquam molestiae odit vero totam quisquam vitae, dolorum nemo! Alias exercitationem deserunt ullam necessitatibus officia rem optio praesentium quae, nobis ad excepturi possimus.Quisquam non quam eveniet aspernatur harum, nesciunt repudiandae doloribus dolorem modi dolorum natus ab corporis eius, distinctio sequi? Et quae eum animi amet quo ipsa quisquam libero deserunt sint voluptate.',
                        date: '2025-06-25T09:00:00.000Z', // Last month
                        isRead: false
                    },
                    {
                        id: 10,
                        notification: 'Your profile reached 100 views this week! And that is just the start',
                        date: '2025-06-25T09:00:00.000Z', // Last month
                        isRead: false
                    },
                ]
            });
        }, 500);
    });
};

export const markNotificationAsRead = async (notificationId) => {
    try {
        // This is the actual API call example
        const response = await api.post(`/notifications/${notificationId}/mark-read`);
        // Or if your API expects a PUT request with a body:
        // const response = await api.put(`/notifications/${notificationId}`, { isRead: true });
        console.log(`Notification ${notificationId} marked as read on server.`, response.data);
        return response.data; // Return any data the server sends back (e.g., success message)
    } catch (error) {
        console.error(`Error marking notification ${notificationId} as read:`, error);
        throw error; // Re-throw to handle in the component if needed
    }
};