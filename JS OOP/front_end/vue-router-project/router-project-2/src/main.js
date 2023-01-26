import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCryptojs from 'vue-cryptojs'

import './assets/main.css'

const app = createApp(App)

app.use(router,VueCryptojs)

app.mount('#app')

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"