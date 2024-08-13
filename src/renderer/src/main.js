
import './index.css'
import './styles/font/iconfont'
import { createApp } from 'vue'
import App from './App.vue'
// import VueRouter from 'vue-router'
import router from './router/router'

const app = createApp(App)
// app.use(VueRouter)
app.use(router)

app.mount('#app')
