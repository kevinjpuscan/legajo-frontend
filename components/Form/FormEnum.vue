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
      <b-select v-model="innerValue">
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </b-select>
    </FormLabel>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import FormLabel from '~/components/Form/FormLabel'

export default {
  name: 'FormInput',
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
    options: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    innerValue: '',
    init: false,
  }),
  watch: {
    innerValue(newVal) {
      this.$emit('change', newVal)
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
