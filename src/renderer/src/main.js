
import './index.css'
import './styles/font/iconfont'
// import 'element-plus/theme-chalk/dark/css-vars.css'
import { createApp } from 'vue'
import App from './App.vue'
// import VueRouter from 'vue-router'
import router from './router/router'
import { createPinia } from 'pinia'
import stateSync from './store/plugins/stateSync'

const pinia = createPinia().use(stateSync)
const app = createApp(App)
// app.use(VueRouter)
app.use(router)
app.use(pinia)
app.mount('#app')
