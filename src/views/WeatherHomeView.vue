<script setup>
import { ref, computed, watch, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseDashboardCard from '../components/weather/BaseDashboardCard.vue'
import SearchBar from '../components/weather/SearchBar.vue'
import WeatherCard from '../components/weather/WeatherCard.vue'
import { weatherMockData } from '../data/weatherMockData'
import { useWeatherThemeStore } from '../stores/weatherThemeStore'
import { fetchWeatherByCityName } from '../api/weatherApi'

const router = useRouter()
const weatherThemeStore = useWeatherThemeStore()

// [요구사항] 배열 렌더링용 날씨 데이터 (mock을 복제해 실시간 데이터로 덮어씀)
const weatherList = ref(weatherMockData.map((city) => ({ ...city })))
const isLoadingLiveWeather = ref(false)

// [OpenWeatherMap 연동] 마운트 시 도시별 실시간 날씨를 조회해 mock 값을 덮어씀.
// 개별 도시 조회가 실패해도 그 도시만 mock 데이터로 남고 나머지는 정상 표시됨.
onMounted(async () => {
  isLoadingLiveWeather.value = true
  await Promise.allSettled(
    weatherList.value.map(async (city) => {
      try {
        const { name: _liveName, ...liveWeather } = await fetchWeatherByCityName(city.english)
        // isLive: 실시간 데이터로 덮어썼음을 표시 (mock 전용 description 문구와 혼동되지 않도록)
        // name은 제외: 우리가 지정한 한글 도시명(서울/수원/부산)을 API의 영문명으로 덮어쓰지 않기 위함
        Object.assign(city, liveWeather, { isLive: true })
      } catch (error) {
        console.error(`[날씨 API] ${city.name} 실시간 날씨 조회 실패, mock 데이터로 표시합니다.`, error)
      }
    }),
  )
  isLoadingLiveWeather.value = false
})

// 검색 input과 양방향 바인딩될 변수
const searchQuery = ref('')

// 검색어로 필터링된 날씨 리스트 (computed)
const filteredWeatherList = computed(() => {
  if (!searchQuery.value.trim()) {
    return weatherList.value
  }
  return weatherList.value.filter((city) => city.name.includes(searchQuery.value))
})

// [API 전체 도시 검색] 목록에 없는 도시는 OpenWeatherMap에서 직접 검색해 추가
const isSearchingApi = ref(false)
const apiSearchError = ref('')

const searchCityFromApi = async () => {
  const trimmedQuery = searchQuery.value.trim()
  if (!trimmedQuery) return

  isSearchingApi.value = true
  apiSearchError.value = ''
  try {
    const liveWeather = await fetchWeatherByCityName(trimmedQuery)
    const newCity = {
      id: trimmedQuery,
      english: trimmedQuery,
      isLive: true,
      ...liveWeather,
    }

    const existingIndex = weatherList.value.findIndex(
      (existing) => existing.english.toLowerCase() === trimmedQuery.toLowerCase(),
    )
    if (existingIndex !== -1) {
      Object.assign(weatherList.value[existingIndex], newCity)
    } else {
      weatherList.value.unshift(newCity)
    }

    searchQuery.value = ''
    selectedCityInfo.value = `${newCity.name}이(가) 검색 결과에 추가되었습니다.`
    weatherThemeStore.setStatus(newCity.status)
  } catch (error) {
    apiSearchError.value = `'${trimmedQuery}' 도시를 찾을 수 없습니다. 영문 이름으로 검색해 보세요. (예: Tokyo, London, New York)`
  } finally {
    isSearchingApi.value = false
  }
}

// searchQuery 감시 (watchEffect 이용): 검색어가 바뀔 때마다 콘솔로그 작성
watchEffect(() => {
  console.log(`검색어가 변경되었습니다. 현재 검색어: ${searchQuery.value}`)
})

// 카드 클릭 시 표시될 상태바 문구
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

// 카드(자식)를 클릭했을 때 실행되는 핸들러
const selectCity = (city) => {
  selectedCityInfo.value = `${city.name}이 선택되었습니다.`
  // [배경 테마 과제] 선택된 도시의 날씨 상태에 맞춰 배경 테마 변경
  weatherThemeStore.setStatus(city.status)
}

// watch 이용 selectedCityInfo 감시: 상태바 문구가 바뀔 때마다 콘솔로그 작성
watch(selectedCityInfo, (newValue) => {
  console.log(`상태바 문구가 변경되었습니다. ${newValue}`)
})

// [요구사항 3] 상세보기 클릭 시 alert 대신 Programmatic Navigation으로 상세 페이지 이동
const showDetail = (city) => {
  // 카드를 먼저 선택하지 않고 바로 상세보기를 눌러도 해당 도시의 배경 테마가 적용되도록 함
  weatherThemeStore.setStatus(city.status)
  // english(API 조회명)를 라우트 파라미터로 사용해, mock 도시든 검색으로 추가한 도시든
  // 상세 페이지에서 동일하게 실시간 조회가 가능하도록 함
  router.push('/weather/' + encodeURIComponent(city.english))
}
</script>

<template>
  <div class="weather-mockup">
    <h2>🌤 <span class="gradient-text">지역별 날씨 대시보드</span></h2>

    <!-- 도시 검색 -->
    <BaseDashboardCard>
      <SearchBar :query="searchQuery" @update-query="searchQuery = $event" />
    </BaseDashboardCard>

    <!-- 날씨 카드 리스트 -->
    <BaseDashboardCard>
      <h3>📍 지역별 날씨 현황 <span v-if="isLoadingLiveWeather" class="live-badge">실시간 데이터 불러오는 중…</span></h3>

      <WeatherCard
        v-for="city in filteredWeatherList"
        :key="city.id"
        :city="city"
        @select-card="selectCity"
        @click-detail="showDetail"
      />

      <!-- [API 전체 도시 검색] 목록에 없는 도시명이면 OpenWeatherMap에서 직접 검색해 추가 -->
      <div v-if="filteredWeatherList.length === 0" class="no-result-block">
        <p class="no-result">검색 결과가 일치하는 도시가 없습니다.</p>
        <button class="api-search-btn" :disabled="isSearchingApi" @click="searchCityFromApi">
          {{ isSearchingApi ? '전 세계 도시에서 검색 중…' : `🌍 '${searchQuery}' 전 세계 날씨에서 검색하기` }}
        </button>
        <p v-if="apiSearchError" class="api-search-error">{{ apiSearchError }}</p>
      </div>
    </BaseDashboardCard>

    <!-- 카드 클릭 결과가 표시되는 상태바 -->
    <div class="status-bar">{{ selectedCityInfo }}</div>
  </div>
</template>

<style scoped>
.weather-mockup {
  max-width: 560px;
  margin: 0 auto;
  padding: 0 20px;
}

.weather-mockup h2 {
  font-size: 1.75rem;
  font-weight: 800;
  margin: 0 0 20px;
}

.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.weather-mockup h3 {
  margin: 0 0 4px;
  font-size: 1.05rem;
  color: var(--text);
}

.live-badge {
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--text-muted);
}

.no-result-block {
  margin-top: 14px;
  text-align: center;
}

.no-result {
  margin: 0 0 12px;
  color: var(--text-muted);
}

.api-search-btn {
  padding: 10px 18px;
  border: none;
  border-radius: 999px;
  background: var(--gradient-primary);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(139, 124, 246, 0.32);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    opacity 0.15s ease;
}

.api-search-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(139, 124, 246, 0.42);
}

.api-search-btn:disabled {
  opacity: 0.6;
  cursor: default;
}

.api-search-error {
  margin: 10px 0 0;
  color: #f87171;
  font-size: 0.85rem;
}

.status-bar {
  padding: 14px;
  background: var(--gradient-cool);
  border-radius: var(--radius-md);
  text-align: center;
  color: #fff;
  font-weight: 700;
  box-shadow: var(--shadow-glow);
  transition: background 0.2s ease;
}
</style>
