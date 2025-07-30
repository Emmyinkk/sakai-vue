// src/composables/useApi.js
import { ref } from 'vue';

export function useApi(apiFn, { immediate = true } = {}) {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const fetchData = async (...args) => {
    loading.value = true;
    error.value = null;

    try {
      const result = await apiFn(...args);
      data.value = result?.data || result;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  if (immediate) fetchData();

  return {
    data,
    loading,
    error,
    fetchData,
  };
}

// src/service/useApi.js
// import { ref } from 'vue';
// import axios from 'axios';

// export default function useApi(url) {
//     const data = ref(null);
//     const loading = ref(false);
//     const error = ref(null);

//     const fetchData = async (params = {}) => {
//         loading.value = true;
//         error.value = null;
//         try {
//             const response = await axios.get(url, { params });
//             data.value = response.data;
//         } catch (err) {
//             error.value = err;
//             console.error('Error fetching data:', err);
//         } finally {
//             loading.value = false;
//         }
//     };

//     // You might want to add functions for POST, PUT, DELETE here as well
//     const postData = async (payload) => {
//         loading.value = true;
//         error.value = null;
//         try {
//             const response = await axios.post(url, payload);
//             return response.data;
//         } catch (err) {
//             error.value = err;
//             console.error('Error posting data:', err);
//             throw err; // Re-throw to allow component to handle
//         } finally {
//             loading.value = false;
//         }
//     };

//     const putData = async (id, payload) => {
//         loading.value = true;
//         error.value = null;
//         try {
//             const response = await axios.put(`${url}/${id}`, payload);
//             return response.data;
//         } catch (err) {
//             error.value = err;
//             console.error('Error updating data:', err);
//             throw err;
//         } finally {
//             loading.value = false;
//         }
//     };

//     const deleteData = async (id) => {
//         loading.value = true;
//         error.value = null;
//         try {
//             await axios.delete(`${url}/${id}`);
//         } catch (err) {
//             error.value = err;
//             console.error('Error deleting data:', err);
//             throw err;
//         } finally {
//             loading.value = false;
//         }
//     };

//     return { data, loading, error, fetchData, postData, putData, deleteData };
// }
