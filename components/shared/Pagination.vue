<template>
  <nav class="pagination is-medium" role="navigation" aria-label="pagination">
    <a
      :class="`pagination-previous ${!hasMorePreview && 'is-disabled'}`"
      :href="prevRoute"
      >Anterior</a
    >
    <a
      :class="`pagination-next ${!hasMoreNext && 'is-disabled'}`"
      :href="nextRoute"
      >Siguiente</a
    >
  </nav>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    routeBase: {
      type: String,
      default: "",
    },
    hasMoreNext: {
      type: Boolean,
      default: true,
    },
    hasMorePreview: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    nextRoute() {
      return `${this.routeBase}${
        this.hasMoreNext ? this.currentPage + 1 : this.currentPage
      }`;
    },
    prevRoute() {
      return `${this.routeBase}${
        this.hasMorePreview ? this.currentPage - 1 : this.currentPage
      }`;
    },
  },
};
</script>
