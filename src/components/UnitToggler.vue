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
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fff;
  cursor: pointer;
  font-size: 0.9rem;
}

.unit-toggler button:hover {
  background-color: #f0f0f0;
}
</style>
