// [요구사항] 도시별 상세 기상관측 정보를 포함한 Mock 데이터
export const weatherMockData = [
  {
    id: 'city_01',
    name: '서울',
    temp: 28,
    status: '맑음',
    humidity: 55,
    windSpeed: 3.2,
    precipitationProb: 10,
    description: '맑고 화창한 날씨가 이어지고 있습니다. 자외선 지수가 높으니 외출 시 주의하세요.',
  },
  {
    id: 'city_02',
    name: '수원',
    temp: 24,
    status: '비',
    humidity: 82,
    windSpeed: 5.4,
    precipitationProb: 90,
    description: '오전부터 시작된 비가 오후까지 이어질 예정입니다. 우산을 꼭 챙기세요.',
  },
  {
    id: 'city_03',
    name: '부산',
    temp: 26,
    status: '구름',
    humidity: 68,
    windSpeed: 4.1,
    precipitationProb: 30,
    description: '구름이 많이 낀 흐린 날씨이며, 간간이 해가 비칠 것으로 보입니다.',
  },
]
