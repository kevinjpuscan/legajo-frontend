<template>
  <div>
    <b-modal
      v-model="active"
      :width="600"
      :can-cancel="['escape', 'outside']"
      @close="close"
    >
      <ValidationObserver v-slot="{ handleSubmit, invalid }" tag="form" slim>
        <ModalWithTitleBar
          :title="form.id ? 'Editar licencia' : 'Registrar licencia'"
          :close="close"
        >
          <Wrapper type="sm">
            <form style="padding: 3rem 0">
              <FormEnum
                v-model="form.type"
                label="Tipo:"
                :options="['LICENCIA', 'PERMISO', 'VACACIONES']"
                @change="(val) => (form.type = val)"
              />
              <FormSelect
                label="Servidor Público:"
                place-holder="Buscar por nombre, apellido o DNI"
                :data="workers"
                :is-loading="isLoadingFetchWorkers"
                :value="form.workerTitle"
                @typing="fetchWorkers"
                @selected="(worker) => (selectedWorker = worker)"
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
              <FormDatePicker
                v-model="form.date_end"
                rules="required"
                label="Fecha de fin:"
                locale="es"
                placeholder="Ej. 20/02/1990"
                icon="calendar-today"
                :min-date="form.date_start"
                trap-focus
                editable
              />
              <FormEnum
                v-model="form.status"
                label="Tipo:"
                :options="['EN_CURSO', 'PENDIENTE', 'FINALIZADA', 'CANCELADA']"
                @change="(val) => (form.status = val)"
              />
            </form>
          </Wrapper>
          <template #footer>
            <div class="is-justify-content-flex-end">
              <Button type="is-text" rounded @click="handleClose">
                {{ form.id ? 'Eliminar licencia' : 'Cancelar' }}
              </Button>
              <Button
                type="is-primary"
                rounded
                :disabled="invalid || !form.worker"
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
import FormDatePicker from '~/components/Form/FormDatePicker'
import FormSelect from '~/components/Form/FormSelect.vue'

export default {
  components: {
    ModalWithTitleBar,
    Wrapper,
    Button,
    FormDatePicker,
    ValidationObserver,
    FormSelect,
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
        type: 'LICENCIA',
        worker: null,
        date_start: new Date(),
        date_end: new Date(),
        status: 'PENDIENTE',
      },
      active: this.value,
      confirmedModal: false,
      isLoading: false,
      languages: ['Español', 'Inglés', 'Frances'],
      languageOptions: [],
      selectedWorker: null,
      workers: [],
      isLoadingFetchWorkers: false,
    }
  },
  watch: {
    value() {
      this.active = this.value
      this.selectedWorker = null
      this.form = {
        type: 'LICENCIA',
        worker: null,
        date_start: new Date(),
        date_end: new Date(),
        status: 'PENDIENTE',
      }
    },
    selectedWorker(val) {
      if (!val) {
        return
      }
      let organizationalUnit = null
      if (val.job_position) {
        organizationalUnit = val.job_position.organizational_unit
      }
      this.form = {
        ...this.form,
        worker: val.id,
        organizational_unit: organizationalUnit,
      }
    },
    selected(val) {
      if (val) {
        const licence = {
          id: val.id,
          type: val.type,
          date_start: new Date(val.date_start),
          date_end: new Date(val.date_end),
          worker: val.worker.id,
          workerTitle: `${val.worker.first_names} ${val.worker.last_names} | ${val.worker.identification_number}`,
          status: val.status,
          organizational_unit: val.organizational_unit,
        }
        this.form = licence
      }
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
    filterLanguages(val) {
      this.languageOptions = this.languages.filter((language) =>
        language.toString().toLowerCase().includes(val.toLowerCase())
      )
    },
    async fetchWorkers(searchText) {
      this.isLoadingFetchWorkers = true
      const filter = {
        _where: {
          _or: [
            { first_names_contains: searchText },
            { last_names_contains: searchText },
            { identification_number_contains: searchText },
          ],
        },
        populate: ['job_position'],
      }
      const workers = await this.$repository.worker.find(filter)
      this.workers = workers.map((worker) => ({
        ...worker,
        title: `${worker.first_names} ${worker.last_names} | ${worker.identification_number}`,
      }))
      this.isLoadingFetchWorkers = false
    },
    handleClose() {
      if (this.form.id) {
        this.$emit('delete', this.form)
      } else {
        this.close()
      }
    },
  },
}
</script>
