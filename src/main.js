import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import router from './router'

// 앱 전체가 다크 테마라 Vuetify도 다크 테마로 맞춤
const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
})

createApp(App).use(createPinia()).use(router).use(vuetify).mount('#app')
