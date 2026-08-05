<script setup>
import { computed } from 'vue'
import { useConfigStore } from '../../stores/configStore'

// [요구사항] 선택된 도시 객체를 props로 전달받아 표시
const props = defineProps({
  city: {
    type: Object,
    required: true,
  },
})

// [요구사항] 카드 선택(select-card), 상세보기(click-detail), 목록 제거(remove)를 부모에게 전달
defineEmits(['select-card', 'click-detail', 'remove'])

const configStore = useConfigStore()

// [Pinia 과제] 단위 설정에 맞춰 기온 변환
const displayTemp = computed(() => {
  const rawTemp = props.city.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})
</script>

<template>
  <div class="weather-card" @click.stop="$emit('select-card', city)">
    <h4>{{ city.name }} ({{ city.status }})</h4>
    <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>

    <!-- [요구사항 2] 기온에 따른 조건부 렌더링 -->
    <span v-if="city.temp >= 25" class="tag hot">🔥 더움 (25도 이상)</span>
    <span v-else class="tag cool">❄️ 선선함 (25도 미만)</span>

    <div class="card-actions">
      <!-- 목록에서 제거 -->
      <button class="remove-btn" title="목록에서 제거" @click.stop="$emit('remove', city.id)">✕</button>
      <!-- [요구사항 4] .stop 수식어로 버블링 차단 후 상세보기 (도시 객체 전달) -->
      <button class="detail-btn" @click.stop="$emit('click-detail', city)">상세보기</button>
    </div>
  </div>
</template>

<style scoped>
.weather-card {
  position: relative;
  overflow: hidden;
  padding: 18px 18px 18px 26px;
  margin-top: 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    border-color 0.15s ease;
}

.weather-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 6px;
  background: var(--gradient-cool);
}

.weather-card:has(.tag.hot)::before {
  background: var(--gradient-warm);
}

.weather-card:hover {
  transform: translateY(-3px) scale(1.01);
  box-shadow: var(--shadow-glow);
  border-color: rgba(139, 124, 246, 0.45);
}

.weather-card h4 {
  margin: 0 0 6px;
  font-size: 1.05rem;
  color: var(--text);
}

.weather-card p {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.95rem;
}

.card-actions {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.detail-btn {
  padding: 6px 14px;
  border: none;
  border-radius: 999px;
  background: var(--gradient-primary);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(139, 124, 246, 0.35);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.detail-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(139, 124, 246, 0.45);
}

.remove-btn {
  width: 26px;
  height: 26px;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--text-muted);
  font-size: 0.75rem;
  line-height: 1;
  cursor: pointer;
  transition: all 0.15s ease;
}

.remove-btn:hover {
  background: #3a1418;
  border-color: #f87171;
  color: #f87171;
}

.tag {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
  margin: 10px 0 0;
  color: #fff;
}

.tag.hot {
  background: var(--gradient-warm);
}

.tag.cool {
  background: var(--gradient-cool);
}
</style>
