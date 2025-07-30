import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { createPinia } from 'pinia'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Paginator from 'primevue/paginator';

import 'remixicon/fonts/remixicon.css'

import Aura from '@primeuix/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import '@/assets/styles.scss';

const pinia = createPinia()
const app = createApp(App);

app.use(pinia);
app.use(VueAxios, axios);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark'
        }
    }
});
app.use(ToastService);
app.use(ConfirmationService);
app.component('Paginator', Paginator);

app.mount('#app');
