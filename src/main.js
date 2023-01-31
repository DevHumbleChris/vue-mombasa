import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Fontawesomeicons.
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas, fab, far)

import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.component('FontAweasomeIcon', FontAwesomeIcon)
app.use(router)
app.mount('#app')
