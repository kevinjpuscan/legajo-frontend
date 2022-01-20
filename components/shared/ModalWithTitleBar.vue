<template>
  <div class="modal-with-title-bar">
    <div class="modal-title-container">
      <div class="modal-title">
        <p class="subtitle is-4">{{ title }}</p>
      </div>
      <div class="modal-close-button">
        <button type="button" class="delete" @click="close" />
      </div>
    </div>
    <section class="modal-card-body pt-2">
      <slot></slot>
    </section>
    <footer
      v-if="hasFooter"
      class="modal-card-foot is-justify-content-flex-end"
    >
      <slot name="footer" />
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    close: {
      default: () => {},
      type: Function,
    },
    title: {
      default: 'title',
      type: String,
    },
  },
  computed: {
    hasFooter() {
      return this.$slots.footer
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-title-container {
  padding: 1.5rem 1.5rem 1rem;
  display: flex;
  justify-content: space-between;
  background-color: white;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: 1px solid #ebebeb;
}

.modal-card-body {
  padding-top: 0;
}

.modal-with-title-bar .close-circle-icon {
  cursor: pointer;
  color: rgba(10, 10, 10, 0.2);
}
</style>
