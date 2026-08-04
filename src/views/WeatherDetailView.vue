<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BaseDashboardCard from '../components/weather/BaseDashboardCard.vue'
import { weatherMockData } from '../data/weatherMockData'
import { useConfigStore } from '../stores/configStore'
import { useWeatherThemeStore } from '../stores/weatherThemeStore'
import { fetchWeatherByCityName } from '../api/weatherApi'

const route = useRoute()
const configStore = useConfigStore()
const weatherThemeStore = useWeatherThemeStore()

// [요구사항] Mount 시점에 라우터 동적 경로(cityId)로 Mock Data에서 도시 객체 선택
const city = ref(null)
const isLoadingLiveWeather = ref(false)

onMounted(async () => {
  const mockCity = weatherMockData.find((item) => item.id === route.params.cityId)
  city.value = mockCity ? { ...mockCity } : null
  if (!city.value) return

  // [OpenWeatherMap 연동] 실시간 날씨로 mock 값을 덮어씀. 실패 시 mock 값 유지
  isLoadingLiveWeather.value = true
  try {
    const liveWeather = await fetchWeatherByCityName(city.value.english)
    Object.assign(city.value, liveWeather)
    weatherThemeStore.setStatus(liveWeather.status)
  } catch (error) {
    console.error(`[날씨 API] ${city.value.name} 실시간 날씨 조회 실패, mock 데이터로 표시합니다.`, error)
  } finally {
    isLoadingLiveWeather.value = false
  }
})

// [Pinia 과제] 단위 설정에 맞춰 기온 변환
const toDisplayUnit = (celsius) => {
  if (configStore.unit === 'fahrenheit') {
    return Math.round((celsius * 9) / 5 + 32)
  }
  return celsius
}

const displayTemp = computed(() => {
  if (!city.value) return null
  return toDisplayUnit(city.value.temp)
})

// [OpenWeatherMap 연동] 체감 온도도 동일하게 단위 변환
const displayFeelsLike = computed(() => {
  if (!city.value || city.value.feelsLike == null) return null
  return toDisplayUnit(city.value.feelsLike)
})
</script>

<template>
  <div class="weather-detail">
    <!-- .stop: 배경 클릭으로 오인되어 테마가 리셋되지 않도록 전파 차단 -->
    <RouterLink to="/" class="back-link" @click.stop>← 대시보드로 돌아가기</RouterLink>

    <BaseDashboardCard v-if="city">
      <h2>
        <span class="gradient-text">{{ city.name }} 상세 기상관측 정보</span>
        <span v-if="isLoadingLiveWeather" class="live-badge">실시간 데이터 불러오는 중…</span>
      </h2>
      <p class="status">현재 상태: {{ city.status }}</p>
      <ul class="detail-list">
        <li>🌡 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</li>
        <li v-if="displayFeelsLike != null">🤔 체감 온도: {{ displayFeelsLike }}{{ configStore.unitSymbol }}</li>
        <li>💧 습도: {{ city.humidity }}%</li>
        <li>🌬 풍속: {{ city.windSpeed }} m/s</li>
        <li v-if="city.precipitationProb != null">☔ 강수확률: {{ city.precipitationProb }}%</li>
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
  display: inline-flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 6px 14px;
  border-radius: 999px;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--primary);
  font-weight: 700;
  font-size: 0.85rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.back-link:hover {
  background: var(--hover-surface);
  border-color: var(--primary);
}

.weather-detail h2 {
  margin: 0 0 4px;
  font-size: 1.4rem;
  font-weight: 800;
}

.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.live-badge {
  margin-left: 8px;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--text-muted);
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
  padding: 14px 16px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, rgba(139, 124, 246, 0.12), rgba(244, 114, 182, 0.1));
  color: var(--text-muted);
  line-height: 1.6;
}
</style>
