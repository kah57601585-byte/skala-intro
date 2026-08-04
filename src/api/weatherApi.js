import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

const client = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric',
    lang: 'kr',
  },
})

// OpenWeatherMap 응답을 이 앱에서 쓰는 도시 날씨 형태로 변환
// name: API가 인식한 도시 표시명 (직접 검색한 도시의 이름을 표시할 때 사용, 지정된 mock 도시명은 덮어쓰지 않음)
const normalizeWeatherResponse = (data) => ({
  name: data.name,
  temp: Math.round(data.main.temp),
  status: data.weather[0]?.description ?? '알 수 없음',
  humidity: data.main.humidity,
  windSpeed: data.wind.speed,
  feelsLike: Math.round(data.main.feels_like),
})

// (Build-in API) 도시 영문명으로 실시간 날씨 조회. 예: fetchWeatherByCityName('Seoul,KR')
export const fetchWeatherByCityName = async (englishName) => {
  const { data } = await client.get('', { params: { q: englishName } })
  return normalizeWeatherResponse(data)
}

// (Geocoding 기반) 위도/경도로 실시간 날씨 조회
export const fetchWeatherByCoords = async (lat, lon) => {
  const { data } = await client.get('', { params: { lat, lon } })
  return normalizeWeatherResponse(data)
}
