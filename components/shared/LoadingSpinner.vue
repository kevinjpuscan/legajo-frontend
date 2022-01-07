<template>
  <div class="spinner-modal">
    <b-modal :active="true" :can-cancel="false" scroll="keep">
      <div class="loading-container">
        <semipolar-spinner
          :animation-duration="2000"
          :size="250"
          color="#209cee"
        />
      </div>
    </b-modal>
  </div>
</template>

<script>
import { SemipolarSpinner } from "epic-spinners";

export default {
  components: {
    SemipolarSpinner,
  },
};
</script>

<style lang="scss" scoped>
.loading-container {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.spinner-modal {
  z-index: 50;

  .animation-content.modal-content {
    overflow: hidden;
  }
}
</style>
