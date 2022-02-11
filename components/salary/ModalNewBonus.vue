<template>
  <div>
    <b-modal
      v-model="active"
      :width="600"
      :can-cancel="['escape', 'outside']"
      @close="close"
    >
      <ValidationObserver v-slot="{ handleSubmit, invalid }" tag="form" slim>
        <ModalWithTitleBar title="Agregar Bono" :close="close">
          <Wrapper type="sm">
            <form style="padding: 3rem 0">
              <FormSelect
                label="Puesto:"
                place-holder="Buscar por puesto"
                :data="jobPositions"
                :is-loading="false"
                @typing="fetchJobPosition"
                @selected="(position) => (form.job_position = position.id)"
              />
              <FormEnum
                v-model="form.state"
                label="Estado:"
                :options="['ACTIVO', 'INACTIVO']"
                @change="(val) => (form.status = val)"
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
              <b-field label="Documento:">
                <b-select v-model="form.document">
                  <option
                    v-for="option in documents"
                    :key="option.id"
                    :value="option.id"
                  >
                    {{ option.title }}
                  </option>
                </b-select>
              </b-field>
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
    workerId: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      form: {
        state: 'ACTIVO',
        job_position: null,
        document: null,
        amount: null,
        date_start: new Date(),
        date_end: new Date(),
      },
      active: this.value,
      confirmedModal: false,
      isLoading: false,
      jobPositions: [],
      documents: [],
    }
  },
  watch: {
    value() {
      this.active = this.value
      this.form = {
        state: 'ACTIVO',
        job_position: null,
        document: null,
        amount: null,
        date_start: new Date(),
        date_end: new Date(),
      }
    },
    workerId() {
      this.fetchDocuments()
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
    async fetchJobPosition(searchText) {
      const filter = {
        _where: {
          title_contains: searchText,
        },
        populate: ['organizational_unit'],
      }
      const jobPositions = await this.$repository.jobPosition.find(filter)
      this.jobPositions = jobPositions.map((jobPosition) => ({
        ...jobPosition,
        title: `${jobPosition.title} (${jobPosition.organizational_unit.name})`,
      }))
    },
    async fetchDocuments() {
      if (!this.workerId) {
        this.documents = []
        return
      }
      const filter = {
        _where: {
          'document_factory.slug': 'bonificaciones',
          worker: this.workerId,
        },
        populate: ['document_factory'],
      }
      const documents = await this.$repository.document.find(filter)
      this.documents = documents.map((document) => ({
        ...document,
        title: document.information.find(
          (info) => info.field === 'document_that_recognizes_bonus'
        )
          ? document.information.find(
              (info) => info.field === 'document_that_recognizes_bonus'
            ).value
          : document.created_at,
      }))
    },
  },
}
</script>
