// 대한민국의 모든 '시' 단위 도시(정식 행정구역명). 한글 이름으로 검색해
// OpenWeatherMap 조회에 쓸 조회 키(english)를 찾기 위한 사전.
// english는 대부분 영문 도시명이지만, OpenWeatherMap 도시명 DB에 없는 일부 도시는
// 'coord:위도,경도' 형식의 좌표 조회 키를 사용함(fetchWeatherByQuery가 이를 구분해 처리).
// 참고: 경기도 광주시와 광주광역시는 로마자 표기가 동일(Gwangju)해 API 상 구분되지 않을 수 있음.
export const koreanCities = [
  // 특별시 / 광역시 / 특별자치시
  { name: '서울특별시', english: 'Seoul,KR' },
  { name: '부산광역시', english: 'Busan,KR' },
  { name: '대구광역시', english: 'Daegu,KR' },
  { name: '인천광역시', english: 'Incheon,KR' },
  { name: '광주광역시', english: 'Gwangju,KR' },
  { name: '대전광역시', english: 'Daejeon,KR' },
  { name: '울산광역시', english: 'Ulsan,KR' },
  { name: '세종특별자치시', english: 'Sejong,KR' },

  // 경기도
  { name: '수원시', english: 'Suwon,KR' },
  { name: '성남시', english: 'Seongnam,KR' },
  { name: '의정부시', english: 'Uijeongbu-si,KR' },
  { name: '안양시', english: 'Anyang,KR' },
  { name: '부천시', english: 'Bucheon,KR' },
  { name: '광명시', english: 'Gwangmyeong-si,KR' },
  { name: '평택시', english: 'Pyeongtaek,KR' },
  { name: '동두천시', english: 'Dongducheon-si,KR' },
  { name: '안산시', english: 'Ansan,KR' },
  { name: '고양시', english: 'Goyang,KR' },
  { name: '과천시', english: 'Gwacheon,KR' },
  { name: '구리시', english: 'Guri-si,KR' },
  { name: '남양주시', english: 'Namyangju,KR' },
  { name: '오산시', english: 'Osan,KR' },
  { name: '시흥시', english: 'Siheung-si,KR' },
  { name: '군포시', english: 'Gunpo,KR' },
  { name: '의왕시', english: 'Uiwang,KR' },
  { name: '하남시', english: 'Hanam,KR' },
  { name: '용인시', english: 'Yongin,KR' },
  { name: '파주시', english: 'Paju,KR' },
  { name: '이천시', english: 'Icheon-si,KR' },
  { name: '안성시', english: 'Anseong,KR' },
  { name: '김포시', english: 'Gimpo-si,KR' },
  { name: '화성시', english: 'Hwaseong,KR' },
  { name: '광주시(경기도)', english: 'Gwangju,KR' },
  { name: '양주시', english: 'Yangju,KR' },
  { name: '포천시', english: 'Pocheon-si,KR' },
  { name: '여주시', english: 'Yeoju,KR' },

  // 강원특별자치도
  { name: '춘천시', english: 'Chuncheon,KR' },
  { name: '원주시', english: 'Wonju,KR' },
  { name: '강릉시', english: 'Gangneung,KR' },
  { name: '동해시', english: 'Donghae-si,KR' },
  { name: '태백시', english: 'Taebaek,KR' },
  { name: '속초시', english: 'Sokcho,KR' },
  { name: '삼척시', english: 'Samcheok,KR' },

  // 충청북도
  { name: '청주시', english: 'Cheongju,KR' },
  { name: '충주시', english: 'Chungju,KR' },
  { name: '제천시', english: 'Jecheon,KR' },

  // 충청남도
  { name: '천안시', english: 'Cheonan,KR' },
  { name: '공주시', english: 'Gongju,KR' },
  { name: '보령시', english: 'Boryeong,KR' },
  { name: '아산시', english: 'Asan,KR' },
  { name: '서산시', english: 'Seosan,KR' },
  { name: '논산시', english: 'Nonsan,KR' },
  { name: '계룡시', english: 'Gyeryong-si,KR' },
  { name: '당진시', english: 'Tangjin,KR' },

  // 전북특별자치도
  { name: '전주시', english: 'Jeonju,KR' },
  { name: '군산시', english: 'Gunsan,KR' },
  { name: '익산시', english: 'Iksan,KR' },
  { name: '정읍시', english: 'Jeongeup,KR' },
  { name: '남원시', english: 'Namwon,KR' },
  { name: '김제시', english: 'Gimje,KR' },

  // 전라남도
  { name: '목포시', english: 'Mokpo,KR' },
  { name: '여수시', english: 'Yeosu,KR' },
  { name: '순천시', english: 'Suncheon,KR' },
  { name: '나주시', english: 'Naju,KR' },
  { name: '광양시', english: 'Gwangyang,KR' },

  // 경상북도
  { name: '포항시', english: 'Pohang,KR' },
  { name: '경주시', english: 'Gyeongju,KR' },
  { name: '김천시', english: 'Gimcheon,KR' },
  { name: '안동시', english: 'Andong,KR' },
  { name: '구미시', english: 'Gumi,KR' },
  { name: '영주시', english: 'Yeongju,KR' },
  // 영천시: 이름 조회가 DB에 없어 좌표로 조회
  { name: '영천시', english: 'coord:35.9733,128.9386' },
  { name: '상주시', english: 'Sangju,KR' },
  { name: '문경시', english: 'Mungyeong,KR' },
  { name: '경산시', english: 'Gyeongsan,KR' },

  // 경상남도
  { name: '창원시', english: 'Changwon,KR' },
  { name: '진주시', english: 'Jinju,KR' },
  // 통영시: 이름 조회가 DB에 없어 좌표로 조회
  { name: '통영시', english: 'coord:34.8544,128.4331' },
  { name: '사천시', english: 'Sacheon,KR' },
  { name: '김해시', english: 'Gimhae,KR' },
  { name: '밀양시', english: 'Miryang,KR' },
  { name: '거제시', english: 'Koje,KR' },
  { name: '양산시', english: 'Yangsan,KR' },

  // 제주특별자치도
  { name: '제주시', english: 'Jeju,KR' },
  // 서귀포시: 이름 조회가 DB에 없어 좌표로 조회
  { name: '서귀포시', english: 'coord:33.2541,126.5601' },
]

// 한글 도시명(정확히 일치 우선, 없으면 부분 일치)으로 사전에서 찾기
export const findKoreanCity = (query) => {
  const trimmed = query.trim()
  if (!trimmed) return null
  return (
    koreanCities.find((city) => city.name === trimmed) ??
    koreanCities.find((city) => city.name.includes(trimmed)) ??
    null
  )
}
