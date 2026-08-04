import { defineStore } from 'pinia'

// 도시 카드를 선택했을 때, 그 도시의 날씨 상태(status)에 맞춰
// 페이지 배경 테마를 바꾸기 위한 상태를 관리하는 스토어
export const useWeatherThemeStore = defineStore('weatherTheme', {
  state: () => ({
    // null이면 기본(다크) 배경
    activeStatus: null,
  }),
  actions: {
    setStatus(status) {
      this.activeStatus = status
    },
    resetStatus() {
      this.activeStatus = null
    },
  },
})
