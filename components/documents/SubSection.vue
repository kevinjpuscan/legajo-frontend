<template>
  <section class="subsection">
    <div class="subsection-header">
      <div class="subsection-title">
        <h1>{{ title() }}</h1>
      </div>
      <div class="subsection-actions">
        <b-select placeholder="Agregar Documento">
          <option
            v-for="option in subSection.documentFactories"
            :value="option.id"
            :key="option.id"
          >
            {{ option.title }}
          </option>
        </b-select>
      </div>
    </div>
    <div class="subsection-content">
      <div
        class="document-content"
        v-for="(documentFactory, index) in subSection.documentFactories"
        :key="index"
      >
        <Document
          :id="documentFactory.id"
          :title="documentFactory.title"
          :documents="documentFactory.documents"
        />
      </div>
    </div>
  </section>
</template>

<script>
import Document from "~/components/documents/Document.vue";
export default {
  components: { Document },
  props: {
    subSection: {
      type: Object,
      default: () => ({
        title: "Título de subsección",
        ordinal_letter: "0.",
        documentFactories: [],
      }),
    },
  },
  data: () => ({
    options: [
      { id: 1, title: "Documento tipo 1" },
      { id: 2, title: "Documento tipo 2" },
      { id: 3, title: "Documento tipo 3" },
      { id: 4, title: "Documento tipo 4" },
      { id: 5, title: "Documento tipo 5" },
    ],
  }),
  methods: {
    title() {
      const ordinalLetter =
        this.subSection.ordinal_letter !== ""
          ? `${this.subSection.ordinal_letter}. `
          : "";
      return `${ordinalLetter}${this.subSection.title}`;
    },
  },
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
  @media screen and (min-width: $breakpoint-mobile) {
    grid-template-columns: repeat(
      auto-fit,
      minmax(min(100%, 5rem), min(1fr, 150px))
    );
  }
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 5rem), 150px));
  gap: 1.5rem;
  padding: 1.5rem 0;
}

.subsection-actions {
  max-width: 250px;
}

.document-content {
  grid-column: span 2;
}
</style>