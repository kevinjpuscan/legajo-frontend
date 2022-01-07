<template>
  <b-button
    :native-type="nativeType"
    :type="type"
    :size="size"
    :outlined="outlined"
    :icon-left="iconLeft"
    :icon-right="iconRight"
    :tag="tag"
    :to="to"
    :expanded="expanded"
    :disabled="disabled"
    @click="click"
    ><slot />
  </b-button>
</template>

<script>
export default {
  props: {
    nativeType: {
      type: String,
      default: 'button',
    },
    type: {
      type: String,
      default: 'is-primary',
    },
    size: {
      type: String,
      default: '',
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    iconLeft: {
      type: String,
      default: '',
    },
    iconRight: {
      type: String,
      default: '',
    },
    tag: {
      type: String,
      default: 'button',
    },
    to: {
      type: String,
      default: '',
    },
    expanded: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    click(event) {
      this.$emit('click', event)
    },
  },
}
</script>

<style scoped>
.button.is-text {
  text-decoration: none;
}
</style>
