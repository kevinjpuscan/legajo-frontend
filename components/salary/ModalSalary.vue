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
          :title="form.id ? 'Editar remuneración' : 'Registrar remuneración'"
          :close="close"
        >
          <Wrapper type="sm">
            <form style="padding: 3rem 0">
              <FormEnum
                v-model="form.status"
                label="Estado:"
                :options="['ACTIVO', 'INACTIVO']"
                @change="(val) => (form.status = val)"
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

              <b-field label="Conceptos:">
                <ConceptList
                  :concepts="form.salary_concepts"
                  @new="toogleModalNewConcept"
                  @remove="handleRemoveConcept"
                />
              </b-field>
            </form>
          </Wrapper>
          <template #footer>
            <div class="is-justify-content-flex-end">
              <Button type="is-text" rounded @click="handleClose">
                {{ form.id ? 'Eliminar remuneración' : 'Cancelar' }}
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
    <ModalNewConcept
      :value="showModalNewConcept"
      @submit="submitConcept"
      @close="toogleModalNewConcept"
    />
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import ModalWithTitleBar from '~/components/shared/ModalWithTitleBar.vue'
import Wrapper from '~/components/containers/Wrapper.vue'
import Button from '~/components/shared/Button.vue'
import FormDatePicker from '~/components/Form/FormDatePicker'
import FormSelect from '~/components/Form/FormSelect.vue'
import ModalNewConcept from '~/components/salary/ModalNewConcept.vue'
import ConceptList from '~/components/salary/ConceptList.vue'

export default {
  components: {
    ModalWithTitleBar,
    Wrapper,
    Button,
    FormDatePicker,
    ValidationObserver,
    FormSelect,
    ModalNewConcept,
    ConceptList,
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
        status: 'ACTIVO',
        salary_concepts: [],
        total_amount: 0,
        worker: null,
        date_start: new Date(),
        date_end: new Date(),
        bonus: {},
      },
      active: this.value,
      confirmedModal: false,
      isLoading: false,
      selectedWorker: null,
      workers: [],
      isLoadingFetchWorkers: false,
      showModalNewConcept: false,
    }
  },
  computed: {
    totalAmount() {
      return this.form.salary_concepts.reduce((acc, curr) => {
        return acc + curr.amount
      }, 0)
    },
  },
  watch: {
    value() {
      this.active = this.value
      this.selectedWorker = null
      this.form = {
        status: 'ACTIVO',
        salary_concepts: [],
        total_amount: 0,
        worker: null,
        date_start: new Date(),
        date_end: new Date(),
        bonus: {},
      }
    },
    selectedWorker(val) {
      if (!val) {
        return
      }
      this.form = {
        ...this.form,
        worker: val.id,
      }
    },
    selected(val) {
      if (val) {
        const licence = {
          id: val.id,
          status: val.status,
          date_start: new Date(val.date_start),
          date_end: new Date(val.date_end),
          worker: val.worker.id,
          workerTitle: `${val.worker.first_names} ${val.worker.last_names} | ${val.worker.identification_number}`,
          bonus: val.bonus,
          total_amount: val.total_amount,
          salary_concepts: val.salary_concepts,
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
      this.$emit('submit', {
        ...this.form,
        total_amount: this.totalAmount,
        salary_concepts: this.form.salary_concepts.map(
          (salaryConcept) => salaryConcept.id
        ),
        bonus: this.form.bonus ? this.form.bonus.id : null,
      })
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
    async submitConcept(form) {
      this.$store.commit('loading', true)
      try {
        const salaryConcept = await this.$repository.salaryConcept.create(form)
        this.form.salary_concepts = [
          ...this.form.salary_concepts,
          salaryConcept,
        ]
        this.toogleModalNewConcept()
      } catch (e) {
        this.$buefy.toast.open({
          message: 'Ocurrió un error, verifique la información',
          type: 'is-danger',
        })
      }
    },
    toogleModalNewConcept() {
      this.showModalNewConcept = !this.showModalNewConcept
    },
    handleRemoveConcept(idx) {
      this.form.salary_concepts.splice(idx, 1)
    },
  },
}
</script>
