<script setup>
import { ref } from 'vue'

// [요구사항 1] 배열 렌더링용 날씨 데이터
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
])

// [요구사항 3] 검색 input과 양방향 바인딩될 변수
const searchQuery = ref('')

// [요구사항 4] 카드 클릭 시 표시될 상태바 문구
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

// [요구사항 4] 카드(부모)를 클릭했을 때 실행되는 핸들러
const selectCity = (cityName) => {
  selectedCityInfo.value = `${cityName}이 선택되었습니다.`
}

// [요구사항 4] 상세보기(자식 버튼)를 클릭했을 때 실행되는 핸들러
const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="weather-mockup">
    <h2>🌤 과제 1: 날씨 (Mockup)</h2>

    <!-- [요구사항 3] 도시 검색 input -->
    <section class="search-box">
      <label>🔍 도시 검색</label>
      <input type="text" v-model="searchQuery" placeholder="검색할 도시 이름 입력" />
      <p>검색 중인 도시: {{ searchQuery }}</p>
    </section>

    <!-- [요구사항 1] v-for로 날씨 카드 반복 출력 -->
    <section class="weather-list">
      <h3>📍 지역별 날씨 현황</h3>

      <div v-for="city in weatherList" :key="city.id" class="weather-card" @click="selectCity(city.name)">
        <h4>{{ city.name }} ({{ city.status }})</h4>
        <p>현재 기온: {{ city.temp }}°C</p>

        <!-- [요구사항 2] 기온에 따른 조건부 렌더링 -->
        <span v-if="city.temp >= 25" class="tag hot">🔥 더움 (25도 이상)</span>
        <span v-else class="tag cool">❄️ 선선함 (25도 미만)</span>

        <!-- [요구사항 4] .stop 수식어로 버블링 차단 후 상세보기 -->
        <button class="detail-btn" @click.stop="showDetail(city.name, city.status)">상세보기</button>
      </div>
    </section>

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

.search-box,
.weather-list {
  margin-bottom: 20px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.search-box input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  margin-top: 6px;
}

.weather-card {
  position: relative;
  padding: 12px;
  margin-top: 10px;
  border: 1px solid #eee;
  border-radius: 6px;
  cursor: pointer;
}

.weather-card:hover {
  background-color: #f5f5f5;
}

.detail-btn {
  position: absolute;
  top: 12px;
  right: 12px;
}

.tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.85rem;
  margin: 6px 0;
}

.tag.hot {
  background-color: #ffe0e0;
  color: #d32f2f;
}

.tag.cool {
  background-color: #e0f0ff;
  color: #1976d2;
}

.status-bar {
  padding: 12px;
  background-color: #e8f5e9;
  border-radius: 6px;
  text-align: center;
}
</style>
