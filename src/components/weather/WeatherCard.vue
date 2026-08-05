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

// 날씨 상태 → mdi 아이콘 매핑 (매핑에 없으면 구름 아이콘으로 대체)
const STATUS_ICON_MAP = {
  맑음: 'mdi-weather-sunny',
  구름조금: 'mdi-weather-partly-cloudy',
  구름: 'mdi-weather-cloudy',
  구름많음: 'mdi-weather-cloudy',
  흐림: 'mdi-weather-cloudy',
  비: 'mdi-weather-rainy',
  이슬비: 'mdi-weather-partly-rainy',
  눈: 'mdi-weather-snowy',
  안개: 'mdi-weather-fog',
  천둥번개: 'mdi-weather-lightning',
}
const weatherIcon = computed(() => STATUS_ICON_MAP[props.city.status] ?? 'mdi-weather-cloudy')

// [요구사항 2] 기온에 따른 색상 구분 (25도 이상이면 강조색)
const iconColor = computed(() => (props.city.temp >= 25 ? 'error' : 'primary'))
</script>

<template>
  <v-card class="weather-card" @click.stop="$emit('select-card', city)">
    <v-card-item :title="city.name">
      <template #subtitle>{{ city.status }}</template>
    </v-card-item>

    <v-card-text class="py-0">
      <v-row class="align-center" density="compact">
        <v-col cols="6" class="text-h4 font-weight-light">
          {{ displayTemp }}{{ configStore.unitSymbol }}
        </v-col>
        <v-col cols="6" class="text-right">
          <v-icon :color="iconColor" :icon="weatherIcon" size="56" />
        </v-col>
      </v-row>
    </v-card-text>

    <div class="d-flex py-2 justify-space-between">
      <v-list-item density="compact" prepend-icon="mdi-weather-windy">
        <v-list-item-subtitle>{{ city.windSpeed }} m/s</v-list-item-subtitle>
      </v-list-item>

      <v-list-item density="compact" prepend-icon="mdi-water-percent">
        <v-list-item-subtitle>{{ city.humidity }}%</v-list-item-subtitle>
      </v-list-item>
    </div>

    <v-divider />

    <v-card-actions>
      <v-btn variant="text" @click.stop="$emit('remove', city.id)">제거</v-btn>
      <v-spacer />
      <v-btn color="primary" variant="text" @click.stop="$emit('click-detail', city)">상세보기</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.weather-card {
  margin-top: 14px;
  background: var(--surface) !important;
  border: 1px solid var(--border);
  color: var(--text) !important;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    border-color 0.15s ease;
}

.weather-card:hover {
  transform: translateY(-3px) scale(1.01);
  box-shadow: var(--shadow-glow) !important;
  border-color: rgba(139, 124, 246, 0.45);
}

:deep(.v-card-item__content .v-card-subtitle) {
  color: var(--text-muted);
}

:deep(.v-list-item-subtitle) {
  color: var(--text-muted) !important;
  opacity: 1;
}
</style>
