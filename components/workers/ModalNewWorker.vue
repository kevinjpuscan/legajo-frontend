<template>
  <div>
    <b-modal
      v-model="active"
      :width="600"
      :can-cancel="['escape', 'outside']"
      @close="close"
    >
      <ValidationObserver v-slot="{ handleSubmit, invalid }" tag="form" slim>
        <ModalWithTitleBar title="Nuevo Servidor Público" :close="close">
          <Wrapper type="sm">
            <form style="padding: 3rem 0">
              <FormInput
                v-model="form.identification_number"
                rules="required|verifyDni"
                type="text"
                label="DNI:"
                placeholder="Ingrese DNI"
              />
              <FormInput
                v-model="form.first_names"
                rules="required"
                type="text"
                label="Nombres:"
                placeholder="Ingrese Nombres"
              />
              <FormInput
                v-model="form.last_names"
                rules="required"
                type="text"
                label="Apellidos:"
                placeholder="Ingrese Apellidos"
              />
              <FormInput
                v-model="form.ruc"
                rules="required"
                type="text"
                label="RUC:"
                placeholder="Ingrese RUC"
              />
              <FormEnum
                v-model="form.sex"
                label="Sexo:"
                :options="['Masculino', 'Femenino']"
                @change="(val) => (form.sex = val)"
              />
              <FormDatePicker
                v-model="form.birth_date"
                rules="required"
                label="Fecha Nacimiento:"
                locale="es"
                placeholder="Ej. 20/02/1990"
                icon="calendar-today"
                :max-date="new Date()"
                editable
              />
              <FormList
                v-model="form.languages"
                :options="languageOptions"
                label="Idiomas:"
                @change="(val) => (form.languages = val)"
                @typing="filterLanguages"
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
import FormInput from '~/components/Form/FormInput'
import FormDatePicker from '~/components/Form/FormDatePicker'
import FormList from '~/components/Form/FormList.vue'

export default {
  components: {
    ModalWithTitleBar,
    Wrapper,
    Button,
    FormInput,
    FormDatePicker,
    ValidationObserver,
    FormList,
  },
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    worker: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: {
        identification_number: '',
        last_names: '',
        first_names: '',
        birth_date: '',
        ruc: '',
        sex: '',
        languages: [],
      },
      active: this.value,
      confirmedModal: false,
      isLoading: false,
      languages: ['Español', 'Inglés', 'Frances'],
      languageOptions: [],
    }
  },
  watch: {
    value() {
      this.active = this.value
      this.form = {
        ...this.worker,
        birth_date: new Date(this.worker.birth_date),
      }
    },
  },
  methods: {
    close() {
      this.active = !this.active
      this.$emit('close')
      this.form = {}
    },
    submit() {
      this.$emit('submit', this.form)
    },
    filterLanguages(val) {
      this.languageOptions = this.languages.filter((language) =>
        language.toString().toLowerCase().includes(val.toLowerCase())
      )
    },
  },
}
</script>
