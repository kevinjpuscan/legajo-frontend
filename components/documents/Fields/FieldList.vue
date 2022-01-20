<template>
  <div class="field-list">
    <div class="field-list_label">
      <h3>{{ label }}:</h3>
    </div>
    <div class="field-list_value">
      <ul>
        <li v-for="(value, index) in values" :key="index">{{ value }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    values: { type: Array, default: () => [] },
  },
}
</script>

<style lang="scss" scoped>
.field-list {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 1rem 0;
  .field-list_label {
    h3 {
      font-size: 1.2rem;
      font-weight: bold;
    }
  }
}
</style>
