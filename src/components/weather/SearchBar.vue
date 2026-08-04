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
label {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text);
}

input {
  width: 100%;
  padding: 10px 14px;
  box-sizing: border-box;
  margin-top: 8px;
  background: var(--bg);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

input::placeholder {
  color: var(--text-muted);
}

input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(139, 124, 246, 0.25);
}

p {
  margin-top: 8px;
  margin-bottom: 0;
  color: var(--text-muted);
  font-size: 0.85rem;
}
</style>
