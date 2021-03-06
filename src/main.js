import { createApp } from 'vue'
import router from './router'
import BootstrapVue3 from 'bootstrap-vue-3'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import App from './App.vue'

const app = createApp(App)
app.use(BootstrapVue3)
app.use(router)
app.mount('#app')
