<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BaseDashboardCard from '../components/weather/BaseDashboardCard.vue'
import { weatherMockData } from '../data/weatherMockData'

const route = useRoute()

// [요구사항] Mount 시점에 라우터 동적 경로(cityId)로 Mock Data에서 도시 객체 선택
const city = ref(null)

onMounted(() => {
  city.value = weatherMockData.find((item) => item.id === route.params.cityId) ?? null
})
</script>

<template>
  <div class="weather-detail">
    <RouterLink to="/" class="back-link">← 대시보드로 돌아가기</RouterLink>

    <BaseDashboardCard v-if="city">
      <h2>{{ city.name }} 상세 기상관측 정보</h2>
      <p class="status">현재 상태: {{ city.status }}</p>
      <ul class="detail-list">
        <li>🌡 기온: {{ city.temp }}°C</li>
        <li>💧 습도: {{ city.humidity }}%</li>
        <li>🌬 풍속: {{ city.windSpeed }} m/s</li>
        <li>☔ 강수확률: {{ city.precipitationProb }}%</li>
      </ul>
      <p class="description">{{ city.description }}</p>
    </BaseDashboardCard>

    <BaseDashboardCard v-else>
      <p>'{{ route.params.cityId }}'에 해당하는 도시의 관측 정보를 찾을 수 없습니다.</p>
    </BaseDashboardCard>
  </div>
</template>

<style scoped>
.weather-detail {
  max-width: 480px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
}

.back-link {
  display: inline-block;
  margin-bottom: 16px;
  color: #1976d2;
  text-decoration: none;
}

.status {
  color: #555;
}

.detail-list {
  list-style: none;
  padding: 0;
  margin: 12px 0;
}

.detail-list li {
  padding: 6px 0;
  border-bottom: 1px solid #eee;
}

.description {
  margin-top: 12px;
  color: #444;
  line-height: 1.5;
}
</style>
