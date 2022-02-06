<template>
  <div>
    <b-field :label="label">
      <label>{{ value }}</label>
    </b-field>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
}
</script>
