<template>
  <div :class="`document ${active && 'active'}`" @click="toogleModal">
    <div class="document-title">
      Resultado de las respectivas etapas del proceso de selección
    </div>
    <div class="document-total">3 documentos</div>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    isModalOpen: false,
  }),
  methods: {
    toogleModal() {
      this.isModalOpen = !this.isModalOpen;
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

  .document-total {
    font-weight: bold;
  }
}
</style>