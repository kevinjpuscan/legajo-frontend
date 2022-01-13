<template>
  <div :class="`document ${active() && 'active'}`" @click="toogleModal">
    <b-tooltip :label="title" multilined>
      <div class="document-title">
        {{ title | short }}
      </div>
      <div class="document-total">{{ documents.length }} documentos</div>
    </b-tooltip>
  </div>
</template>

<script>
export default {
  filters: {
    short(slug) {
      const MAX_LETTERS = 80;
      return slug.length > MAX_LETTERS
        ? `${slug.substring(0, MAX_LETTERS)}...`
        : slug;
    },
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: "",
    },
    documents: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    isModalOpen: false,
  }),
  methods: {
    toogleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    active() {
      return this.documents.length > 0;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/_theme-default";

.document.active {
  color: #209cee;
  border: solid 3px #209cee;
}
.document {
  cursor: pointer;
  border-radius: 5px;
  border: solid 3px #828282;
  color: #828282;
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  min-height: 150px;

  .document-total {
    font-weight: bold;
  }
}
</style>

