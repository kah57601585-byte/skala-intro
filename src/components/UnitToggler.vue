<script setup>
import { useConfigStore } from '../stores/configStore'

const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler">
    <button
      type="button"
      title="클릭 시 단위 전환"
      @click="configStore.toggleUnit()"
    >
      현재 단위: {{ configStore.unitSymbol }}
    </button>
  </div>
</template>

<style scoped>
.unit-toggler button {
  padding: 8px 18px;
  border: none;
  border-radius: 999px;
  background: var(--gradient-primary);
  color: #fff;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 700;
  box-shadow: 0 4px 14px rgba(139, 124, 246, 0.32);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.unit-toggler button:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(139, 124, 246, 0.42);
}
</style>
