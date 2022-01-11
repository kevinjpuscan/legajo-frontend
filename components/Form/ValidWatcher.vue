<template>
  <div></div>
</template>

<script>
export default {
  props: {
    valid: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    valid: {
      immediate: true,
      handler() {
        this.$emit('change', this.valid)
      },
    },
  },
}
</script>
