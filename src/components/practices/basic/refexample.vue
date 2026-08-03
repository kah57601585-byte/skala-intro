<script setup>
import { ref, computed, watch, watchEffect } from 'vue';

const searchQuery = ref('');
const selectedCityInfo = ref(null);
const weatherList = ref([
    { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
    { id: 'city_02', name: '서울', temp: 28, status: '비' },
    { id: 'city_03', name: '부산', temp: 26, status: '구름' },
]);

const filteredWeatherList = computed(() => {
    if (!searchQuery.value) return weatherList.value;
    return weatherList.value.filter((city) => city.name.includes(searchQuery.value));
});

const selectCity = (city) => {
    selectedCityInfo.value = city;
};

watch(selectedCityInfo, (newCity) => {
    console.log('상태바 문구 변경 - 선택된 도시:', newCity);
});

watchEffect(() => {
    console.log('검색어 변경:', searchQuery.value);
});
</script>

<template>
<div class="weather mockup">
    <h1>과제 2:날씨 (컴포지션)</h1>
    <p class="status-bar">
        <span v-if="selectedCityInfo">
            선택된 도시: {{ selectedCityInfo.name }} ({{ selectedCityInfo.temp }}°C, {{ selectedCityInfo.status }})
        </span>
        <span v-else>도시를 선택해주세요</span>
    </p>
    <hr>
</div>
<section class="search-box">
    <label for="search">도시 검색:</label>
    <input type="text" id="search" v-model="searchQuery" placeholder="검색할 도시 이름 입력">
</section>

<section class="result-box">
    <ul v-if="filteredWeatherList.length > 0">
        <li v-for="city in filteredWeatherList" :key="city.id" @click="selectCity(city)">
            {{ city.name }} - {{ city.temp }}°C, {{ city.status }}
        </li>
    </ul>
    <p v-else>검색 결과와 일치하는 도시가 없습니다.</p>
</section>
</template>
