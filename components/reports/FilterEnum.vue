<template>
  <div>
    <div class="block">
      <b-checkbox
        v-for="(option, idx) in options"
        :key="idx"
        v-model="selected"
        :native-value="option"
      >
        {{ option }}
      </b-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    selected: [],
  }),
  watch: {
    selected(val) {
      this.$emit('selected', this.formatSelectedEnum(val))
    },
  },
  methods: {
    formatSelectedEnum(options) {
      return options.reduce((acc, curr) => {
        acc = acc !== '' ? `${acc},'${curr}'` : `'${curr}'`
        return acc
      }, '')
    },
  },
}
</script>
