import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { projectAuth } from './firebase/config'

import './assets/style.css'
let app
projectAuth.onAuthStateChanged(() => {
    if (!app) {
      app = createApp(App)
        .use(router)
        .mount('#app')
    }
  })
