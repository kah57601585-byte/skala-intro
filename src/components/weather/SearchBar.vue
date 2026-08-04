<script setup>
// [요구사항] 부모로부터 검색어를 props로 전달받아 표시
defineProps({
  query: {
    type: String,
    default: '',
  },
})

// [요구사항] 검색 시 update-query 이벤트로 검색어를 부모에게 전달
defineEmits(['update-query'])
</script>

<template>
  <label>🔍 도시 검색</label>
  <input
    type="text"
    :value="query"
    @input="$emit('update-query', $event.target.value)"
    placeholder="검색할 도시 이름 입력"
  />
  <p>검색 중인 도시: {{ query }}</p>
</template>

<style scoped>
input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  margin-top: 6px;
}
</style>
