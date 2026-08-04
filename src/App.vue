
<script setup>
import UnitToggler from './components/UnitToggler.vue'
</script>

<template>
  <div class="app-layout">
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
  border-bottom: 1px solid rgba(109, 94, 245, 0.1);
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
  background: #f1eefe;
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
