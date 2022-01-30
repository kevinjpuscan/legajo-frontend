<template>
  <div>
    <FormInput
      v-if="type === FIELD_TYPES.TEXT"
      v-model="value"
      type="text"
      :label="`${label}:`"
      :placeholder="label"
    />
    <FormInput
      v-if="type === FIELD_TYPES.NUMBER"
      v-model="value"
      rules="numeric"
      type="text"
      :label="`${label}:`"
      :placeholder="label"
    />
    <FormDatePicker
      v-if="type === FIELD_TYPES.DATE"
      v-model="value"
      :label="`${label}:`"
    />

    <FormEnum
      v-if="type === FIELD_TYPES.ENUM"
      :value="value || options[0]"
      :label="`${label}:`"
      :options="options"
      @change="change"
    />

    <FormList
      v-if="type === FIELD_TYPES.LIST"
      :value="value || []"
      :label="`${label}:`"
      @change="change"
    />
    <div v-if="!FIELD_TYPES[type]">
      {{ `${field} | ${type}` }}
    </div>
  </div>
</template>

<script>
import FormInput from '~/components/Form/FormInput'
import FormDatePicker from '~/components/Form/FormDatePicker.vue'
import FIELD_TYPES from '~/constants/fieldTypes'
import FormEnum from '~/components/Form/FormEnum.vue'
import FormList from '~/components/Form/FormList.vue'
export default {
  components: {
    FormInput,
    FormDatePicker,
    FormEnum,
    FormList,
  },
  props: {
    type: {
      type: String,
      default: FIELD_TYPES.TEXT,
    },
    field: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    preValue: {
      type: [String, Object, Array, Number],
      default: () => '',
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      FIELD_TYPES,
      value: this.preValue,
    }
  },
  watch: {
    value(newValue) {
      this.$emit('change', { field: this.field, value: newValue })
    },
  },
  methods: {
    optionsFormat(options) {
      return options.map((option, index) => ({ id: index, value: option }))
    },
    change(newValue) {
      this.$emit('change', { field: this.field, value: newValue })
    },
  },
}
</script>
