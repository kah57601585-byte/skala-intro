<script setup>
import { useConfigStore } from '../stores/configStore'

const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler">
    <button type="button" title="클릭 시 단위 전환" @click="configStore.toggleUnit()">
      현재 단위: {{ configStore.unitSymbol }}
    </button>
  </div>
</template>

<style scoped>
.unit-toggler button {
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background-color: var(--surface);
  color: var(--text);
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.unit-toggler button:hover {
  background-color: #f1f4fd;
  border-color: var(--primary);
  color: var(--primary);
}
</style>
