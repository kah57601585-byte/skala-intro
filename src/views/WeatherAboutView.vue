<template>
  <div class="about-view">
    <h2>ℹ️ 소개</h2>
    <p>
      본 대시보드는 전국 주요 도시의 날씨 정보를 확인할 수 있는 Vue 3 학습용 프로젝트입니다.
      검색 기능으로 원하는 도시를 빠르게 찾고, 카드를 클릭해 지역별 상세 기상관측 정보를 확인해 보세요.
    </p>
    <RouterLink to="/" class="back-link">← 메인 대시보드로 돌아가기</RouterLink>
  </div>
</template>

<style scoped>
.about-view {
  max-width: 560px;
  margin: 0 auto;
  padding: 20px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.about-view h2 {
  margin: 0 0 12px;
  font-size: 1.4rem;
}

.about-view p {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.7;
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}
</style>
