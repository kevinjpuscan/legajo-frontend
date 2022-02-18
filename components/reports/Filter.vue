<template>
  <div style="max-width: 300px">
    <b-field :label="label">
      <FilterOption
        v-if="type === 'DYNAMIC'"
        :options="options"
        @selected="selected"
      />
      <FilterEnum
        v-if="type === 'ENUM'"
        :options="options"
        @selected="selected"
      />
    </b-field>
  </div>
</template>

<script>
import FilterOption from '~/components/reports/FilterOption.vue'
import FilterEnum from '~/components/reports/FilterEnum.vue'
export default {
  components: {
    FilterOption,
    FilterEnum,
  },
  props: {
    type: {
      type: String,
      default: 'STATIC',
    },
    label: {
      type: String,
      default: '',
    },
    optionsEnum: {
      type: Array,
      default: () => [],
    },
    param: {
      type: String,
      default: '',
    },
    query: {
      type: String,
      default: '',
    },
  },
  async fetch() {
    if (this.type === 'DYNAMIC') {
      const options = await this.fetchOptions()
      const optionsFormated = this.formatSelectedDynamic(options)
      this.$emit('selected', { param: this.param, value: optionsFormated })
      this.options = options
      this.optionsFormated = optionsFormated
    }

    if (this.type === 'ENUM') {
      const options = this.optionsEnum
      const optionsFormated = this.formatSelectedEnum(options)
      this.$emit('selected', { param: this.param, value: optionsFormated })
      this.options = options
      this.optionsFormated = optionsFormated
    }
  },
  data: () => ({
    options: [],
    optionsFormated: '',
  }),
  methods: {
    selected(value) {
      if (!value || value.length === 0) {
        this.$emit('selected', {
          param: this.param,
          value: this.optionsFormated,
        })
      } else {
        this.$emit('selected', { param: this.param, value })
      }
    },
    fetchOptions() {
      return this.$repository.report.getFilterOptions({ query: this.query })
    },
    formatSelectedEnum(options) {
      return options.reduce((acc, curr) => {
        acc = acc !== '' ? `${acc},'${curr}'` : `'${curr}'`
        return acc
      }, '')
    },
    formatSelectedDynamic(options) {
      return options.reduce((acc, curr) => {
        acc = acc !== '' ? `${acc},${curr.id}` : curr.id
        return acc
      }, '')
    },
  },
}
</script>
