<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BaseDashboardCard from '../components/weather/BaseDashboardCard.vue'
import { weatherMockData } from '../data/weatherMockData'
import { useConfigStore } from '../stores/configStore'

const route = useRoute()
const configStore = useConfigStore()

// [요구사항] Mount 시점에 라우터 동적 경로(cityId)로 Mock Data에서 도시 객체 선택
const city = ref(null)

onMounted(() => {
  city.value = weatherMockData.find((item) => item.id === route.params.cityId) ?? null
})

// [Pinia 과제] 단위 설정에 맞춰 기온 변환
const displayTemp = computed(() => {
  if (!city.value) return null
  const rawTemp = city.value.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})
</script>

<template>
  <div class="weather-detail">
    <RouterLink to="/" class="back-link">← 대시보드로 돌아가기</RouterLink>

    <BaseDashboardCard v-if="city">
      <h2>{{ city.name }} 상세 기상관측 정보</h2>
      <p class="status">현재 상태: {{ city.status }}</p>
      <ul class="detail-list">
        <li>🌡 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</li>
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
  max-width: 560px;
  margin: 0 auto;
  padding: 0 20px;
}

.back-link {
  display: inline-block;
  margin-bottom: 20px;
  color: var(--primary);
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

.weather-detail h2 {
  margin: 0 0 4px;
  font-size: 1.4rem;
}

.status {
  color: var(--text-muted);
  margin: 0 0 16px;
}

.detail-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.detail-list li {
  padding: 12px 4px;
  border-bottom: 1px solid var(--border);
  font-size: 0.95rem;
  color: var(--text);
}

.detail-list li:last-child {
  border-bottom: none;
}

.description {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed var(--border);
  color: var(--text-muted);
  line-height: 1.6;
}
</style>
