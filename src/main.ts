import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueSweetAlert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

createApp(App).use(store).use(router).use(VueSweetAlert2).mount('#app')
