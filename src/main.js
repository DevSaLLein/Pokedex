import { createApp } from 'vue';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import App from './App.vue';

import store from './store';

import i18n from './i18n/i18n';

const app = createApp(App);

app.use(store);

app.use(i18n);

app.mount('#app');
