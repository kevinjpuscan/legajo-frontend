<template>
  <div class="field-files">
    <div class="field-files_label">
      <h3>Archivos:</h3>
    </div>
    <div class="field-files_value">
      <ul>
        <li v-for="(file, index) in files" :key="index">
          <a target="_blank" :href="file.url | fileUrl">{{ file.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
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
