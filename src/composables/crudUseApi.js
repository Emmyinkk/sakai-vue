// src/composables/useApi.js
import { ref } from 'vue';

// This composable takes an 'apiService' object as an argument.
// The apiService should ideally have methods corresponding to CRUD operations:
// .get(...args) for fetching data (e.g., get all, get by ID with filters)
// .post(payload) for creating data
// .put(id, payload) for updating data
// .delete(id) for deleting single data
// .deleteMultiple(ids) for deleting multiple data
export default function useApi(apiService) {
    const data = ref(null);
    const loading = ref(false);
    const error = ref(null);

    // Fetch data (GET) - can accept arguments like filters, IDs
    const fetchData = async (...args) => {
        loading.value = true;
        error.value = null;
        try {
            // Call the 'get' method of the provided apiService
            const result = await apiService.get(...args);
            // Assuming your service's get method returns the data directly
            // If it returns an object like { data: [...] }, adjust this line:
            data.value = result; // .data || result; // Keep .data if your real API wraps response
        } catch (err) {
            error.value = err;
            console.error('Error fetching data:', err);
        } finally {
            loading.value = false;
        }
    };

    // Create data (POST)
    const createData = async (payload) => {
        loading.value = true;
        error.value = null;
        try {
            // Call the 'post' method of the provided apiService
            const result = await apiService.post(payload);
            return result; // Return the created item, often with an ID from backend
        } catch (err) {
            error.value = err;
            console.error('Error creating data:', err);
            throw err; // Re-throw to allow component to handle specific error UI
        } finally {
            loading.value = false;
        }
    };

    // Update data (PUT)
    const updateData = async (id, payload) => {
        loading.value = true;
        error.value = null;
        try {
            // Call the 'put' method of the provided apiService
            const result = await apiService.put(id, payload);
            return result; // Return the updated item
        } catch (err) {
            error.value = err;
            console.error('Error updating data:', err);
            throw err;
        } finally {
            loading.value = false;
        }
    };

    // Delete single data (DELETE)
    const deleteData = async (id) => {
        loading.value = true;
        error.value = null;
        try {
            // Call the 'delete' method of the provided apiService
            await apiService.delete(id);
        } catch (err) {
            error.value = err;
            console.error('Error deleting data:', err);
            throw err;
        } finally {
            loading.value = false;
        }
    };

    // Delete multiple data (DELETE - typically a POST with IDs)
    const deleteMultipleData = async (ids) => {
        loading.value = true;
        error.value = null;
        try {
            // Call the 'deleteMultiple' method if your service supports it
            await apiService.deleteMultiple(ids);
        } catch (err) {
            error.value = err;
            console.error('Error deleting multiple data:', err);
            throw err;
        } finally {
            loading.value = false;
        }
    };

    // Note: 'immediate' option is removed from the composable itself.
    // Instead, you'll call fetchData() explicitly in onMounted.
    // This gives you more control over when the initial fetch happens,
    // especially useful when you have filters.

    return {
        data,
        loading,
        error,
        fetchData, // Renamed from fetchData in your original to be explicit for GET
        createData, // For POST
        updateData, // For PUT
        deleteData, // For single DELETE
        deleteMultipleData // For bulk DELETE
    };
}