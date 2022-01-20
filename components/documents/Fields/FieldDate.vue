<template>
  <div class="field-date">
    <div class="field-date_label">
      <h3>{{ label }}:</h3>
    </div>
    <div class="field-date_value">
      <span>{{ value }}</span>
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
    value: { type: String, default: '' },
  },
}
</script>

<style lang="scss" scoped>
.field-date {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 1rem 0;
  .field-date_label {
    h3 {
      font-size: 1.2rem;
      font-weight: bold;
    }
  }
}
</style>
