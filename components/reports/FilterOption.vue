<template>
  <div>
    <b-autocomplete
      v-model="param"
      placeholder="Elige una opción"
      :open-on-focus="true"
      :data="filteredData"
      field="label"
      :clearable="true"
      @select="(option) => (selected = option)"
    >
    </b-autocomplete>
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
    param: '',
    selected: null,
  }),
  computed: {
    filteredData() {
      return this.options.filter((option) => {
        return option.label
          .toString()
          .toLowerCase()
          .includes(this.param.toLowerCase())
      })
    },
  },
  watch: {
    selected(val) {
      if (!val) {
        this.$emit('selected', val)
      } else {
        this.$emit('selected', val.id)
      }
    },
  },
}
</script>
