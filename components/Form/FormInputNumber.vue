<template>
  <ValidationProvider
    v-slot="{ errors, valid, required }"
    :vid="vid"
    :name="$attrs.name || $attrs.label"
    :rules="rules"
    tag="div"
    class="form-input"
  >
    <FormLabel
      :errors="errors"
      :valid="init ? valid : false"
      :required="required"
      v-bind="$attrs"
    >
      <b-numberinput v-model="innerValue" v-bind="$attrs" />
    </FormLabel>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import FormLabel from '~/components/Form/FormLabel'

export default {
  name: 'FormInputNumber',
  components: {
    FormLabel,
    ValidationProvider,
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
    innerValue: 0,
    init: false,
  }),
  watch: {
    innerValue(newVal) {
      this.$emit('input', newVal)
      this.init = true
    },
    value(newVal) {
      this.innerValue = newVal
      this.init = true
    },
  },
  created() {
    if (this.value) {
      this.innerValue = this.value
    }
  },
  methods: {
    iconRightClick(event) {
      this.$emit('icon-right-click', event)
    },
  },
}
</script>
