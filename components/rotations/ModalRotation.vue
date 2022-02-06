<template>
  <div>
    <b-modal
      v-model="active"
      :width="600"
      :can-cancel="['escape', 'outside']"
      @close="close"
    >
      <ValidationObserver v-slot="{ handleSubmit, invalid }" tag="form" slim>
        <ModalWithTitleBar :title="title" :close="close">
          <Wrapper type="sm">
            <form style="padding-bottom: 1rem">
              <FormSelect
                label="Servidor Público:"
                place-holder="Buscar por nombre, apellido o DNI"
                :data="workers"
                :is-loading="isLoadingFetchWorkers"
                :value="workerValue"
                @typing="fetchWorkers"
                @selected="selectedWorker"
              />
              <FormSelect
                v-if="!isNew"
                label="Puesto Origen:"
                place-holder="Buscar por puesto"
                :data="jobPositionFrom"
                :is-loading="false"
                :value="jobPositionFromValue"
                @typing="fetchJobPositionFrom"
                @selected="(position) => (form.job_position_from = position.id)"
              />
              <FormSelect
                label="Puesto Destino:"
                place-holder="Buscar por puesto"
                :data="jobPositionTo"
                :is-loading="false"
                :value="jobPositionToValue"
                @typing="fetchJobPositionTo"
                @selected="(position) => (form.job_position_to = position.id)"
              />
              <FormDatePicker
                v-model="form.date_change"
                label="Fecha de cambio"
                required
              />
            </form>
          </Wrapper>
          <template #footer>
            <div class="is-justify-content-flex-end">
              <Button type="is-text" rounded @click="handleCancel">
                {{ cancelButton }}
              </Button>
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
import FormDatePicker from '~/components/Form/FormDatePicker.vue'
import FormSelect from '~/components/Form/FormSelect.vue'

export default {
  components: {
    ModalWithTitleBar,
    Wrapper,
    Button,
    ValidationObserver,
    FormDatePicker,
    FormSelect,
  },
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    rotation: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: { date_change: '' },
      active: this.value,
      workers: [],
      isLoadingFetchWorkers: false,
      jobPositionFrom: [],
      jobPositionTo: [],
    }
  },
  computed: {
    isNew() {
      return !this.form.id
    },
    title() {
      return this.form.id ? 'Modificar Rotación' : 'Registrar Rotación'
    },
    cancelButton() {
      return this.form.id ? 'Eliminar Rotación' : 'Cancelar'
    },
    workerValue() {
      const worker = this.rotation && this.rotation.worker
      if (!worker) {
        return ''
      }
      return `${worker.first_names} ${worker.last_names} | ${worker.identification_number}`
    },
    jobPositionFromValue() {
      const jobPosition = this.rotation && this.rotation.job_position_from
      if (!jobPosition) {
        return ''
      }
      return `${jobPosition.title} (${jobPosition.organizational_unit.name})`
    },
    jobPositionToValue() {
      const jobPosition = this.rotation && this.rotation.job_position_to
      if (!jobPosition) {
        return ''
      }
      return `${jobPosition.title} (${jobPosition.organizational_unit.name})`
    },
  },
  watch: {
    value() {
      this.active = this.value
      if (this.rotation) {
        this.form = {
          ...this.rotation,
          date_change: new Date(this.rotation.date_change),
        }
      } else {
        this.form = {
          date_change: new Date(),
        }
      }
    },
  },
  methods: {
    close() {
      this.active = !this.active
      this.$emit('close')
      this.form = {}
    },
    handleDelete() {
      this.$emit('delete', this.form)
    },
    handleCancel() {
      this.form.id ? this.handleDelete() : this.close()
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
      }
      const workers = await this.$repository.worker.find(filter)
      this.workers = workers.map((worker) => ({
        ...worker,
        title: `${worker.first_names} ${worker.last_names} | ${worker.identification_number}`,
      }))
      this.isLoadingFetchWorkers = false
    },

    async fetchJobPosition(searchText) {
      const filter = {
        _where: {
          title_contains: searchText,
        },
        populate: ['organizational_unit'],
      }
      const jobPositions = await this.$repository.jobPosition.find(filter)
      return jobPositions.map((jobPosition) => ({
        ...jobPosition,
        title: `${jobPosition.title} (${jobPosition.organizational_unit.name})`,
      }))
    },
    async fetchJobPositionFrom(searchText) {
      this.jobPositionFrom = await this.fetchJobPosition(searchText)
    },
    async fetchJobPositionTo(searchText) {
      this.jobPositionTo = await this.fetchJobPosition(searchText)
    },
    submit() {
      const form = {
        ...this.form,
        worker: this.form.worker.id || this.form.worker,
        job_position_from: this.form.job_position_from
          ? this.form.job_position_from.id || this.form.job_position_from
          : null,
        job_position_to:
          this.form.job_position_to.id || this.form.job_position_to,
      }
      this.$emit('submit', form)
    },
    selectedWorker(worker) {
      if (this.isNew) {
        this.form = {
          ...this.form,
          worker,
          job_position_from: worker.job_position,
        }
      } else {
        this.form = {
          ...this.form,
          worker,
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.form-group {
  padding: 0.3rem 0;
}
.document-information {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem 0;
}
.form-group-files {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
