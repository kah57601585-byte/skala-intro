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
  margin: 0 auto;
  padding: 40px 20px;
  font-family: sans-serif;
  text-align: center;
}

.back-link {
  display: inline-block;
  margin-top: 16px;
  color: #1976d2;
  text-decoration: none;
}
</style>
