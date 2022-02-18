<template>
  <section>
    <div class="report">
      <div class="report-header">
        <strong>{{ title }}</strong>
      </div>
      <div class="report-content">
        <div v-if="!!config.filters" class="report-content_filters">
          <FilterComponent
            v-for="(filter, idx) in (config.filters || []).filter((filter) =>
              ['ENUM', 'DYNAMIC'].includes(filter.type)
            )"
            :key="idx"
            :label="filter.label"
            :param="filter.param"
            :query="filter.query"
            :type="filter.type"
            :options-enum="filter.options"
            @selected="handleSelected"
          />
          <div style="padding-top: 2rem">
            <b-button type="is-success" @click="handleRefresh"
              >Actualizar</b-button
            >
          </div>
        </div>
        <div class="report-content_main">
          <b-table
            :data="records"
            :striped="true"
            :mobile-cards="true"
            :hoverable="true"
            :bordered="true"
            :loading="isLoading"
            width="100%"
          >
            <b-table-column
              v-for="(column, index) in columns"
              v-slot="props"
              :key="index"
              :label="column.label"
            >
              {{ props.row[column.field] }}
            </b-table-column>
          </b-table>
          <div
            v-if="config.paginate"
            style="
              padding: 0.7rem 0;
              display: flex;
              justify-content: center;
              gap: 1rem;
            "
          >
            <b-button type="is-info" @click="prevPage">Anterior</b-button>
            <b-button disabled>{{ page }}</b-button>
            <b-button type="is-info" @click="nextPage">Siguiente</b-button>
          </div>
        </div>
      </div>
      <div class="report-footer"></div>
    </div>
  </section>
</template>

<script>
import FilterComponent from '~/components/reports/Filter.vue'
export default {
  components: {
    FilterComponent,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    slug: {
      type: String,
      default: '',
    },
    config: {
      type: Object,
      default: () => ({}),
    },
    type: {
      type: String,
      default: 'TABLE',
    },
  },
  data: () => ({
    records: [],
    isLoading: false,
    columns: [],
    page: 1,
    filters: [],
  }),
  watch: {
    async page(page) {
      await this.fetchRecords({ slug: this.slug, page })
    },
  },
  async mounted() {
    await this.fetchRecords({ slug: this.slug, page: this.page })
    const newFilters = { ...this.filters }
    for (const filter of this.config.filters || []) {
      if (newFilters[filter.param]) {
        newFilters[filter.param] = { ...newFilters[filter.param], ...filter }
      }
    }
    this.filters = newFilters
  },
  methods: {
    async fetchRecords(query) {
      const { data } = await this.$repository.report.getData(query)
      if (this.type === 'TABLE') {
        this.columns = this.config.columns
      }
      this.records = data
    },
    nextPage() {
      if (this.records.length >= this.config.paginate.perPage) {
        this.page = this.page + 1
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page = this.page - 1
      }
    },
    handleSelected({ param, value }) {
      const newFilters = { ...this.filters }
      if (newFilters[param]) {
        newFilters[param] = { ...newFilters[param], param, value }
      } else {
        newFilters[param] = { param, value }
      }
      this.filters = newFilters
    },
    handleRefresh() {
      this.fetchRecords({
        slug: this.slug,
        page: this.page,
        filters: this.formatFilter({ ...this.filters }),
      })
    },
    formatFilter(filters) {
      const filtersFormated = []
      for (const key in filters) {
        filtersFormated.push(filters[key])
      }
      return filtersFormated
    },
  },
}
</script>

<style lang="scss" scoped>
.report {
  padding: 1rem 0;
}
.report-header {
  display: flex;
  justify-content: center;
  padding: 0.3rem 0;
  text-align: center;
}
.report-content_filters {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}
</style>
