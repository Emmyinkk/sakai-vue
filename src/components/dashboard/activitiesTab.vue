<template>
    <div class="card shadow-lg w-full md:w-[50%] h-[330px]">
        <div class="flex justify-between items-center rounded-xl w-full mb-4">
            <h2 class="text-lg font-semibold">Activities</h2>
            <router-link to="/activities">
                <button class="py-2 px-3 rounded-2xl bg-[#C5F0D3] text-[#27B264] text-sm cursor-pointer">View All</button>
            </router-link>
        </div>
        <div>
            <div v-if="loading">Loading activities...</div>
            <div v-else-if="error">Error loading activities.</div>
            <div v-else class="flex gap-5 flex-col">
                <div v-for="(activity, index) in topFiveActivities" :key="index" class="flex gap-3">
                    <img :src="activity.image" alt=""
                        class="w-[25.88px] h-[25.88px] rounded-full flex flex-col justify-center items-center object-cover">
                    <div class="flex flex-col">
                        <p class="mb-0 font-semibold text-base truncate w-[300px] md:w-[290px] lg:w-[150px]">{{ activity.activity }}</p>
                        <p class="mb-0 text-gray-500 text-xs text-ellipsis">{{ activity.time }}</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useApi } from '@/composables/useApi';
import { fetchActivities } from '@/api/fetchActivities'

const { data: activities, loading, error } = useApi(fetchActivities);

const topFiveActivities = computed(() => {
  return activities.value?.slice(0, 5) || [];
});

</script>

<style scoped>
.card {
    padding: 1rem;
    margin-bottom: 0;
}

.truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>