<template>
  <ValidationProvider
    v-slot="{ errors, valid, required }"
    ref="provider"
    :vid="vid"
    :name="$attrs.name || $props.labelField"
    :rules="rules"
    tag="div"
    class="form-select"
  >
    <FormLabel
      :errors="errors"
      :valid="valid"
      :required="required"
      v-bind="$attrs"
      :label="$props.labelField"
    >
      <multiselect
        ref="multiselect"
        v-model="innerValue"
        :class="{ 'is-danger': errors[0], 'is-success': valid }"
        :select-label="$t('misc.form.selectOption')"
        :deselect-label="$t('misc.form.deselectOption')"
        v-bind="$attrs"
        @search-change="onSearch"
        @tag="onTag"
        @focus.prevent="focusPrevent"
        @open="onOpen"
        @close="onClose"
      >
        <span slot="noOptions">No se encontraron opciones.</span>
        <slot slot="noResult" name="noResult">
          <span>No hay resultados.</span>
        </slot>
      </multiselect>
    </FormLabel>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import Multiselect from 'vue-multiselect'
import FormLabel from '@/components/Form/FormLabel'
export default {
  name: 'FormSelect',
  components: {
    FormLabel,
    ValidationProvider,
    Multiselect,
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
    labelField: {
      type: String,
      default: '',
    },
    focusPrevent: {
      type: Function,
      default: () => {},
    },
  },
  data: () => ({
    innerValue: '',
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
  mounted() {},
  methods: {
    onOpen() {
      this.$emit('open')
    },
    onClose() {
      this.$emit('close')
    },
    deactivate() {
      this.$refs.multiselect.deactivate()
      this.$refs.provider.validate()
    },
    onSearch(q) {
      this.$emit('search-change', q)
    },
    onTag(value) {
      this.$emit('tag', value)
    },
  },
}
</script>
