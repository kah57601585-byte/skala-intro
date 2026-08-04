<script setup>
// [요구사항] 선택된 도시 객체를 props로 전달받아 표시
defineProps({
  city: {
    type: Object,
    required: true,
  },
})

// [요구사항] 카드 선택(select-card)과 상세보기(click-detail)를 부모에게 전달
defineEmits(['select-card', 'click-detail'])
</script>

<template>
  <div class="weather-card" @click="$emit('select-card', city.name)">
    <h4>{{ city.name }} ({{ city.status }})</h4>
    <p>현재 기온: {{ city.temp }}°C</p>

    <!-- [요구사항 2] 기온에 따른 조건부 렌더링 -->
    <span v-if="city.temp >= 25" class="tag hot">🔥 더움 (25도 이상)</span>
    <span v-else class="tag cool">❄️ 선선함 (25도 미만)</span>

    <!-- [요구사항 4] .stop 수식어로 버블링 차단 후 상세보기 (도시 id 전달) -->
    <button class="detail-btn" @click.stop="$emit('click-detail', city.id)">상세보기</button>
  </div>
</template>

<style scoped>
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
</style>
