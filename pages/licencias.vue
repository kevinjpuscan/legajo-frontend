<template>
  <Wrapper>
    <section class="actions">
      <div>
        <Button @click="toogleModalNewLicence">Agregar Licencia</Button>
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
      :data="workLicenses"
      :striped="true"
      :mobile-cards="true"
      :hoverable="true"
      :bordered="true"
      :loading="isLoading"
      :selected.sync="selected"
      width="100%"
    >
      <b-table-column v-slot="props" label="Tipo">
        {{ props.row.type }}
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
      <b-table-column v-slot="props" label="Unidad Organizacional">
        {{
          (props.row.organizational_unit &&
            props.row.organizational_unit.name) ||
          '' | truncate(20)
        }}
      </b-table-column>
      <b-table-column v-slot="props" label="Desde">
        {{ props.row.date_start | formatDate }}
      </b-table-column>
      <b-table-column v-slot="props" label="Hasta">
        {{ props.row.date_end | formatDate }}
      </b-table-column>
      <b-table-column v-slot="props" label="Estado">
        <b-tag :type="props.row.status | tagType" size="is-medium">{{
          props.row.status | truncate(20)
        }}</b-tag>
      </b-table-column>
      <template #empty>
        <div class="has-text-centered">No se encontraron licencias</div>
      </template>
    </b-table>

    <section class="pagination">
      <Pagination
        :current-page="Number(currentPage)"
        :route-base="`?search=${searchText}&page=`"
        :has-more-next="workLicenses.length === perPage"
        :has-more-preview="currentPage > 1"
      />
    </section>

    <ModalNewLicence
      :value="showModalNewLicence"
      :selected="selected"
      @submit="submitNewLicence"
      @close="
        () => {
          selected = null
          toogleModalNewLicence()
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
import ModalNewLicence from '~/components/licences/ModalNewLicence.vue'
import ModalConfirmation from '~/components/shared/ModalConfirmation.vue'
import Pagination from '~/components/shared/Pagination.vue'
export default {
  name: 'HomePage',

  components: {
    Wrapper,
    Button,
    ModalNewLicence,
    ModalConfirmation,
    Pagination,
  },
  filters: {
    truncate(value, length) {
      return value.length > length ? value.substr(0, length) + '...' : value
    },
    tagType(val) {
      if (val === 'EN_CURSO') {
        return 'is-success'
      }
      if (val === 'PENDIENTE') {
        return 'is-warning'
      }
      if (val === 'FINALIZADA') {
        return 'is-light'
      }
      if (val === 'CANCELADA') {
        return 'is-dark'
      }
      return 'is-info'
    },
  },
  async fetch() {
    const { page, search } = this.$route.query
    this.currentPage = page || 1
    this.searchText = search || ''
    await this.fetchWorkLicenses()
  },
  data: () => ({
    workLicenses: [],
    searchText: '',
    currentPage: 1,
    perPage: 10,
    showModalNewLicence: false,
    showModalConfirmation: false,
    newLicence: {},
    isLoading: false,
    selected: null,
    mode: '',
  }),
  computed: {
    filters() {
      return {
        populate: ['worker', 'organizational_unit'],
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
      await this.fetchWorkLicenses()
    },
    selected(val) {
      if (val) {
        this.toogleModalNewLicence()
      }
    },
  },
  methods: {
    async fetchWorkLicenses() {
      this.isLoading = true
      this.workLicenses = await this.$repository.license.find(this.filters)
      this.isLoading = false
    },
    area(worker) {
      return worker.job_position?.organizational_unit?.name
    },
    jobPosition(worker) {
      return worker.job_position?.title
    },
    toogleModalNewLicence() {
      this.showModalNewLicence = !this.showModalNewLicence
    },
    toogleModalConfirmation() {
      this.showModalConfirmation = !this.showModalConfirmation
    },
    submitNewLicence(form) {
      this.newLicence = form
      this.mode = 'UPDATE-CREATE'
      this.toogleModalConfirmation()
    },
    handleDelete(form) {
      this.newLicence = form
      this.mode = 'DELETE'
      this.toogleModalConfirmation()
    },
    async resolveAction() {
      this.$store.commit('loading', true)
      try {
        let message = ''
        if (this.mode === 'DELETE') {
          await this.$repository.license.delete(this.newLicence.id)
          message = 'Rotación eliminada correctamente'
        }
        if (this.newLicence.id && this.mode === 'UPDATE-CREATE') {
          await this.$repository.license.update(
            this.newLicence.id,
            this.newLicence
          )
          message = 'Rotación actualizada correctamente'
        }

        if (!this.newLicence.id && this.mode === 'UPDATE-CREATE') {
          await this.$repository.license.create(this.newLicence)
          message = 'Rotación registrada correctamente'
        }
        this.mode = ''
        this.$buefy.toast.open({
          message,
          type: 'is-success',
          queue: false,
          duration: 3000,
        })
        this.toogleModalNewLicence()
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
