<script setup>
import { onMounted, watch, ref } from 'vue';
import useApi from '@/composables/crudUseApi'; // Ensure this path is correct
import { GigService } from '@/api/fetchGigPost'; // Ensure this path is correct
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const gigPost = ref(null);
const loading = ref(false);
const error = ref(null);

const loadGigDetails = async (gigId) => {
    loading.value = true;
    error.value = null;

    // Create a fake API service with a .get method
    const singleFetchService = {
        get: () => GigService.getGigById(gigId) // This should return a Promise
    };

    // Use the existing composable but only for this call
    const {
        data,
        loading: apiLoading,
        error: apiError,
        fetchData
    } = useApi(singleFetchService);

    await fetchData();

    // Copy values into this component's refs
    gigPost.value = data.value;
    loading.value = apiLoading.value;
    error.value = apiError.value;
};

onMounted(() => {
    // Call loadGigDetails when the component mounts
    loadGigDetails(props.id);
});

// Watch for changes in the 'id' prop (e.g., if navigating from /gigs/1000 to /gigs/1001)
watch(() => props.id, (newId) => {
    if (newId) {
        loadGigDetails(newId);
    }
}, { immediate: true }); // `immediate: true` runs the watcher immediately on mount as well

</script>

<template>
    <div>
        <Button label="Back to Gigs" severity="secondary" variant="text" @click="router.push({ name: 'gig-posts' })"
            class="text-green-500" />
        <div class="flex gap-3 items-center h-full mb-5 mt-5">
            <div class="w-5 bg-green-500 rounded-md min-h-[25px] h-full"></div>
            <h1 class="text-2xl m-0">Gig Details</h1>
        </div>
        <div class="card p-5">
            <div v-if="loading" class="text-center p-4">Loading gig details...</div>
            <div v-else-if="error" class="text-red-500 p-4">Error loading gig: {{ error.message }}</div>
            <div v-else-if="gigPost">
                <div class="flex gap-2 flex-col mb-4">
                    <div class="text-4xl font-bold text-black dark:text-white">{{ gigPost.title }}</div>
                    <div class="text-gray-500 flex gap-2">
                        <p><i class="pi pi-star-fill text-yellow-500"></i> {{ gigPost.rating }} ({{ gigPost.commentNumber }} Reviews) </p>
                        <p>{{ gigPost.projectDone }} projects done</p>
                    </div>
                </div>

                <p class="font-bold mb-2">Job Description</p>
                <p>{{ gigPost.description }}</p>

                <div class="flex flex-col gap-2">
                    <div class="grid grid-cols-2 w-full md:w-1/2 items-center">
                        <div class="flex gap-1 items-center">
                            <i class="ri-checkbox-circle-fill text-green-500"></i>
                            <p class="text-base">Budget</p>
                        </div>
                        <p>{{ gigPost.budget ? gigPost.budget.toLocaleString() : 'N/A' }}</p>
                    </div>
                    <div class="grid grid-cols-2 w-full md:w-1/2 items-center">
                        <div class="flex gap-1 items-center">
                            <i class="ri-checkbox-circle-fill text-green-500"></i>
                            <p class="text-base">Experience</p>
                        </div>
                        <p>{{ gigPost.experience.replace(/_/g, ' ') }}</p>
                    </div>
                    <div class="grid grid-cols-2 w-full md:w-1/2 items-center">
                        <div class="flex gap-1 items-center">
                            <i class="ri-checkbox-circle-fill text-green-500"></i>
                            <p class="text-base">Location</p>
                        </div>
                        <p>{{ gigPost.location }}</p>
                    </div>
                </div>

                <!-- <p><strong>Client Name:</strong> {{ gigPost.clientName }}</p>
                <p><strong>Location:</strong> {{ gigPost.location }}</p>
                <p><strong>Description:</strong> </p>
                <p><strong>Budget:</strong> ${{ gigPost.budget ? gigPost.budget.toFixed(2) : 'N/A' }}</p>
                <p><strong>Category:</strong> {{ gigPost.category }}</p>
                <p><strong>Job Type:</strong> {{ gigPost.jobType.replace(/_/g, ' ') }}</p>
                <p><strong>Experience:</strong> {{ gigPost.experience.replace(/_/g, ' ') }}</p>
                <p><strong>Client History:</strong> {{ gigPost.clientHistory.replace(/_/g, ' ') }}</p>
                <p><strong>Proposals:</strong> {{ gigPost.numProposals }}</p>
                <p><strong>Status:</strong> {{ gigPost.inventoryStatus }}</p>
                <p><strong>Rating:</strong> {{ gigPost.rating }}</p> -->
            </div>
            <div v-else class="text-center p-4">
                No gig post found for this ID.
            </div>
        </div>
    </div>
</template>