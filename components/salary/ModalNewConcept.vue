<template>
  <div>
    <b-modal
      v-model="active"
      :width="600"
      :can-cancel="['escape', 'outside']"
      @close="close"
    >
      <ValidationObserver v-slot="{ handleSubmit, invalid }" tag="form" slim>
        <ModalWithTitleBar title="Agregar Concepto" :close="close">
          <Wrapper type="sm">
            <form style="padding: 3rem 0">
              <FormInput
                v-model="form.concept"
                rules="required"
                type="text"
                label="Concepto:"
                placeholder="Concepto"
              />

              <FormInput
                v-model="form.amount"
                rules="required"
                type="number"
                label="Monto:"
                placeholder="1000.00"
              />
              <FormDatePicker
                v-model="form.date_start"
                rules="required"
                label="Fecha de inicio:"
                locale="es"
                placeholder="Ej. 20/02/1990"
                icon="calendar-today"
                trap-focus
                editable
              />
            </form>
          </Wrapper>
          <template #footer>
            <div class="is-justify-content-flex-end">
              <Button type="is-text" rounded @click="close"> Cancelar </Button>
              <Button
                type="is-primary"
                rounded
                :disabled="invalid"
                @click="handleSubmit(submit)"
              >
                Guardar
              </Button>
            </div>
          </template>
        </ModalWithTitleBar>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import ModalWithTitleBar from '~/components/shared/ModalWithTitleBar.vue'
import Wrapper from '~/components/containers/Wrapper.vue'
import Button from '~/components/shared/Button.vue'

export default {
  components: {
    ModalWithTitleBar,
    Wrapper,
    Button,
    ValidationObserver,
  },
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    selected: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: {
        concept: '',
        amount: null,
        date_start: new Date(),
      },
      active: this.value,
      confirmedModal: false,
      isLoading: false,
    }
  },
  watch: {
    value() {
      this.active = this.value
      this.form = { concepto: '', amount: null, date_start: new Date() }
    },
  },
  methods: {
    close() {
      this.active = !this.active
      this.$emit('close')
    },
    submit() {
      this.$emit('submit', this.form)
    },
  },
}
</script>
