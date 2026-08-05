<script setup>
import { ref } from 'vue'

const inputText = ref('')
const selectValue = ref(null)
const switchValue = ref(true)
const sliderValue = ref(40)
const ratingValue = ref(3)
const radioValue = ref('celsius')
const checkboxValues = ref(['맑음'])
const dateValue = ref('')
const dialogVisible = ref(false)

const tableHeaders = [
  { title: '도시', key: 'name' },
  { title: '기온(℃)', key: 'temp' },
  { title: '상태', key: 'status' },
]
const tableData = [
  { name: '서울특별시', temp: 28, status: '맑음' },
  { name: '수원시', temp: 24, status: '비' },
  { name: '부산광역시', temp: 26, status: '구름' },
]

const snackbar = ref({ show: false, text: '', color: 'success' })
const showSnackbar = (text, color) => {
  snackbar.value = { show: true, text, color }
}
</script>

<template>
  <v-app class="demo-app">
    <div class="demo-page">
      <RouterLink to="/" class="back-link">← 대시보드로 돌아가기</RouterLink>
      <h1>Vuetify 컴포넌트 둘러보기</h1>
      <p class="intro">실제로 프로젝트에 적용 가능한 Vuetify 컴포넌트들을 한 화면에 모아뒀습니다.</p>

      <!-- 버튼 -->
      <section class="demo-section">
        <h2>Button</h2>
        <div class="row">
          <v-btn>기본</v-btn>
          <v-btn color="primary">Primary</v-btn>
          <v-btn color="success">Success</v-btn>
          <v-btn color="warning">Warning</v-btn>
          <v-btn color="error">Error</v-btn>
          <v-btn color="info">Info</v-btn>
        </div>
        <div class="row">
          <v-btn color="primary" variant="outlined">Outlined</v-btn>
          <v-btn color="primary" rounded="pill">Rounded</v-btn>
          <v-btn color="primary" icon="mdi-plus" />
          <v-btn color="primary" loading>불러오는 중</v-btn>
        </div>
      </section>

      <!-- 입력 폼 계열 -->
      <section class="demo-section">
        <h2>Form Controls</h2>
        <div class="form-grid">
          <v-text-field v-model="inputText" label="도시 이름 입력" clearable density="comfortable" />
          <v-select
            v-model="selectValue"
            :items="['서울특별시', '수원시', '부산광역시']"
            label="도시 선택"
            density="comfortable"
          />
          <v-text-field v-model="dateValue" type="date" label="날짜 선택" density="comfortable" />
          <v-switch v-model="switchValue" color="primary" label="단위 자동 변환" />
          <div class="form-item">
            <span class="form-label">Slider (습도 %)</span>
            <v-slider v-model="sliderValue" color="primary" thumb-label />
          </div>
          <div class="form-item">
            <span class="form-label">Rating</span>
            <v-rating v-model="ratingValue" color="warning" />
          </div>
          <div class="form-item">
            <span class="form-label">Radio</span>
            <v-radio-group v-model="radioValue" inline>
              <v-radio label="섭씨" value="celsius" />
              <v-radio label="화씨" value="fahrenheit" />
            </v-radio-group>
          </div>
          <div class="form-item">
            <span class="form-label">Checkbox</span>
            <div class="row">
              <v-checkbox v-model="checkboxValues" label="맑음" value="맑음" density="compact" hide-details />
              <v-checkbox v-model="checkboxValues" label="비" value="비" density="compact" hide-details />
              <v-checkbox v-model="checkboxValues" label="구름" value="구름" density="compact" hide-details />
            </div>
          </div>
        </div>
      </section>

      <!-- 칩 / 알림 / 프로그레스 -->
      <section class="demo-section">
        <h2>Chip / Alert / Progress</h2>
        <div class="row">
          <v-chip>기본</v-chip>
          <v-chip color="success">맑음</v-chip>
          <v-chip color="warning">구름많음</v-chip>
          <v-chip color="error">천둥번개</v-chip>
          <v-chip color="info">안개</v-chip>
        </div>
        <v-alert type="info" title="정보성 알림입니다" class="mt-3" />
        <v-alert type="success" title="성공했습니다" class="mt-2" />
        <v-alert type="warning" title="주의가 필요합니다" class="mt-2" />
        <v-progress-linear model-value="70" color="primary" height="8" class="mt-4" rounded />
        <v-progress-linear model-value="45" color="warning" height="8" class="mt-2" rounded />
      </section>

      <!-- 테이블 -->
      <section class="demo-section">
        <h2>Table</h2>
        <v-table>
          <thead>
            <tr>
              <th v-for="header in tableHeaders" :key="header.key">{{ header.title }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in tableData" :key="row.name">
              <td>{{ row.name }}</td>
              <td>{{ row.temp }}</td>
              <td>{{ row.status }}</td>
            </tr>
          </tbody>
        </v-table>
      </section>

      <!-- 다이얼로그 / 스낵바 -->
      <section class="demo-section">
        <h2>Dialog / Snackbar</h2>
        <div class="row">
          <v-btn color="primary" @click="dialogVisible = true">다이얼로그 열기</v-btn>
          <v-btn color="success" @click="showSnackbar('저장되었습니다.', 'success')">Success 스낵바</v-btn>
          <v-btn color="error" @click="showSnackbar('문제가 발생했습니다.', 'error')">Error 스낵바</v-btn>
          <v-btn color="warning" @click="showSnackbar('확인이 필요합니다.', 'warning')">Warning 스낵바</v-btn>
        </div>
        <v-dialog v-model="dialogVisible" max-width="360">
          <v-card title="도시 상세 정보">
            <v-card-text>서울특별시의 현재 날씨는 맑음, 기온은 28℃입니다.</v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn variant="text" @click="dialogVisible = false">닫기</v-btn>
              <v-btn color="primary" variant="text" @click="dialogVisible = false">확인</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="2500">
          {{ snackbar.text }}
        </v-snackbar>
      </section>

      <!-- 카드 -->
      <section class="demo-section">
        <h2>Card</h2>
        <div class="row">
          <v-card title="서울특별시" width="220">
            <v-card-text>
              <p>현재 기온: 28℃</p>
              <p>상태: 맑음</p>
            </v-card-text>
          </v-card>
          <v-card title="수원시" width="220">
            <v-card-text>
              <p>현재 기온: 24℃</p>
              <p>상태: 비</p>
            </v-card-text>
          </v-card>
        </div>
      </section>
    </div>
  </v-app>
</template>

<style scoped>
.demo-app {
  background: transparent !important;
}

.demo-page {
  max-width: 720px;
  margin: 0 auto;
  padding: 20px 20px 60px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 6px 14px;
  border-radius: 999px;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--primary);
  font-weight: 700;
  font-size: 0.85rem;
  text-decoration: none;
}

h1 {
  font-size: 1.6rem;
  margin: 0 0 8px;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.intro {
  color: var(--text-muted);
  margin: 0 0 24px;
}

.demo-section {
  margin-bottom: 32px;
  padding: 20px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.demo-section h2 {
  margin: 0 0 16px;
  font-size: 1.05rem;
  color: var(--text);
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 16px;
}

.form-item {
  display: flex;
  flex-direction: column;
}

.form-label {
  margin-bottom: 4px;
  font-size: 0.85rem;
  color: var(--text-muted);
}

@media (max-width: 560px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
