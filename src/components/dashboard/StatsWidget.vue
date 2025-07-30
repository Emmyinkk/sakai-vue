<template>
    <div class="col-span-12 xl:col-span-6">
        <div class="relative">
            <div ref="carouselRef" class="flex overflow-x-auto scroll-smooth hide-scrollbar">
                <div v-for="(card, index) in cards" :key="index"
                    class="min-w-full w-full h-full min-h-[140px] rounded-xl px-1"
                    :style="index === 1 ? 'background: radial-gradient(ellipse at top center, #FF6D63 0%, #FF6D63 10%, #B163FF 100%); padding: 0' : ''">
                    <!-- Copy your inner card content here -->
                    <div class="relative h-full min-h-[140px] p-4">
                        <div :class="['inner-tag', index === 1 ? 'second-tag overflow-hidden' : '']">
                            <img :src="card.image" alt="" class="rounded-xl inner-tag_image" />
                            <!-- Clock image only on the second card -->
                            <img v-if="index === 1" src="/demo/images/clock.png" alt="Clock"
                                class="rounded-xl absolute z-30 bottom-0 left-1/2 w-[250px] h-auto transform -translate-x-1/2" />
                        </div>
                        <div class="absolute z-50 bottom-5">
                            <div class="flex flex-col">
                                <p class="text-white mb-0 font-medium">
                                    <span class="font-bold text-xl">{{ card.value }}</span> {{ card.suffix }}
                                </p>
                                <p class="text-white font-medium">{{ card.label }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Arrows -->
            <div class="absolute right-5 bottom-5 z-50 flex gap-1 items-center">
                <div class="w-[32px] h-[32px] rounded-full flex items-center justify-center bg-[#000000BF] cursor-pointer"
                    @click="scrollLeft">
                    <i class="pi pi-angle-left" :class="canScrollLeft ? 'text-white' : 'text-gray-400'"></i>
                </div>
                <div class="w-[32px] h-[32px] rounded-full flex items-center justify-center bg-[#000000] cursor-pointer"
                    @click="scrollRight">
                    <i class="pi pi-angle-right" :class="canScrollRight ? 'text-white' : 'text-gray-400'"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="col-span-12 xl:col-span-6">
        <div class="flex justify-between items-center w-full gap-8 flex-wrap md:flex-nowrap">
            <div v-for="(stat, index) in stats" :key="index" class="mb-0 w-full md:w-[50%]">
                <div class="mb-0 w-full relative  h-full rounded-lg p-7 min-h-[140px]"
                :class="index === 0 ? 'bg-[#F22A2A]' : 'bg-[#561EAA]'">
                    <div class="absolute inner-part">
                        <img :src="stat.image" alt="" class="rounded-lg">
                    </div>
                    <div class="flex justify-between mb-4 relative z-50">
                        <div>
                            <div class="text-white dark:text-surface-0 font-semibold text-xl">₦{{ stat.amount.toLocaleString() }}</div>
                            <div class="max-w-[70px] mt-2">
                                <p class="font-normal text-base text-white">{{ stat.nameTag }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="mb-0 w-full relative bg-[#F22A2A] h-full rounded-lg p-7 min-h-[140px]">
                <div class="absolute inner-part">
                    <img src="/demo/images/save.png" alt="">
                </div>
                <div class="flex justify-between mb-4 relative z-50">
                    <div>
                        <div class="text-white dark:text-surface-0 font-semibold text-xl">₦22,800.50</div>
                        <div class="max-w-[70px] mt-2">
                            <p class="font-normal text-base text-white">Total Income</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mb-0 w-full relative bg-[#561EAA] h-full rounded-lg p-7 min-h-[140px]">
                <div class="absolute inner-part">
                    <img src="/demo/images/withdraw.png" alt="">
                </div>
                <div class="flex justify-between mb-4 relative z-50">
                    <div>
                        <div class="text-white dark:text-surface-0 font-semibold text-xl">₦22,800.50</div>
                        <div class="max-w-[70px] mt-2">
                            <p class="font-normal text-base text-white">Total Withdrawn</p>
                        </div>
                    </div>
                </div>
                
            </div> -->
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useApi } from '@/composables/useApi';
import { fetchCarouselCombined } from '@/api/fetchCarouselStat';

// Fetch card data
const { data, loading, error, fetchData } = useApi(fetchCarouselCombined);

const cards = computed(() => data.value?.stats || []);
const stats = computed(() => data.value?.amount || {});


const carouselRef = ref(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(true);

const checkScroll = () => {
    const el = carouselRef.value;
    canScrollLeft.value = el.scrollLeft > 0;
    canScrollRight.value = el.scrollLeft + el.offsetWidth < el.scrollWidth;
};

const scrollLeft = () => {
    const el = carouselRef.value;
    el.scrollBy({ left: -el.offsetWidth, behavior: 'smooth' });
    setTimeout(checkScroll, 300);
};

const scrollRight = () => {
    const el = carouselRef.value;
    el.scrollBy({ left: el.offsetWidth, behavior: 'smooth' });
    setTimeout(checkScroll, 300);
};

onMounted(() => {
    checkScroll();
});
</script>


<style scoped>
.inner-tag,
.inner-part {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.inner-tag:after {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgb(0, 0, 0, .5);
    border-radius: .6rem;
    margin: 0 auto;
}

.inner-tag.second-tag:after {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgb(0, 0, 0, .3);
    border-radius: .6rem;
    z-index: 50;
}

.inner-tag .inner-tag_image, .inner-part img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.hide-scrollbar::-webkit-scrollbar {
    display: none;
}

.hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
