<template>
  <div class="about-view">
    <h2>ℹ️ <span class="gradient-text">소개</span></h2>
    <p>
      본 대시보드는 전국 주요 도시의 날씨 정보를 확인할 수 있는 Vue 3 학습용 프로젝트입니다.
      검색 기능으로 원하는 도시를 빠르게 찾고, 카드를 클릭해 지역별 상세 기상관측 정보를 확인해 보세요.
    </p>
    <RouterLink
      to="/"
      class="back-link"
    >
      ← 메인 대시보드로 돌아가기
    </RouterLink>
  </div>
</template>

<style scoped>
.about-view {
  position: relative;
  max-width: 560px;
  margin: 0 auto;
  padding: 24px 20px 20px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.about-view::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 4px;
  background: var(--gradient-primary);
}

.about-view h2 {
  margin: 0 0 12px;
  font-size: 1.4rem;
  font-weight: 800;
}

.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.about-view p {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.7;
}

.back-link {
  display: inline-flex;
  align-items: center;
  margin-top: 20px;
  padding: 8px 16px;
  border-radius: 999px;
  background: var(--gradient-primary);
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  box-shadow: 0 4px 14px rgba(139, 124, 246, 0.32);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.back-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(139, 124, 246, 0.42);
}
</style>
