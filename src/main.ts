import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import store from './store'
import icons from './global/register-icons'

const app = createApp(App)

// 不用全局安装element-plus
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

// 注册 全局图标
app.use(icons)
app.use(store)
app.use(router)
app.mount('#app')
