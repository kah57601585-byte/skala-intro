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

// [요구사항] Mount 시점에 라우터 동적 경로(cityId)로 도시 객체 선택
// cityId는 도시의 API 조회명(english)을 URL 인코딩한 값. mock 도시든, 검색으로 찾은 도시든
// 동일한 방식으로 상세 조회가 가능하도록 통일함.
const city = ref(null)
const isLoadingLiveWeather = ref(false)

onMounted(async () => {
  const cityQuery = decodeURIComponent(route.params.cityId)
  const mockCity = weatherMockData.find((item) => item.english === cityQuery)
  // mock에 있는 도시면 한글 이름/설명 등 기본값으로 사용, 없으면 조회명만으로 임시 객체 생성
  city.value = mockCity ? { ...mockCity } : { id: cityQuery, name: cityQuery, english: cityQuery }

  // [OpenWeatherMap 연동] 실시간 날씨로 mock 값을 덮어씀.
  isLoadingLiveWeather.value = true
  try {
    const liveWeather = await fetchWeatherByCityName(cityQuery)
    if (mockCity) {
      // isLive: 실시간 데이터로 덮어썼음을 표시 (mock 전용 description 문구와 혼동되지 않도록)
      // name은 제외: 우리가 지정한 한글 도시명을 API의 영문명으로 덮어쓰지 않기 위함
      const { name: _liveName, ...liveWeatherWithoutName } = liveWeather
      Object.assign(city.value, liveWeatherWithoutName, { isLive: true })
    } else {
      // mock에 없는(검색으로 찾은) 도시는 API가 알려준 이름을 그대로 사용
      Object.assign(city.value, liveWeather, { isLive: true })
    }
    weatherThemeStore.setStatus(liveWeather.status)
  } catch (error) {
    console.error(`[날씨 API] '${cityQuery}' 실시간 날씨 조회 실패`, error)
    // mock 데이터가 없는(검색 전용) 도시는 API 조회가 실패하면 보여줄 정보가 없음
    if (!mockCity) {
      city.value = null
    }
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
        <!-- precipitationProb는 mock 전용 필드 (Current Weather API엔 강수확률이 없음) -->
        <li v-if="!city.isLive && city.precipitationProb != null">☔ 강수확률: {{ city.precipitationProb }}%</li>
      </ul>
      <!-- description도 mock 전용 문구라 실시간 데이터일 땐 다른 안내로 대체 -->
      <p v-if="city.isLive" class="description">🔴 실시간 관측 데이터 기준입니다.</p>
      <p v-else class="description">{{ city.description }}</p>
    </BaseDashboardCard>

    <BaseDashboardCard v-else>
      <p>'{{ decodeURIComponent(route.params.cityId) }}'에 해당하는 도시의 관측 정보를 찾을 수 없습니다.</p>
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
