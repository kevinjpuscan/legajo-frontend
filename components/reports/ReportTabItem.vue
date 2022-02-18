<template>
  <div>
    <Report
      v-for="(report, idx) in reports"
      :key="idx"
      :title="report.name"
      :slug="report.slug"
      :config="report.config"
      :typo="report.type"
    />
  </div>
</template>

<script>
import Report from '~/components/reports/Report.vue'
export default {
  components: {
    Report,
  },
  props: {
    reports: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
