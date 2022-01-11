<template>
  <ValidationProvider
    v-slot="{ errors, valid, required }"
    :vid="vid"
    :name="$attrs.name || $attrs.label"
    :rules="rules"
    tag="div"
    class="form-datepicker"
  >
    <FormLabel
      :errors="errors"
      :valid="valid"
      :required="required"
      v-bind="$attrs"
    >
      <b-datepicker
        v-model="innerValue"
        icon="calendar-today"
        v-bind="$attrs"
      />
    </FormLabel>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import FormLabel from '@/components/Form/FormLabel'

export default {
  name: 'FormDatePicker',
  components: {
    ValidationProvider,
    FormLabel,
  },
  props: {
    vid: {
      type: String,
      default: '',
    },
    rules: {
      type: [Object, String],
      default: '',
    },
    value: {
      type: null,
      default: null,
    },
  },
  data: () => ({
    innerValue: null,
  }),
  watch: {
    innerValue(newVal) {
      this.$emit('input', newVal)
    },
    value(newVal) {
      this.innerValue = newVal
    },
  },
  created() {
    if (this.value) {
      this.innerValue = this.value
    }
  },
}
</script>
