import { defineStore } from 'pinia'
import { weatherMockData } from '../data/weatherMockData'

// 대시보드에 표시되는 도시 목록을 전역으로 보관.
// WeatherHomeView는 상세 페이지로 이동했다가 돌아올 때마다 다시 mount되므로,
// 목록을 컴포넌트 로컬 상태로 두면 사용자가 추가/삭제한 내용이 초기화됨 -> 스토어로 유지.
export const useCityListStore = defineStore('cityList', {
  state: () => ({
    cities: weatherMockData.map((city) => ({ ...city })),
  }),
  actions: {
    addCity(city) {
      this.cities.unshift(city)
    },
    removeCity(cityId) {
      this.cities = this.cities.filter((city) => city.id !== cityId)
    },
  },
})
