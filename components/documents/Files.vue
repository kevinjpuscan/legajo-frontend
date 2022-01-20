<template>
  <div class="field-files">
    <div class="field-files_label">
      <h3>Archivos:</h3>
    </div>
    <div class="field-files_value">
      <ul>
        <li v-for="(file, index) in files" :key="index">
          <a :href="file.url | fileUrl">{{ file.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CONFIG from '~/config/index'
export default {
  filters: {
    fileUrl(url) {
      return `${CONFIG.strapiUrl}${url}`
    },
  },
  props: {
    files: { type: Array, default: () => [] },
  },
}
</script>

<style lang="scss" scoped>
.field-files {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 1rem 0;
  .field-files_label {
    h3 {
      font-size: 1.2rem;
      font-weight: bold;
    }
  }
}
</style>
