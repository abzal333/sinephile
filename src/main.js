import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/main.scss'
// ========================================================
const app = createApp(App)
// подключение иконок =====================================
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(fas, far, fab)
app.component('fa', FontAwesomeIcon)
// ========================================================
import BtnMore from '@/components/BtnMore'
app.component('BtnMore', BtnMore)
import Actors from '@/components/Actors'
app.component('Actors', Actors)
// ========================================================
app.use(router).use(store).mount('#app')