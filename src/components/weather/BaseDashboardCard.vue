<template>
  <section class="dashboard-card">
    <slot></slot>
  </section>
</template>

<style scoped>
.dashboard-card {
  margin-bottom: 20px;
  padding: 22px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}
</style>
