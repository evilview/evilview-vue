import { createApp } from 'vue'
import "./assets/css/style.scss"
import App from './App.vue'
import i18n from './i18n'
import { createPinia } from "pinia";
import piniaPersist from 'pinia-plugin-persist';
import router from './router';
import 'boxicons' 

// import ui library

import {Quasar} from 'quasar'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/themify/themify.css'
// Import Quasar css
import 'quasar/dist/quasar.css'


const pinia = createPinia()
pinia.use(piniaPersist)

const app = createApp(App)

app.use(Quasar,{
    
})
app.use(router)
app.use(i18n)
app.use(pinia)
app.mount('#app')
