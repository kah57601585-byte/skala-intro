<script setup>
import { computed } from 'vue'
import { useWeatherThemeStore } from '../stores/weatherThemeStore'

const weatherThemeStore = useWeatherThemeStore()

// 알려진 날씨 상태 → 배경 테마 클래스 매핑
const THEME_CLASS_MAP = {
  맑음: 'theme-clear',
  비: 'theme-rain',
  구름: 'theme-cloudy',
  흐림: 'theme-cloudy',
  눈: 'theme-snow',
  안개: 'theme-fog',
  천둥번개: 'theme-storm',
}

// 매핑에 없는 새로운 상태 문자열도 항상 같은 색으로 매핑되도록 해시로 색상 생성
const hashHue = (text) => {
  let hash = 0
  for (const char of text) {
    hash = (hash * 31 + char.charCodeAt(0)) % 360
  }
  return hash
}

const backdropClass = computed(() => {
  const status = weatherThemeStore.activeStatus
  if (!status) return ''
  return THEME_CLASS_MAP[status] ?? 'theme-custom'
})

const backdropStyle = computed(() => {
  const status = weatherThemeStore.activeStatus
  if (!status || THEME_CLASS_MAP[status]) return {}

  const hue = hashHue(status)
  return {
    '--custom-color-1': `hsl(${hue}, 75%, 55%)`,
    '--custom-color-2': `hsl(${(hue + 45) % 360}, 75%, 50%)`,
  }
})
</script>

<template>
  <div class="weather-backdrop" :class="backdropClass" :style="backdropStyle"></div>
</template>

<style scoped>
.weather-backdrop {
  position: fixed;
  inset: 0;
  z-index: -1;
  background: transparent;
  transition: background 0.6s ease;
}

/* 맑음: 따뜻한 햇살이 은은하게 퍼지는 느낌 */
.theme-clear {
  background:
    radial-gradient(circle at 50% -5%, rgba(250, 204, 21, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 82% 15%, rgba(251, 146, 60, 0.3) 0%, transparent 45%),
    linear-gradient(180deg, #201b0f 0%, #0f1117 55%);
  animation: sun-pulse 5s ease-in-out infinite;
}

/* 비: 진한 남색 바탕에 선명한 빗줄기 */
.theme-rain {
  background:
    radial-gradient(circle at 30% 10%, rgba(56, 189, 248, 0.22) 0%, transparent 55%),
    linear-gradient(180deg, #050b18 0%, #0a1020 100%),
    repeating-linear-gradient(
      115deg,
      rgba(125, 211, 252, 0.3) 0px,
      rgba(125, 211, 252, 0.3) 2px,
      transparent 2px,
      transparent 24px
    );
  animation: rain-fall 1.1s linear infinite;
}

/* 구름/흐림: 짙은 슬레이트 톤이 뭉게뭉게 뒤덮인 느낌 */
.theme-cloudy {
  background:
    radial-gradient(circle at 20% 15%, rgba(203, 213, 225, 0.32) 0%, transparent 55%),
    radial-gradient(circle at 78% 55%, rgba(100, 116, 139, 0.4) 0%, transparent 55%),
    radial-gradient(circle at 45% 85%, rgba(148, 163, 184, 0.28) 0%, transparent 55%),
    linear-gradient(180deg, #23262f 0%, #12141b 100%);
  animation: drift 12s ease-in-out infinite;
}

/* 눈: 차갑고 밝은 화이트 톤 */
.theme-snow {
  background:
    radial-gradient(circle at 50% 5%, rgba(224, 242, 254, 0.28) 0%, transparent 55%),
    radial-gradient(circle at 20% 70%, rgba(186, 230, 253, 0.16) 0%, transparent 50%),
    linear-gradient(180deg, #121b26 0%, #0f1117 100%);
}

/* 안개: 낮은 채도로 뿌옇게 퍼지는 느낌 */
.theme-fog {
  background:
    radial-gradient(circle at 50% 40%, rgba(203, 213, 225, 0.2) 0%, transparent 65%),
    linear-gradient(180deg, #15171d 0%, #0f1117 100%);
  animation: drift 14s ease-in-out infinite;
}

/* 천둥번개: 보라/노랑이 번쩍이는 느낌 */
.theme-storm {
  background:
    radial-gradient(circle at 30% 15%, rgba(250, 204, 21, 0.22) 0%, transparent 40%),
    radial-gradient(circle at 72% 60%, rgba(99, 102, 241, 0.35) 0%, transparent 55%),
    linear-gradient(180deg, #0d0f1a 0%, #0f1117 100%);
  animation: flash 3.2s ease-in-out infinite;
}

/* 맑음/비/구름/눈/안개/천둥번개 외 새로운 상태: 문자열 해시 기반 고유 색상 */
.theme-custom {
  background:
    radial-gradient(circle at 25% 10%, var(--custom-color-1) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, var(--custom-color-2) 0%, transparent 55%),
    linear-gradient(180deg, #12131b 0%, #0f1117 100%);
  opacity: 0.65;
}

@keyframes sun-pulse {
  0%,
  100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.12);
  }
}

@keyframes rain-fall {
  from {
    background-position:
      0 0,
      0 0;
  }
  to {
    background-position:
      0 0,
      -44px 44px;
  }
}

@keyframes drift {
  0%,
  100% {
    background-position:
      0 0,
      0 0,
      0 0,
      0 0;
  }
  50% {
    background-position:
      20px 10px,
      -20px -10px,
      10px 20px,
      0 0;
  }
}

@keyframes flash {
  0%,
  92%,
  100% {
    filter: brightness(1);
  }
  95% {
    filter: brightness(1.35);
  }
}
</style>
