<script setup>
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref, watch } from 'vue'; // Import watch

// Import the specific GigService (our dummy backend)
import { GigService } from '@/api/fetchGigPost';

// Import our generic useApi composable
import useApi from '@/composables/crudUseApi';

// PrimeVue components for actions menu
import Menu from 'primevue/menu';
import { useRouter } from 'vue-router';

const op = ref(null);
const toast = useToast();
const dt = ref(); // Ref for DataTable component
const gigPosts = ref([]); // Changed from products to gigPosts
const gigPostDialog = ref(false); // Changed from productDialog
const deleteGigPostDialog = ref(false); // Changed from deleteProductDialog
const deleteGigPostsDialog = ref(false); // Changed from deleteProductsDialog
const gigPost = ref({}); // Changed from product to gigPost (for single selected item)
const selectedGigPosts = ref(); // Changed from selectedProducts
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const submitted = ref(false);
const statuses = ref([
    { label: 'PENDING', value: 'PENDING' },
    { label: 'ACTIVE', value: 'ACTIVE' },
    { label: 'REVIEWED', value: 'REVIEWED' },
    { label: 'COMPLETED', value: 'COMPLETED' },
    { label: 'ARCHIVE', value: 'ARCHIVE' },
    { label: 'INACTIVE', value: 'INACTIVE' }
]);

// --- Filter State ---
const selectedJobType = ref('ALL');
const jobTypeOptions = ref([
    { label: 'All', value: 'ALL' },
    { label: 'Full Time', value: 'FULL_TIME' },
    { label: 'Contract', value: 'CONTRACT' }
]);

const selectedExperience = ref('ALL');
const experienceOptions = ref([
    { label: 'All', value: 'ALL' },
    { label: '1-3 Years', value: '1-3_YEARS' },
    { label: '4-8 Years', value: '4-8_YEARS' },
    { label: '10 Years+', value: '10_YEARS_PLUS' }
]);

const selectedClientHistory = ref('ALL');
const clientHistoryOptions = ref([
    { label: 'All', value: 'ALL' },
    { label: 'No Hires', value: 'NO_HIRE' },
    { label: '1-9 Hires', value: '1-9_HIRES' },
    { label: '10+ Hires', value: '10_PLUS_HIRES' }
]);

const selectedNumProposals = ref('ALL');
const numProposalsOptions = ref([
    { label: 'All', value: 'ALL' },
    { label: 'Less than 5', value: 'LESS_THAN_5' },
    { label: '5-10', value: '5-10' },
    { label: '10-20', value: '10-20' },
    { label: '20+', value: '20_PLUS' }
]);

// --- Use the useApi composable with GigService ---
const {
    data: apiGigPosts,
    loading,
    error,
    fetchData: fetchAllGigPosts, // Function to fetch all gigs
    postData: createGigPost,
    putData: updateGigPost,
    deleteData: deleteSingleGigPost,
    deleteMultipleData: deleteMultipleGigPosts
} = useApi({
    get: GigService.getGigs,
    post: GigService.createGig,
    put: (id, payload) => GigService.updateGig({ ...payload, id }),
    delete: GigService.deleteGig,
    deleteMultiple: GigService.deleteMultipleGigs
});

// Function to apply all active filters and re-fetch data
const applyFilters = async () => {
    const activeFilters = {
        jobType: selectedJobType.value,
        experience: selectedExperience.value,
        clientHistory: selectedClientHistory.value,
        numProposals: selectedNumProposals.value
    };
    await fetchAllGigPosts(activeFilters); // Pass filters to fetchData
};

onMounted(async () => {
    await applyFilters(); // Initial fetch with default filters
});

// Watch for changes from useApi and update local gigPosts
watch(apiGigPosts, (newVal) => {
    if (newVal) {
        gigPosts.value = newVal;
    }
}, { deep: true });

// --- Action Menu Logic ---
const menu = ref();
const currentGigPostForActions = ref(null);
const router = useRouter();

const toggleActionMenu = (event, gigPostData) => {
    currentGigPostForActions.value = gigPostData;

    menu.value.toggle(event);
};

const actionMenuItems = ref([
    {
        label: 'View', icon: 'pi pi-eye',
        command: () => {
            router.push({ name: 'gig-details', params: { id: currentGigPostForActions.value.id } });
        }
    },
    { label: 'Edit', icon: 'pi pi-pencil', command: () => editGigPost(currentGigPostForActions.value) },
    { label: 'Delete', icon: 'pi pi-trash', command: () => confirmDeleteGigPost(currentGigPostForActions.value) },
    { label: 'Archive', icon: 'pi pi-box', command: () => archiveGigPost(currentGigPostForActions.value) },
    { label: 'Mark Inactive', icon: 'pi pi-ban', command: () => markGigPostInactive(currentGigPostForActions.value) }
]);

// --- Utility Functions ---
const formatCurrency = (value) => {
    if (value) return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return;
};

// --- CRUD Operations (now using useApi functions) ---

const openNew = () => {
    gigPost.value = {};
    submitted.value = false;
    gigPostDialog.value = true;
};

const hideDialog = () => {
    gigPostDialog.value = false;
    submitted.value = false;
};

const saveGigPost = async () => {
    submitted.value = true;

    if (gigPost?.value.title?.trim()) {
        const payload = { ...gigPost.value };
        payload.inventoryStatus = payload.inventoryStatus.value ? payload.inventoryStatus.value : payload.inventoryStatus;
        payload.jobType = payload.jobType?.value ? payload.jobType.value : payload.jobType; // Handle jobType from Select
        payload.experience = payload.experience?.value ? payload.experience.value : payload.experience; // Handle experience from Select
        payload.clientHistory = payload.clientHistory?.value ? payload.clientHistory.value : payload.clientHistory; // Handle clientHistory from Select
        payload.numProposals = typeof payload.numProposals === 'string' ? parseInt(payload.numProposals, 10) : payload.numProposals;


        try {
            if (payload.id) {
                await updateGigPost(payload.id, payload);
                toast.add({ severity: 'success', summary: 'Successful', detail: 'Gig Post Updated', life: 3000 });
            } else {
                payload.id = createId(); // Assign a new ID for dummy data
                payload.image = 'product-placeholder.svg';
                payload.budget = payload.budget || 0;
                payload.rating = payload.rating || 0;
                payload.location = payload.location || 'Unknown';
                payload.jobType = payload.jobType || 'FULL_TIME'; // Default for new
                payload.experience = payload.experience || 'ALL'; // Default for new
                payload.clientHistory = payload.clientHistory || 'ALL'; // Default for new
                payload.numProposals = payload.numProposals || 0; // Default for new


                await createGigPost(payload);
                toast.add({ severity: 'success', summary: 'Successful', detail: 'Gig Post Created', life: 3000 });
            }

            gigPostDialog.value = false;
            gigPost.value = {};
            await applyFilters(); // Re-fetch all data with current filters to update the table
        } catch (err) {
            toast.add({ severity: 'error', summary: 'Error', detail: `Operation failed: ${error.value?.message || 'Unknown error'}`, life: 3000 });
        }
    }
};

const editGigPost = (gig) => {
    gigPost.value = { ...gig };
    // Ensure status, jobType, etc. are string values for the Select/RadioButton components
    if (typeof gigPost.value.inventoryStatus === 'object' && gigPost.value.inventoryStatus !== null) {
        gigPost.value.inventoryStatus = gigPost.value.inventoryStatus.value;
    }
    // Similarly, if these fields are stored as objects in gigPost from form, convert to string values for radio buttons
    // However, our dummy data directly stores strings, so this may not be needed unless the form is structured differently.
    // For robust forms, you might want to map options to selected values.
};

const confirmDeleteGigPost = (gig) => {
    gigPost.value = gig;
    deleteGigPostDialog.value = true;
};

const deleteGigPost = async () => {
    try {
        await deleteSingleGigPost(gigPost.value.id);
        deleteGigPostDialog.value = false;
        gigPost.value = {};
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Gig Post Deleted', life: 3000 });
        await applyFilters(); // Re-fetch data
    } catch (err) {
        toast.add({ severity: 'error', summary: 'Error', detail: `Deletion failed: ${error.value?.message || 'Unknown error'}`, life: 3000 });
    }
};

const confirmDeleteSelected = () => {
    deleteGigPostsDialog.value = true;
};

const deleteSelectedGigPosts = async () => {
    try {
        const idsToDelete = selectedGigPosts.value.map(g => g.id);
        await deleteMultipleGigPosts(idsToDelete);
        deleteGigPostsDialog.value = false;
        selectedGigPosts.value = null;
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Selected Gig Posts Deleted', life: 3000 });
        await applyFilters(); // Re-fetch data
    } catch (err) {
        toast.add({ severity: 'error', summary: 'Error', detail: `Bulk deletion failed: ${error.value?.message || 'Unknown error'}`, life: 3000 });
    }
};

// --- Action Menu Implementations ---
const viewGigPostDetails = (gig) => {
    toast.add({ severity: 'info', summary: 'View', detail: `Viewing ${gig.title} (ID: ${gig.id})`, life: 3000 });
};

const archiveGigPost = async (gig) => {
    const updatedGig = { ...gig, inventoryStatus: 'ARCHIVE' };
    try {
        await updateGigPost(updatedGig.id, updatedGig);
        toast.add({ severity: 'info', summary: 'Archived', detail: `${gig.title} has been archived`, life: 3000 });
        await applyFilters();
    } catch (err) {
        toast.add({ severity: 'error', summary: 'Error', detail: `Archiving failed: ${error.value?.message || 'Unknown error'}`, life: 3000 });
    }
};

const markGigPostInactive = async (gig) => {
    const updatedGig = { ...gig, inventoryStatus: 'INACTIVE' };
    try {
        await updateGigPost(updatedGig.id, updatedGig);
        toast.add({ severity: 'warn', summary: 'Inactive', detail: `${gig.title} marked as inactive`, life: 3000 });
        await applyFilters();
    } catch (err) {
        toast.add({ severity: 'error', summary: 'Error', detail: `Marking inactive failed: ${error.value?.message || 'Unknown error'}`, life: 3000 });
    }
};

const exportCSV = () => {
    dt.value.exportCSV();
};

const getStatusLabel = (status) => {
    switch (status) {
        case 'ACTIVE':
            return 'help';
        case 'COMPLETED':
            return 'success';
        case 'REVIEWED':
            return 'info';
        case 'PENDING':
            return 'danger';
        case 'ARCHIVE':
            return 'warn';
        case 'INACTIVE':
            return 'secondary';
        default:
            return null;
    }
};

// Helper for new gig posts if categories/jobTypes need to be selected from an object
// function to map a value back to its label object if needed for the dropdowns in dialog
function findStatusObject(value, options) {
    return options.find(option => option.value === value) || null;
}

// Add a 'createId' function since it was removed from GigService export
function createId() {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

function toggleDataTable(event) {
    op.value.toggle(event);
}
</script>

<template>
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <!-- <Button label="New Gig" icon="pi pi-plus" severity="secondary" class="mr-2" @click="openNew" /> -->
                    <Button label="Delete Selected Gigs" icon="pi pi-trash" severity="secondary"
                        @click="confirmDeleteSelected" :disabled="!selectedGigPosts || !selectedGigPosts.length" />
                </template>

                <template #end>
                    <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
                </template>
            </Toolbar>

            <DataTable ref="dt" v-model:selection="selectedGigPosts" :value="gigPosts" dataKey="id" :paginator="true"
                :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} gigs">
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <div class="flex gap-3 items-center h-full mb-5">
                            <div class="w-5 bg-green-500 rounded-md min-h-[25px] h-full"></div>
                            <h1 class="text-xl m-0">All Time Gigs Post</h1>
                        </div>
                        <div class="flex gap-2 items-center w-full md:w-auto flex-wrap">
                            <IconField>
                                <InputIcon>
                                    <i class="pi pi-search" />
                                </InputIcon>
                                <InputText v-model="filters['global'].value" placeholder="Search..." />
                            </IconField>
                            <Button label="Filter" icon="pi pi-filter" variant="text" aria-label="Filter"
                                @click="toggleDataTable" />
                            <!--  -->
                        </div>
                    </div>
                    <Popover ref="op" id="overlay_panel" class="mx-auto my-0 mr-0"
                        style="width: 100%; max-width: 700px">
                        <div class="p-4">
                            <div class="flex gap-3 items-center h-full mb-5">
                                <div class="w-3 bg-blue-500 rounded-md min-h-[25px] h-full"></div>
                                <h3 class="font-bold text-lg m-0">Filter</h3>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                <div>
                                    <span class="font-semibold block mb-2">Job Type</span>
                                    <div class="flex flex-wrap gap-3">
                                        <div v-for="option in jobTypeOptions" :key="option.value"
                                            class="flex items-center">
                                            <RadioButton v-model="selectedJobType" :inputId="`jobType-${option.value}`"
                                                :value="option.value" name="jobType" @change="applyFilters" />
                                            <label :for="`jobType-${option.value}`" class="ml-2">{{ option.label
                                                }}</label>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <span class="font-semibold block mb-2">Experience</span>
                                    <div class="flex flex-wrap gap-3">
                                        <div v-for="option in experienceOptions" :key="option.value"
                                            class="flex items-center">
                                            <RadioButton v-model="selectedExperience"
                                                :inputId="`experience-${option.value}`" :value="option.value"
                                                name="experience" @change="applyFilters" />
                                            <label :for="`experience-${option.value}`" class="ml-2">{{ option.label
                                                }}</label>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <span class="font-semibold block mb-2">Client History</span>
                                    <div class="flex flex-wrap gap-3">
                                        <div v-for="option in clientHistoryOptions" :key="option.value"
                                            class="flex items-center">
                                            <RadioButton v-model="selectedClientHistory"
                                                :inputId="`clientHistory-${option.value}`" :value="option.value"
                                                name="clientHistory" @change="applyFilters" />
                                            <label :for="`clientHistory-${option.value}`" class="ml-2">{{ option.label
                                                }}</label>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <span class="font-semibold block mb-2">Number of Proposals</span>
                                    <div class="flex flex-wrap gap-3">
                                        <div v-for="option in numProposalsOptions" :key="option.value"
                                            class="flex items-center">
                                            <RadioButton v-model="selectedNumProposals"
                                                :inputId="`numProposals-${option.value}`" :value="option.value"
                                                name="numProposals" @change="applyFilters" />
                                            <label :for="`numProposals-${option.value}`" class="ml-2">{{ option.label
                                                }}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-end gap-4 mt-10">
                                <Button label="Clear Filter" icon="pi pi-filter-slash" severity="secondary"
                                    variant="outlined" @click="
                                        selectedJobType = 'ALL';
                                    selectedExperience = 'ALL';
                                    selectedClientHistory = 'ALL';
                                    selectedNumProposals = 'ALL';
                                    filters['global'].value = null; // Also clear global search
                                    applyFilters();
                                    " />
                                <Button label="Apply Filter" icon="pi pi-filter" severity="success"
                                    @click="applyFilters" />
                            </div>
                        </div>
                    </Popover>

                </template>

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="title" header="Title" sortable style="min-width: 12rem"></Column>
                <Column field="clientName" header="Client Name" sortable style="min-width: 16rem"></Column>
                <Column field="location" header="Location" sortable style="min-width: 10rem"></Column>
                <Column field="budget" header="Budget" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.budget) }}
                    </template>
                </Column>
                <Column field="rating" header="Reviews" sortable style="min-width: 5rem">
                    <template #body="slotProps">
                        <div class="flex items-center gap-1 justify-center">
                            <i class="pi pi-star-fill text-yellow-500" v-if="slotProps.data.rating > 0"></i>
                            <span>{{ slotProps.data.rating.toFixed(1) }}</span>
                        </div>
                    </template>
                </Column>
                <Column field="inventoryStatus" header="Status" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.inventoryStatus"
                            :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                    </template>
                </Column>
                <Column field="action" header="Action" :exportable="false" style="min-width: 2rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-ellipsis-v" text rounded @click="toggleActionMenu($event, slotProps.data)"
                            aria-haspopup="true" aria-controls="overlay_menu" />
                        <Menu ref="menu" :model="actionMenuItems" :popup="true" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="gigPostDialog" :style="{ width: '450px' }" header="Gig Post Details" :modal="true">
            <div class="flex flex-col gap-6">
                <div>
                    <label for="title" class="block font-bold mb-3">Title</label>
                    <InputText id="title" v-model.trim="gigPost.title" required="true" autofocus
                        :invalid="submitted && !gigPost.title" fluid />
                    <small v-if="submitted && !gigPost.title" class="text-red-500">Title is required.</small>
                </div>
                <div>
                    <label for="clientName" class="block font-bold mb-3">Client Name</label>
                    <InputText id="clientName" v-model.trim="gigPost.clientName" required="true"
                        :invalid="submitted && !gigPost.clientName" fluid />
                    <small v-if="submitted && !gigPost.clientName" class="text-red-500">Client Name is required.</small>
                </div>
                <div>
                    <label for="location" class="block font-bold mb-3">Location</label>
                    <InputText id="location" v-model.trim="gigPost.location" required="true"
                        :invalid="submitted && !gigPost.location" fluid />
                    <small v-if="submitted && !gigPost.location" class="text-red-500">Location is required.</small>
                </div>
                <div>
                    <label for="description" class="block font-bold mb-3">Description</label>
                    <Textarea id="description" v-model="gigPost.description" required="true" rows="3" cols="20" fluid />
                </div>

                <div>
                    <label for="jobType" class="block font-bold mb-3">Job Type</label>
                    <Select id="jobType" v-model="gigPost.jobType"
                        :options="jobTypeOptions.filter(o => o.value !== 'ALL')" optionLabel="label"
                        placeholder="Select Job Type" fluid></Select>
                </div>

                <div>
                    <label for="experience" class="block font-bold mb-3">Experience</label>
                    <Select id="experience" v-model="gigPost.experience"
                        :options="experienceOptions.filter(o => o.value !== 'ALL')" optionLabel="label"
                        placeholder="Select Experience" fluid></Select>
                </div>

                <div>
                    <label for="clientHistory" class="block font-bold mb-3">Client History</label>
                    <Select id="clientHistory" v-model="gigPost.clientHistory"
                        :options="clientHistoryOptions.filter(o => o.value !== 'ALL')" optionLabel="label"
                        placeholder="Select Client History" fluid></Select>
                </div>

                <div>
                    <label for="numProposals" class="block font-bold mb-3">Number of Proposals</label>
                    <InputNumber id="numProposals" v-model="gigPost.numProposals" integeronly fluid />
                </div>
                <div>
                    <label for="inventoryStatus" class="block font-bold mb-3">Status</label>
                    <Select id="inventoryStatus" v-model="gigPost.inventoryStatus" :options="statuses"
                        optionLabel="label" placeholder="Select a Status" fluid></Select>
                </div>

                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-6">
                        <label for="budget" class="block font-bold mb-3">Budget</label>
                        <InputNumber id="budget" v-model="gigPost.budget" mode="currency" currency="USD" locale="en-US"
                            fluid />
                    </div>
                    <div class="col-span-6">
                        <label for="rating" class="block font-bold mb-3">Rating</label>
                        <InputNumber id="rating" v-model="gigPost.rating" mode="decimal" :min="0" :max="5"
                            :minFractionDigits="1" :maxFractionDigits="1" fluid />
                    </div>
                </div>
            </div>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" @click="saveGigPost" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteGigPostDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="gigPost">Are you sure you want to delete <b>{{ gigPost.title }}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteGigPostDialog = false" />
                <Button label="Yes" icon="pi pi-trash" severity="danger" @click="deleteGigPost" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteGigPostsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="selectedGigPosts">Are you sure you want to delete the selected gig posts?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteGigPostsDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedGigPosts" />
            </template>
        </Dialog>
    </div>
</template>

<style scoped>
/* Add any specific styles here if needed */
</style>