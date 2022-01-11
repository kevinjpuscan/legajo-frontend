<template>
  <b-field
    :type="{ 'is-danger': errors[0], 'is-success': valid }"
    :message="errors"
  >
    <template #label>
      {{ label }}
    </template>
    <slot></slot>
  </b-field>
</template>

<script>
export default {
  name: 'FormLabel',
  props: {
    errors: {
      default: () => [],
      type: Array,
    },
    valid: {
      default: false,
      type: Boolean,
    },
    required: {
      default: false,
      type: Boolean,
    },
    label: {
      default: '',
      type: String,
    },
  },
}
</script>
