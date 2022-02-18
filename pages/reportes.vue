<template>
  <Wrapper>
    <div style="padding-top: 1.5rem">
      <section>
        <b-tabs v-model="currentTab" position="is-centered" class="block">
          <b-tab-item
            v-for="(reportGroup, idx) in reportGroups"
            :key="idx"
            :value="reportGroup.slug"
            :label="reportGroup.title"
          >
            <ReportTabItem
              v-if="currentTab === reportGroup.slug"
              :reports="reportGroup.reports"
            />
          </b-tab-item>
        </b-tabs>
        <div v-if="currentTab === ''">
          Selecciona un grupo de reportes para ver la información
        </div>
      </section>
    </div>
  </Wrapper>
</template>

<script>
import Wrapper from '~/components/containers/Wrapper.vue'
import ReportTabItem from '~/components/reports/ReportTabItem.vue'
export default {
  components: { Wrapper, ReportTabItem },
  async fetch() {
    this.reportGroups = await this.fetchReportGroups()
  },
  data: () => ({
    currentTab: '',
    reportGroups: [],
  }),
  methods: {
    fetchReportGroups() {
      return this.$repository.reportGroup.find({ _sort: 'order:ASC' })
    },
  },
}
</script>
