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
  font-weight: 800;
  background: var(--gradient-warm);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.not-found p {
  margin: 0 0 20px;
  color: var(--text-muted);
}

.back-link {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 999px;
  background: var(--gradient-primary);
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  box-shadow: 0 4px 14px rgba(109, 94, 245, 0.28);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.back-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(109, 94, 245, 0.38);
}
</style>
