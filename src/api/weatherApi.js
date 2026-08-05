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

// OpenWeatherMap의 날씨 상태 코드(id)를 기상청에서 쓰는 표준 한글 용어로 변환.
// (API 기본 kr 번역은 "온흐림", "튼구름"처럼 낯선 직역 표현이라 직접 매핑함)
// 참고: https://openweathermap.org/weather-conditions
const translateWeatherId = (id) => {
  if (id === 800) return '맑음'
  if (id === 801) return '구름조금'
  if (id === 802 || id === 803) return '구름많음'
  if (id === 804) return '흐림'
  if (id >= 200 && id < 300) return '천둥번개'
  if (id >= 300 && id < 400) return '이슬비'
  if (id >= 500 && id < 600) return '비'
  if (id >= 600 && id < 700) return '눈'
  if (id >= 700 && id < 800) return '안개'
  return null
}

// OpenWeatherMap 응답을 이 앱에서 쓰는 도시 날씨 형태로 변환
// name: API가 인식한 도시 표시명 (직접 검색한 도시의 이름을 표시할 때 사용, 지정된 mock 도시명은 덮어쓰지 않음)
const normalizeWeatherResponse = (data) => ({
  name: data.name,
  temp: Math.round(data.main.temp),
  status: translateWeatherId(data.weather[0]?.id) ?? data.weather[0]?.description ?? '알 수 없음',
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

// 도시 조회 키(query)로 실시간 날씨 조회.
// 'coord:위도,경도' 형식이면 좌표 기반, 그 외에는 영문 도시명 기반으로 조회함.
// (일부 도시는 OpenWeatherMap 도시명 DB에 등록되어 있지 않아 좌표로만 조회 가능함)
export const fetchWeatherByQuery = async (query) => {
  if (query.startsWith('coord:')) {
    const [lat, lon] = query.slice('coord:'.length).split(',').map(Number)
    return fetchWeatherByCoords(lat, lon)
  }
  return fetchWeatherByCityName(query)
}
