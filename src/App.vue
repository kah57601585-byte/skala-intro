
<script setup></script>

<template>
  <div class="app-layout">
    <!-- [요구사항 2] Navigation Bar -->
    <nav class="nav-bar">
      <RouterLink to="/">🏠 홈</RouterLink>
      <RouterLink to="/about">ℹ️ 소개</RouterLink>
    </nav>

    <!-- [요구사항 2] 메인 콘텐츠 영역 -->
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.nav-bar {
  display: flex;
  gap: 20px;
  padding: 14px 20px;
  border-bottom: 1px solid #ddd;
}

.nav-bar a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.nav-bar a.router-link-active {
  color: #1976d2;
  font-weight: 700;
}

.main-content {
  padding: 20px 0;
}
</style>
