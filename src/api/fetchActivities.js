
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

export const fetchActivities = () =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: [
                    {
                        id: 1,
                        image: '/demo/images/image1.png',
                        activity: 'Changed the style.',
                        date: '2025-07-27T18:13:41+01:00',
                        user: 'Admin',
                        country: 'Nigeria',
                        isExpanded: false,
                        isRead: false
                    },
                    {
                        id: 2,
                        user: 'Client',
                        image: '/demo/images/image2.png',
                        activity: 'Released a new version.',
                        date: '2025-07-29T08:00:00.000Z',
                        country: 'Nigeria',
                        isExpanded: false,
                        isRead: false
                    },
                    {
                        id: 3,
                        user: 'Talent',
                        image: '/demo/images/image1.png',
                        activity: 'Submitted a bug.',
                        date: '2025-07-30T08:00:00.000Z',
                        country: 'Nigeria',
                        isExpanded: false,
                        isRead: false
                    },
                    {
                        id: 4,
                        user: 'Admin',
                        image: '/demo/images/image2.png',
                        activity: 'Modified A data in Page in the description letter.',
                        date: '2025-07-26T08:00:00.000Z',
                        country: 'Nigeria',
                        isExpanded: false,
                        isRead: false
                    },
                    {
                        id: 5,
                        user: 'Clent',
                        image: '/demo/images/image1.png',
                        activity: 'Deleted a page in Project located at the dept area.',
                        date: '2025-07-25T08:00:00.000Z',
                        country: 'Nigeria',
                        isExpanded: false,
                        isRead: false
                    },
                    {
                        id: 6,
                        user: 'Talent',
                        image: '/demo/images/image1.png',
                        activity: 'Deleted a page in Project located at the dept area. ajdkf ladf idnf ad la dfioandlf dlfnaldkf lsdnfoieonfs lnakdf s nsdfjosdf sldfhi ksldfn sl  osfosof sonfoef',
                        date: '2025-07-24T08:00:00.000Z',
                        country: 'Nigeria',
                        isExpanded: false,
                        isRead: false
                    },
                    {
                        id: 7,
                        user: 'Admin',
                        image: '/demo/images/image1.png',
                        activity: 'Deleted a page in Project located at the dept area.',
                        date: '2025-07-23T08:00:00.000Z',
                        country: 'Nigeria',
                        isExpanded: false,
                        isRead: false
                    },
                    {
                        id: 8,
                        user: 'Admin',
                        image: '/demo/images/image1.png',
                        activity: 'Deleted a page in Project located at the dept area.',
                        date: '2025-07-23T08:00:00.000Z',
                        country: 'Nigeria',
                        isExpanded: false,
                        isRead: false
                    },
                    {
                        id: 9,
                        user: 'Admin',
                        image: '/demo/images/image1.png',
                        activity: 'Deleted a page in Project located at the dept area.',
                        date: '2025-07-23T08:00:00.000Z',
                        country: 'Nigeria',
                        isExpanded: false,
                        isRead: false
                    },
                    {
                        id: 10,
                        user: 'Admin',
                        image: '/demo/images/image1.png',
                        activity: 'Deleted a page in Project located at the dept area.',
                        date: '2025-07-23T08:00:00.000Z',
                        country: 'Nigeria',
                        isExpanded: false,
                        isRead: false
                    },
                    {
                        id: 11,
                        user: 'Admin',
                        image: '/demo/images/image1.png',
                        activity: 'Deleted a page in Project located at the dept area.',
                        date: '2025-07-23T08:00:00.000Z',
                        country: 'Nigeria',
                        isExpanded: false,
                        isRead: false
                    },
                ]
            });
        }, 1000);
    });

    export const markActivityAsRead = async (activityId) => {
        try {
            // This is the actual API call example
            const response = await api.post(`/activities/${activityId}/mark-read`);
            // Or if your API expects a PUT request with a body:
            // const response = await api.put(`/activitys/${activityId}`, { isRead: true });
            console.log(`activity ${activityId} marked as read on server.`, response.data);
            return response.data; // Return any data the server sends back (e.g., success message)
        } catch (error) {
            console.error(`Error marking activity ${activityId} as read:`, error);
            throw error; // Re-throw to handle in the component if needed
        }
    };