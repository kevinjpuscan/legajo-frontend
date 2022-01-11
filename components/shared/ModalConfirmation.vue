<template>
  <b-modal v-model="model" :can-cancel="false" :width="400">
    <modal-with-title-bar :title="titleModalAction" :close="rejectAction">
      <div class="is-justify-content-center" style="text-align: center">
        <strong>Estas seguro que deseas continuar</strong>
      </div>
      <template v-slot:footer>
        <div class="is-justify-content-flex-end">
          <Button type="is-text" @click="rejectAction"> Cancelar </Button>

          <Button type="is-primary" @click="resolveAction"> Aceptar </Button>
        </div>
      </template>
    </modal-with-title-bar>
  </b-modal>
</template>

<script>
import Button from "~/components/shared/Button";
import ModalWithTitleBar from "~/components/shared/ModalWithTitleBar.vue";

export default {
  components: {
    Button,
    ModalWithTitleBar,
  },
  props: {
    titleModalAction: {
      type: String,
      default: "",
    },
    model: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    resolveAction() {
      this.$emit("resolve");
    },
    rejectAction() {
      this.$emit("reject");
    },
  },
};
</script>