<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'

// [요구사항 1] 배열 렌더링용 날씨 데이터
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
])

// [요구사항 3] 검색 input과 양방향 바인딩될 변수
const searchQuery = ref('')

// [요구사항 2] 검색어로 필터링된 날씨 리스트 (computed)
const filteredWeatherList = computed(() => {
  if (!searchQuery.value.trim()) {
    return weatherList.value
  }
  return weatherList.value.filter((city) => city.name.includes(searchQuery.value))
})

// searchQuery 감시 (watchEffect 이용): 검색어가 바뀔 때마다 콘솔로그 작성
watchEffect(() => {
  console.log(`검색어가 변경되었습니다. 현재 검색어: ${searchQuery.value}`)
})

// [요구사항 4] 카드 클릭 시 표시될 상태바 문구
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

// [요구사항 4] 카드(자식)를 클릭했을 때 실행되는 핸들러
const selectCity = (cityName) => {
  selectedCityInfo.value = `${cityName}이 선택되었습니다.`
}

// watch 이용 selectedCityInfo 감시: 상태바 문구가 바뀔 때마다 콘솔로그 작성
watch(selectedCityInfo, (newValue) => {
  console.log(`상태바 문구가 변경되었습니다. ${newValue}`)
})

// [요구사항 4] 상세보기(자식 버튼)를 클릭했을 때 실행되는 핸들러
const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="weather-mockup">
    <h2>🌤 과제 1: 날씨 (Mockup)</h2>

    <!-- [요구사항 3] 도시 검색 -->
    <BaseDashboardCard>
      <SearchBar :query="searchQuery" @update-query="searchQuery = $event" />
    </BaseDashboardCard>

    <!-- [요구사항 1] 날씨 카드 리스트 -->
    <BaseDashboardCard>
      <h3>📍 지역별 날씨 현황</h3>

      <WeatherCard
        v-for="city in filteredWeatherList"
        :key="city.id"
        :city="city"
        @select-card="selectCity"
        @click-detail="showDetail"
      />

      <p v-if="filteredWeatherList.length === 0" class="no-result">검색 결과가 일치하는 도시가 없습니다.</p>
    </BaseDashboardCard>

    <!-- [요구사항 4] 카드 클릭 결과가 표시되는 상태바 -->
    <div class="status-bar">{{ selectedCityInfo }}</div>
  </div>
</template>

<style scoped>
.weather-mockup {
  max-width: 480px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
}

.no-result {
  margin-top: 10px;
  color: #888;
  text-align: center;
}

.status-bar {
  padding: 12px;
  background-color: #e8f5e9;
  border-radius: 6px;
  text-align: center;
}
</style>
