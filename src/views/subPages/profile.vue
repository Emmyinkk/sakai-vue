<template>
    <div class="bg-white dark:bg-[#27272a] rounded-lg p-10">
        <div class="flex gap-3 items-center h-full mb-5">
            <div class="w-5 bg-green-500 rounded-md min-h-[25px] h-full"></div>
            <h1 class="text-lg m-0">Account Settings</h1>
        </div>
        <div class="flex items-center gap-5">
            <div class="w-[100px] h-[100px] rounded-xl relative">
                <img src="/demo/images/image1.png" alt="" class="object-cover h-full rounded-xl">
                <button
                    class="absolute -bottom-2 -right-4 rounded-full bg-white dark:bg-[#27272a] w-[40px] h-[40px] flex flex-col justify-center items-center shadow-lg">
                    <i class="pi pi-pen-to-square"></i>
                </button>
            </div>
            <div class="flex flex-col">
                <h3 class="font-bold text-lg mb-0">Dean Smith</h3>
                <p class="text-sm text-gray-500">alexarawles@gmail.com</p>
            </div>
        </div>
        <fluid class="mt-10">
            <div class="flex mt-8">
                <div class="flex flex-col gap-10 w-full">
                    <div class="flex flex-col md:flex-row gap-4">
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="firstname2">Full Name</label>
                            <InputText id="firstname2" type="text" />
                        </div>
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="lastname2">Username</label>
                            <InputText id="lastname2" type="text" />
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row gap-4">
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="state">Gender</label>
                            <Select id="state" v-model="genderItem" :options="genderItems" optionLabel="name"
                                placeholder="Select One" class="w-full"></Select>
                        </div>
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="state">Country</label>
                            <Select id="state" v-model="countryItem" :options="countryItems" optionLabel="name"
                                placeholder="Select One" class="w-full"></Select>
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row gap-4">
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="state">Language</label>
                            <Select id="state" v-model="genderItem" :options="genderItems" optionLabel="name"
                                placeholder="Select One" class="w-full"></Select>
                        </div>
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="lastname2">Phone Number</label>
                            <InputText id="lastname2" type="text" />
                        </div>
                    </div>

                    <div class="flex flex-col md:flex-row gap-4">
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="state">State</label>
                            <Select id="state" v-model="dropdownItem" :options="dropdownItems" optionLabel="name"
                                placeholder="Select One" class="w-full"></Select>
                        </div>
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="zip">Time Zone</label>
                            <InputText id="zone" type="text" modelValue="Central Time - Nigeria" />
                        </div>
                    </div>
                </div>
            </div>
        </fluid>
        <div class="mt-5">
            <div class="flex gap-4 items-center">
                <div class="rounded-full bg-[#4181f9] w-[35px] h-[35px] flex justify-center items-center">
                    <i class="pi pi-envelope" style="color: white"></i>
                </div>
                <div class="flex flex-col">
                    <h4 class="text-base font-bold mb-0">alexarawles@gmail.com</h4>
                    <p class="text-sm text-gray-500">1 month ago</p>
                </div>
            </div>

            <div class="mt-5">
                <div class="flex justify-between md:items-center flex-col md:flex-row gap-4">
                    <button class="flex gap-1 justify-center items-center p-3 px-4 rounded-lg bg-[#4181f930]">
                        <i class="pi pi-plus" style="color: #4181f9; font-size: 1rem"></i>
                        <p class="mb-0 text-base text-[#4182F9]">Add Email Address</p>
                    </button>
                    <div class="flex gap-3 md:items-center flex-col md:flex-row">
                        <Button label="Update Profile" severity="success" size="normal"
                            class="" />
                        <Button label="Update Password" severity="success" size="normal" variant="outlined"
                            class="" />
                        <Button label="Cancel" severity="danger" variant="outlined" size="normal" />
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const genderItems = ref([
    { name: 'Male', code: 'Male' },
    { name: 'Female', code: 'Female' },
    { name: 'Other', code: 'Other' }
]);
const countryItems = ref([
    { name: 'Nigeria', code: 'NG' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' }
]);

const genderItem = ref(null);
const countryItem = ref(null);
</script>