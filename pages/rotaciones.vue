<template>
  <Wrapper>
    <section class="actions">
      <div>
        <Button @click="handleCreate">Agregar Rotación</Button>
      </div>
      <div class="action-search">
        <b-input
          v-model="searchText"
          icon="account-search"
          type="text"
          placeholder="Buscar por nombre, apellidos o DNI"
          name="search"
        />
      </div>
    </section>

    <b-table
      :data="rotations"
      :striped="true"
      :mobile-cards="true"
      :hoverable="true"
      :bordered="true"
      :loading="isLoading"
      :selected.sync="selected"
      width="100%"
    >
      <b-table-column v-slot="props" label="Fecha">
        {{ props.row.date_change | dateFormat }}
      </b-table-column>
      <b-table-column v-slot="props" label="DNI">
        {{ props.row.worker.identification_number }}
      </b-table-column>
      <b-table-column v-slot="props" label="Apellidos">
        {{ props.row.worker.last_names | truncate(20) }}
      </b-table-column>
      <b-table-column v-slot="props" label="Nombres">
        {{ props.row.worker.first_names | truncate(20) }}
      </b-table-column>
      <b-table-column v-slot="props" label="Puesto Origen">
        {{
          props.row.job_position_from
            ? props.row.job_position_from.title
            : 'EXTERNO' | truncate(20)
        }}
      </b-table-column>
      <b-table-column v-slot="props" label="Unidad Origen">
        {{
          props.row.job_position_from
            ? props.row.job_position_from.organizational_unit.name
            : 'EXTERNO' | truncate(20)
        }}
      </b-table-column>
      <b-table-column v-slot="props" label="Puesto Destino">
        {{ props.row.job_position_to.title | truncate(20) }}
      </b-table-column>
      <b-table-column v-slot="props" label="Unidad Destino">
        {{ props.row.job_position_to.organizational_unit.name | truncate(20) }}
      </b-table-column>
      <template #empty>
        <div class="has-text-centered">No se encontraron rotaciones</div>
      </template>
    </b-table>

    <section class="pagination">
      <Pagination
        :current-page="Number(currentPage)"
        :route-base="`?search=${searchText}&page=`"
        :has-more-next="rotations.length === perPage"
        :has-more-preview="currentPage > 1"
      />
    </section>

    <ModalRotation
      :value="showModalRotation"
      :rotation="selected"
      @submit="handleSubmit"
      @close="
        () => {
          selected = null
          toogleModalRotation()
        }
      "
      @delete="handleDelete"
    />
    <ModalConfirmation
      :model="showModalConfirmation"
      @resolve="resolveAction"
      @reject="rejectAction"
    />
  </Wrapper>
</template>

<script>
import Wrapper from '~/components/containers/Wrapper.vue'
import Button from '~/components/shared/Button.vue'
import ModalRotation from '~/components/rotations/ModalRotation.vue'
import ModalConfirmation from '~/components/shared/ModalConfirmation.vue'
import Pagination from '~/components/shared/Pagination.vue'
export default {
  name: 'HomePage',

  components: {
    Wrapper,
    Button,
    ModalRotation,
    ModalConfirmation,
    Pagination,
  },
  filters: {
    truncate(value, length) {
      return value.length > length ? value.substr(0, length) + '...' : value
    },
    dateFormat(value) {
      return new Date(value).toLocaleDateString('en-US')
    },
  },
  async fetch() {
    const { page, search } = this.$route.query
    this.currentPage = page || 1
    this.searchText = search || ''
    await this.fetchRotations()
  },
  data: () => ({
    rotations: [],
    searchText: '',
    currentPage: 1,
    perPage: 10,
    showModalRotation: false,
    showModalConfirmation: false,
    rotation: {},
    isLoading: false,
    selected: null,
    mode: '',
  }),
  computed: {
    filters() {
      return {
        populate: [
          'worker',
          'job_position_from',
          'job_position_from.organizational_unit',
          'job_position_to',
          'job_position_to.organizational_unit',
        ],
        _or: [
          { 'worker.first_names_contains': this.searchText },
          { 'worker.last_names_contains': this.searchText },
          { 'worker.identification_number_contains': this.searchText },
        ],
        _limit: this.perPage,
        _start: (this.currentPage - 1) * this.perPage,
      }
    },
  },
  watch: {
    async searchText() {
      await this.fetchRotations()
    },
    selected() {
      if (this.selected) {
        this.toogleModalRotation()
      }
    },
  },
  methods: {
    async fetchRotations() {
      this.isLoading = true
      this.rotations = await this.$repository.rotation.find(this.filters)
      this.isLoading = false
    },
    area(worker) {
      return worker.job_position?.organizational_unit?.name
    },
    jobPosition(worker) {
      return worker.job_position?.title
    },
    toogleModalRotation() {
      this.showModalRotation = !this.showModalRotation
    },
    toogleModalConfirmation() {
      this.showModalConfirmation = !this.showModalConfirmation
    },
    handleCreate() {
      this.selected = null
      this.toogleModalRotation()
    },
    handleSubmit(form) {
      this.rotation = form
      this.mode = 'UPDATE-CREATE'
      this.toogleModalConfirmation()
    },
    handleDelete(form) {
      this.rotation = form
      this.mode = 'DELETE'
      this.toogleModalConfirmation()
    },
    async resolveAction() {
      this.$store.commit('loading', true)
      try {
        let message = ''
        if (this.mode === 'DELETE') {
          await this.$repository.rotation.delete(this.rotation.id)
          message = 'Rotación eliminada correctamente'
        }
        if (this.rotation.id && this.mode === 'UPDATE-CREATE') {
          await this.$repository.rotation.update(
            this.rotation.id,
            this.rotation
          )
          message = 'Rotación actualizada correctamente'
        }

        if (!this.rotation.id && this.mode === 'UPDATE-CREATE') {
          await this.$repository.rotation.create(this.rotation)
          message = 'Rotación registrada correctamente'
        }
        this.mode = ''
        this.$buefy.toast.open({
          message,
          type: 'is-success',
          queue: false,
          duration: 3000,
        })
        this.toogleModalRotation()
      } catch (e) {
        this.$buefy.toast.open({
          message: 'Ocurrió un error, verifique la información',
          type: 'is-danger',
        })
      } finally {
        this.$store.commit('loading', false)
        await this.$fetch()
        this.toogleModalConfirmation()
      }
    },
    rejectAction() {
      this.toogleModalConfirmation()
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/scss/_theme-default';
.actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 0 1rem 0;

  @media screen and (min-width: $breakpoint-mobile) {
    flex-direction: row;
    justify-content: space-between;
    padding: 3rem 0 1.5rem 0;
  }
  .action-search {
    width: 400px;
    max-width: 95%;
    margin-top: 0.5rem;
    @media screen and (min-width: $breakpoint-mobile) {
      margin-top: 0;
    }
  }
}

.pagination {
  justify-content: center;
  padding: 1rem 0;
}
</style>
