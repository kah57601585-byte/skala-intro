import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages는 https://<user>.github.io/<repo>/ 하위 경로로 서빙되므로,
  // 빌드 시에만 저장소 이름을 base로 지정함 (개발 서버는 그대로 '/')
  base: command === 'build' ? '/skala-intro/' : '/',
  plugins: [
    vue(),
    vueDevTools(),
    vuetify({ autoImport: true }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    // Vuetify 컴포넌트는 라우트별로 지연 로딩되는 뷰 안에서 개별적으로 auto-import되기 때문에,
    // Vite가 첫 방문 시 하나씩 뒤늦게 발견하며 여러 번 재최적화(→ 자동 새로고침)를 반복해
    // 페이지가 깨진 채로 뜨는 경우가 있었음. 미리 명시해서 콜드 스타트 때 한 번에 사전 번들링함.
    include: [
      'vuetify/components/VApp',
      'vuetify/components/VBtn',
      'vuetify/components/VCard',
      'vuetify/components/VDivider',
      'vuetify/components/VGrid',
      'vuetify/components/VIcon',
      'vuetify/components/VList',
      'vuetify/components/VAlert',
      'vuetify/components/VCheckbox',
      'vuetify/components/VChip',
      'vuetify/components/VDialog',
      'vuetify/components/VProgressLinear',
      'vuetify/components/VRadioGroup',
      'vuetify/components/VRating',
      'vuetify/components/VSelect',
      'vuetify/components/VSlider',
      'vuetify/components/VSnackbar',
      'vuetify/components/VSwitch',
      'vuetify/components/VTable',
      'vuetify/components/VTextField',
    ],
  },
}))
