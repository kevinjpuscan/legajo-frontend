<template>
  <section class="subsection">
    <div class="subsection-header">
      <div class="subsection-title">
        <h1>A.Título de la SubSection</h1>
      </div>
      <div class="subsection-actions">
        <b-select placeholder="Agregar Documento">
          <option v-for="option in options" :value="option.id" :key="option.id">
            {{ option.title }}
          </option>
        </b-select>
      </div>
    </div>
    <div class="subsection-content">
      <div class="document-content">
        <Document :active="true" />
      </div>
      <div class="document-content">
        <Document :active="true" />
      </div>
      <div class="document-content">
        <Document :active="true" />
      </div>
      <div class="document-content">
        <Document :active="true" />
      </div>
      <div class="document-content">
        <Document />
      </div>
      <div class="document-content">
        <Document />
      </div>
    </div>
  </section>
</template>

<script>
import Document from "~/components/documents/Document.vue";
export default {
  components: { Document },
  data: () => ({
    options: [
      { id: 1, title: "Documento tipo 1" },
      { id: 2, title: "Documento tipo 2" },
      { id: 3, title: "Documento tipo 3" },
      { id: 4, title: "Documento tipo 4" },
      { id: 5, title: "Documento tipo 5" },
    ],
  }),
};
</script>

<style lang="scss" scoped>
@import "assets/scss/_theme-default";
.subsection {
  padding: 1.5rem 0;

  .subsection-header {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    @media screen and (max-width: $breakpoint-mobile) {
      flex-direction: column;
      gap: 0.5rem;
      align-items: center;
    }
  }
}
.subsection-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 5rem), 1fr));
  gap: 1.5rem;
  padding: 1.5rem 0;
}

.document-content {
  grid-column: span 2;
}
</style>