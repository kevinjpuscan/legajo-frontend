<template>
  <div>
    <b-modal
      v-model="active"
      :width="600"
      :can-cancel="['escape', 'outside']"
      @close="close"
    >
      <ModalWithTitleBar title="Detalle de documento" :close="close">
        <Wrapper type="sm">
          <div class="document-information">
            <div class="document-header">
              <h1>{{ documentFactory.title }}</h1>
            </div>
            <div class="document-controls">
              <b-select
                v-model="documentActiveId"
                placeholder="Selecciona un documento"
              >
                <option
                  v-for="option in documentOptions"
                  :key="option.id"
                  :value="option.id"
                >
                  {{ option.title }}
                </option>
              </b-select>
            </div>
            <div class="document-body">
              <Field
                v-for="(field, index) in documentActive.information"
                :key="index"
                :label="field.name"
                :value="field.value"
                :type="field.type"
              />
              <Files :files="documentActive.document_files" />
            </div>
          </div>
        </Wrapper>
        <template #footer>
          <div class="modal-footer_actions">
            <Button type="is-text" rounded @click="handleDelete()">
              Eliminar Documento
            </Button>
            <Button type="is-primary" rounded @click="submit">
              Agregar Nuevo Documento
            </Button>
          </div>
        </template>
      </ModalWithTitleBar>
    </b-modal>
  </div>
</template>

<script>
import Files from './Files.vue'
import ModalWithTitleBar from '~/components/shared/ModalWithTitleBar.vue'
import Wrapper from '~/components/containers/Wrapper.vue'
import Button from '~/components/shared/Button.vue'
import Field from '~/components/documents/Fields/Field.vue'

export default {
  components: {
    ModalWithTitleBar,
    Wrapper,
    Button,
    Field,
    Files,
  },
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    documentFactory: {
      type: Object,
      default: () => ({ documents: [] }),
    },
  },
  data() {
    return {
      form: {
        identification_number: '',
        last_names: '',
        first_names: '',
        birth_date: '',
      },
      active: this.value,
      confirmedModal: false,
      isLoading: false,
      documentActiveId: 0,
      documentActive: {},
    }
  },
  computed: {
    documentOptions() {
      return this.documentFactory.documents?.map((document) => ({
        id: document.id,
        title: `${document.created_at}`,
      }))
    },
  },
  watch: {
    value() {
      this.active = this.value
      this.form = {}
    },
    documentActiveId() {
      if (!this.documentActiveId) {
        this.documentActive = {}
      }
      this.documentActive =
        this.documentFactory.documents?.find(
          (document) => document.id === this.documentActiveId
        ) || {}
    },
    documentFactory() {
      this.documentActiveId = this.documentFactory.documents
        ? this.documentFactory.documents[0].id
        : null
    },
  },
  methods: {
    close() {
      this.active = !this.active
      this.$emit('close')
      this.form = {}
    },
    submit() {
      this.$emit('submit', this.documentFactory)
    },
    handleDelete() {
      this.$emit('delete', this.documentActiveId)
    },
  },
}
</script>

<style lang="scss" scoped>
.document-information {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem 0;
}
.modal-footer_actions {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
