import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
  state: () => ({
    // 단위를 저장하는 변수 (초기값: celsius)
    unit: 'celsius',
  }),
  getters: {
    // 현재 단위 상태에 맞는 기호 (℃ / ℉)
    unitSymbol: (state) => (state.unit === 'celsius' ? '℃' : '℉'),
  },
  actions: {
    // 'celsius'와 'fahrenheit'를 토글(스위칭)
    toggleUnit() {
      this.unit = this.unit === 'celsius' ? 'fahrenheit' : 'celsius'
    },
  },
})
