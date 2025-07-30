<template>
    <div class="bg-white dark:bg-[#27272a] rounded-lg p-5">
        <div class="flex flex-wrap gap-2 items-center justify-between mb-5">
            <div class="flex gap-3 items-center h-full">
                <div class="w-5 bg-green-500 rounded-md min-h-[25px] h-full"></div>
                <h1 class="text-xl m-0">Active Users</h1>
            </div>
            <!-- <div class="flex gap-2 items-center w-full md:w-auto flex-wrap">
                <IconField>
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText v-model="filters['global'].value" placeholder="Search..." />
                </IconField>
                <Button label="Filter" icon="pi pi-filter" variant="text" aria-label="Filter"
                    @click="toggleDataTable" />
            </div> -->
        </div>
        <Tabs value="0">
            <TabList>
                <div>
                    <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value"
                        class="font-bold whitespace-nowrap text-lg">{{ tab.title }}</Tab>
                </div>
            </TabList>
            <TabPanels>
                <TabPanel value="0">
                    <DataTable v-model:selection="selectedUsers" :value="users" paginator :rows="10"
                        :rowsPerPageOptions="[10, 20, 50]" dataKey="id" tableStyle="min-width: 70rem">
                        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                        <Column field="clientName" header="Client Name" sortable style="min-width: 12rem">
                            <template #body="slotProps">
                                <div class="flex gap-2 items-center">
                                    <img :src="slotProps.data.image || defaultImage" @error="onImageError" alt=""
                                        class="w-[40px] h-[40px] rounded-full object-cover">
                                    {{ slotProps.data.clientName }}
                                </div>
                            </template>
                        </Column>
                        <Column field="businessName" header="Business Name" sortable style="min-width: 12rem"></Column>
                        <Column field="phone" header="Phone" sortable style="width: 25%"></Column>
                        <Column field="email" header="Email" sortable style="width: 25%"></Column>
                        <Column field="walletBalance" header="Wallet" sortable style="width: 25%">
                            <template #body="slotProps">
                                {{ formatCurrency(slotProps.data.walletBalance) }}
                            </template>
                        </Column>
                        <Column field="location" header="Location" sortable style="width: 25%"></Column>
                        <Column field="activeGig" header="Active Gigs" style="min-width: 8rem"></Column>
                        <Column field="action" header="Action" :exportable="false" style="min-width: 2rem">
                            <template #body="slotProps">
                                <Button icon="pi pi-ellipsis-v" text rounded
                                    @click="toggleActionMenu($event, slotProps.data)" aria-haspopup="true"
                                    aria-controls="overlay_menu" />
                                <Menu ref="menu" :model="actionMenuItems" :popup="true" />
                            </template>
                        </Column>
                    </DataTable>
                </TabPanel>
                <TabPanel value="1">
                    <DataTable v-model:selection="selectedTalents" :value="talents" paginator :rows="10"
                        :rowsPerPageOptions="[10, 20, 50]" dataKey="id" tableStyle="min-width: 70rem">
                        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                        <Column field="clientName" header="Client Name" sortable style="min-width: 12rem">
                            <template #body="slotProps">
                                <div class="flex gap-2 items-center">
                                    <img :src="slotProps.data.image || defaultImage" @error="onImageError" alt=""
                                        class="w-[40px] h-[40px] rounded-full object-cover">
                                    {{ slotProps.data.clientName }}
                                </div>
                            </template>
                        </Column>
                        <!-- <Column field="businessName" header="Business Name" sortable style="min-width: 12rem"></Column> -->
                        <Column field="phone" header="Phone" sortable style="width: 25%"></Column>
                        <Column field="email" header="Email" sortable style="width: 25%"></Column>
                        <Column field="walletBalance" header="Wallet" sortable style="width: 25%">
                            <template #body="slotProps">
                                {{ formatCurrency(slotProps.data.walletBalance) }}
                            </template>
                        </Column>
                        <Column field="location" header="Location" sortable style="width: 25%"></Column>
                        <Column field="activeGig" header="Active Gigs" style="min-width: 8rem"></Column>
                        <Column field="action" header="Action" :exportable="false" style="min-width: 2rem">
                            <template #body="slotProps">
                                <Button icon="pi pi-ellipsis-v" text rounded
                                    @click="toggleActionMenuTwo($event, slotProps.data)" aria-haspopup="true"
                                    aria-controls="overlay_menu" />
                                <Menu ref="menuTalent" :model="talentActionMenuItems" :popup="true" />
                            </template>
                        </Column>
                    </DataTable>
                </TabPanel>
            </TabPanels>
        </Tabs>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { activeUsers } from '@/service/activeUser';
import { activeTalents } from '@/service/activeTalent';
import Menu from 'primevue/menu';
import { useRouter } from 'vue-router';

onMounted(() => {
    activeUsers.getActiveUsers().then((data) => (users.value = data));
    activeTalents.getActiveTalents().then((data) => (talents.value = data));
});

const tabs = ref([
    { title: 'Client', value: '0' },
    { title: 'Talent', value: '1' },
]);

const defaultImage = '/demo/images/avt/default-avatar.jpeg'
const users = ref();
const talents = ref();
const selectedUsers = ref();
const selectedTalents = ref();
const metaKey = ref(true);


function onImageError(event) {
    event.target.src = defaultImage;
};

const formatCurrency = (value) => {
    if (value) return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return;
};

const menu = ref();
const menuTalent = ref();
const currentActiveUserForActions = ref(null);
const currentActiveTalentForActions = ref(null);
const router = useRouter();

const toggleActionMenu = (event, activeUserData) => {
    currentActiveUserForActions.value = activeUserData;
    menu.value.toggle(event);
};

const toggleActionMenuTwo = (event, activeTalentData) => {
    currentActiveTalentForActions.value = activeTalentData;
    menuTalent.value.toggle(event);
};

const actionMenuItems = ref([
    {
        label: 'View', icon: 'pi pi-eye',
        command: () => {
            router.push({ name: 'user-details', params: { id: currentActiveUserForActions.value.id } });
        }
    },
]);

const talentActionMenuItems = ref([
    {
        label: 'View', icon: 'pi pi-eye',
        command: () => {
            router.push({ name: 'talent-details', params: { id: currentActiveTalentForActions.value.id } });
        }
    },
]);

</script>