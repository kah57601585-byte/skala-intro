<template>
  <div class="not-found">
    <h2>404 - 페이지를 찾을 수 없습니다</h2>
    <p>요청하신 페이지가 존재하지 않습니다.</p>
    <RouterLink to="/" class="back-link">← 메인 대시보드로 돌아가기</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  max-width: 480px;
  margin: 60px auto 0;
  padding: 40px 20px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  text-align: center;
}

.not-found h2 {
  margin: 0 0 8px;
  font-size: 1.6rem;
}

.not-found p {
  margin: 0 0 20px;
  color: var(--text-muted);
}

.back-link {
  display: inline-block;
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}
</style>
