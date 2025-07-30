<template>
    <div class="bg-white dark:bg-[#27272a] rounded-lg py-5">
        <div class="p-2">
            <Button label="Back" severity="secondary" variant="text" @click="router.push({ name: 'all-users' })"
                class="text-green-500" />

            <div class="mt-5">
                <div v-if="loading" class="text-center p-4">Loading talent details...</div>
                <div v-else-if="error" class="text-red-500 p-4">Error loading talent details: {{ error.message }}</div>
                <div v-else-if="activeTalent">
                    <div class="p-2 relative">
                        <div class="w-full rounded-t-xl h-[100px] md:h-[170px] bg-cover bg-no-repeat bg-center absolute left-0"
                            style="background-position: 50% 20%">
                            <img :src="activeTalent.bannerImage || defaultBanner" @error="onBannerError" alt=""
                                class="w-full h-full absolute object-cover rounded-t-xl"
                                style="object-position: 50% 20%">
                            <div class="w-full h-full bg-[#2e6fe83e] rounded-t-xl z-50"></div>
                        </div>
                    </div>

                    <div class="flex gap-3 md:gap-5 items-center relative z-60 pt-[5rem] md:pt-[8rem] px-5">
                        <div
                            class="rounded-full border-4 border-green-500 w-[100px] h-[100px] overflow-hidden md:w-[150px] md:h-[150px] lg:w-[192px] lg:h-[192px]">
                            <img :src="activeTalent.image || defaultImage" @error="onImageError" alt=""
                                class="rounded-full object-cover bg-center w-full h-full">
                        </div>
                        <div class="mt-5 md:mt-12 lg:mt-4">
                            <div class="flex justify-between gap-5 flex-col md:flex-row">
                                <div class="flex-flex-col gap-0">
                                    <p class="text-xl md:text-3xl font-bold mb-0">{{ activeTalent.clientName }}</p>
                                    <div class="flex flex-col">
                                        <div class="flex gap-2 items-start flex-col md:items-center md:flex-row">
                                            <p class="text-base font-semibold mb-0">{{ activeTalent.career }}
                                            </p>
                                            <div class="hidden md:flex items-center gap-2">
                                                <div class="flex items-center p-2 rounded-xl bg-gray-200 h-[22px]">
                                                    <i class="ri-user-5-fill text-gray-500"></i>
                                                    <p>{{ activeTalent.followers }}</p>
                                                </div>
                                                <div
                                                    class="flex gap-1 items-center p-2 rounded-xl bg-gray-200 h-[22px]">
                                                    <i class="pi pi-star-fill text-yellow-500 text-xs"></i>
                                                    <p class="text-sm md:text-base">{{ activeTalent.rating }}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            class="hidden md:block text-center p-2 rounded-lg bg-green-500 max-w-[100px] mt-2">
                                            <p class="text-sm text-white">{{ activeTalent.position }}</p>
                                        </div>

                                    </div>
                                </div>
                                <div class="flex gap-4 items-center">
                                    .flex
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="px-5 py-5">
                        <div class="flex flex-col gap-3">
                            <div class="flex md:hidden items-center gap-2">
                                <div class="flex items-center p-2 rounded-xl bg-gray-200 h-[22px]">
                                    <i class="ri-user-5-fill text-gray-500"></i>
                                    <p>{{ activeTalent.followers }}</p>
                                </div>
                                <div class="flex gap-1 items-center p-2 rounded-xl bg-gray-200 h-[22px]">
                                    <i class="pi pi-star-fill text-yellow-500 text-xs"></i>
                                    <p class="text-sm md:text-base">{{ activeTalent.rating }}</p>
                                </div>
                            </div>
                            <div class="md:hidden text-center p-2 rounded-lg bg-green-500 max-w-[100px] mt-2">
                                <p class="text-sm text-white">{{ activeTalent.position }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- <div class="px-10 mt-10">
                        <p class="text-base font-bold mb-2">Bio</p>
                        <p class="text-base">{{ activeUser.bio }}</p>
                    </div> -->
                    <div class="mt-5 md:mt-10 px-10">
                        <div class="flex flex-col gap-2">
                            <div class="flex justify-between flex-col md:flex-row gap-2 md:gap-0">
                                <div class="grid grid-cols-2 w-full md:w-1/2 items-center">
                                    <div class="flex gap-1 items-center">
                                        <i class="ri-checkbox-circle-fill text-green-500"></i>
                                        <p class="text-base">Phone Number</p>
                                    </div>
                                    <p class="font-bold">{{ activeTalent.phone }}</p>
                                </div>
                                <div class="grid grid-cols-2 w-full md:w-1/2 items-center">
                                    <div class="flex gap-1 items-center">
                                        <i class="ri-checkbox-circle-fill text-green-500"></i>
                                        <p class="text-base">Email</p>
                                    </div>
                                    <p class="font-bold">{{ activeTalent.email }}</p>
                                </div>
                            </div>
                            <div class="flex justify-between flex-col md:flex-row gap-2 md:gap-0">
                                <div class="grid grid-cols-2 w-full md:w-1/2 items-center">
                                    <div class="flex gap-1 items-center">
                                        <i class="ri-checkbox-circle-fill text-green-500"></i>
                                        <p class="text-base">Wallet Balance</p>
                                    </div>
                                    <p class="font-bold">{{ activeTalent.walletBalance }}</p>
                                </div>
                                <div class="grid grid-cols-2 w-full md:w-1/2 items-center">
                                    <div class="flex gap-1 items-center">
                                        <i class="ri-checkbox-circle-fill text-green-500"></i>
                                        <p class="text-base">Active Gigs</p>
                                    </div>
                                    <p class="font-bold">{{ activeTalent.activeGig }}</p>
                                </div>
                            </div>
                            <div class="flex justify-between flex-col md:flex-row gap-2 md:gap-0">
                                <div class="grid grid-cols-2 w-full md:w-1/2 items-center">
                                    <div class="flex gap-1 items-center">
                                        <i class="ri-checkbox-circle-fill text-green-500"></i>
                                        <p class="text-base">Location</p>
                                    </div>
                                    <p class="font-bold">{{ activeTalent.location }}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div v-else>
                    No detail is available for this user.
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import useApi from '@/composables/crudUseApi';
import { activeTalents } from '@/service/activeTalent';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const defaultImage = '/demo/images/avt/default-avatar.jpeg';
const defaultBanner = '/demo/images/bg/bg-002.png';
const activeTalent = ref(null);
const loading = ref(false);
const error = ref(null);

function onImageError(event) {
    event.target.src = defaultImage;
};

function onBannerError(event) {
    event.target.src = defaultBanner;
};

const loadActiveTalents = async (id) => {
    loading.value = true;
    error.value = null;

    // Create a fake API service with a .get method
    const singleFetchService = {
        get: () => activeTalents.getActiveTalents()
    };

    // Use the existing composable but only for this call
    const {
        data,
        loading: apiLoading,
        error: apiError,
        fetchData
    } = useApi(singleFetchService);

    await fetchData();

    const talents = data.value;
    activeTalent.value = talents.find(talents => talents.id === id);
    loading.value = apiLoading.value;
    error.value = apiError.value;
};

onMounted(() => {
    loadActiveTalents(props.id);
});


</script>