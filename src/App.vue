
<script setup>
import { useRoute } from 'vue-router'
import UnitToggler from './components/UnitToggler.vue'
import WeatherBackdrop from './components/WeatherBackdrop.vue'
import { useWeatherThemeStore } from './stores/weatherThemeStore'

const route = useRoute()
const weatherThemeStore = useWeatherThemeStore()

// 상세보기 화면에서는 배경을 클릭해도 해당 도시의 테마 색이 유지되도록 리셋을 막음
const handleBackgroundClick = () => {
  if (route.name === 'weather-detail') return
  weatherThemeStore.resetStatus()
}
</script>

<template>
  <WeatherBackdrop />

  <!-- 날씨 카드가 아닌 곳(배경, 네비게이션 등)을 클릭하면 기본 다크 테마로 복귀 -->
  <div class="app-layout" @click="handleBackgroundClick">
    <!-- [요구사항 2] Navigation Bar + 단위 변경 UI -->
    <nav class="nav-bar">
      <div class="nav-links">
        <RouterLink to="/">🏠 홈</RouterLink>
        <RouterLink to="/about">ℹ️ 소개</RouterLink>
      </div>
      <UnitToggler />
    </nav>

    <!-- [요구사항 2] 메인 콘텐츠 영역 -->
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.nav-bar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 28px;
  background: var(--surface-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: var(--shadow-sm);
  border-bottom: 1px solid rgba(139, 124, 246, 0.16);
}

.nav-links {
  display: flex;
  gap: 8px;
}

.nav-bar a {
  text-decoration: none;
  color: var(--text-muted);
  font-weight: 700;
  font-size: 0.95rem;
  padding: 8px 16px;
  border-radius: 999px;
  transition: all 0.2s ease;
}

.nav-bar a:hover {
  background: var(--hover-surface);
  color: var(--primary);
}

.nav-bar a.router-link-active {
  color: #fff;
  background: var(--gradient-primary);
  box-shadow: var(--shadow-glow);
}

.main-content {
  padding: 32px 20px 60px;
}
</style>
