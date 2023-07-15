import { createApp } from 'vue'
import "./style.css"
import App from './App.vue'
import i18n from './i18n'
import { createPinia } from "pinia";
import piniaPersist from 'pinia-plugin-persist';
import router from './router';

const pinia = createPinia()
pinia.use(piniaPersist)

const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(pinia)
app.mount('#app')
