<template>
  <div>
    <b-modal
      v-model="active"
      :width="600"
      :can-cancel="['escape', 'outside']"
      @close="close"
    >
      <ValidationObserver v-slot="{ handleSubmit, invalid }" tag="form" slim>
        <ModalWithTitleBar title="Agregar documento" :close="close">
          <Wrapper type="sm">
            <form style="padding-bottom: 1rem">
              <div class="document-information">
                <div class="document-header">
                  <h1>{{ documentFactory.title }}</h1>
                </div>
              </div>
              <div
                v-for="(info, index) in documentFactory.info_structure"
                :key="index"
                class="form-group"
              >
                <InputField
                  :label="info.name"
                  :field="info.field"
                  :type="info.type"
                  :pre-value="info.value || ''"
                  :options="info.options || []"
                  @change="handleChange"
                />
              </div>
              <FormLabel label="Archivos Adjuntos:">
                <div class="form-group-files">
                  <ul>
                    <li>- Archivo principal del documento</li>
                    <li v-for="(file, index) in filesRequired" :key="index">
                      - {{ file }}
                    </li>
                  </ul>
                  <b-field>
                    <b-upload v-model="files" multiple drag-drop>
                      <section class="section">
                        <div class="content has-text-centered">
                          <p>
                            <b-icon icon="upload" size="is-large"> </b-icon>
                          </p>
                          <p>Arrastra los archivos aquí</p>
                        </div>
                      </section>
                    </b-upload>
                  </b-field>
                  <div class="tags">
                    <span
                      v-for="(file, index) in files"
                      :key="index"
                      class="tag is-primary"
                    >
                      {{ file.name }}
                      <button
                        class="delete is-small"
                        type="button"
                        @click="deleteDropFile(index)"
                      ></button>
                    </span>
                  </div>
                </div>
              </FormLabel>
            </form>
          </Wrapper>
          <template #footer>
            <div class="is-justify-content-flex-end">
              <Button type="is-text" rounded @click="close"> Cancelar </Button>
              <Button
                type="is-primary"
                rounded
                :disabled="invalid"
                @click="handleSubmit(submit)"
              >
                Guardar
              </Button>
            </div>
          </template>
        </ModalWithTitleBar>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import ModalWithTitleBar from '~/components/shared/ModalWithTitleBar.vue'
import Wrapper from '~/components/containers/Wrapper.vue'
import Button from '~/components/shared/Button.vue'
import InputField from '~/components/documents/InputFields/InputField.vue'
import FIELD_TYPES from '~/constants/fieldTypes'

export default {
  components: {
    ModalWithTitleBar,
    Wrapper,
    Button,
    ValidationObserver,
    InputField,
  },
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    documentFactory: {
      type: Object,
      default: () => {},
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
      files: [],
      active: this.value,
      confirmedModal: false,
      isLoading: false,
      FIELD_TYPES,
    }
  },
  computed: {
    filesRequired() {
      return this.documentFactory.info_structure
        .filter((info) =>
          [FIELD_TYPES.FILE, FIELD_TYPES.IMAGE].includes(info.type)
        )
        .map((info) => info.name)
    },
  },
  watch: {
    value() {
      this.active = this.value
      this.form = [...this.documentFactory.info_structure]
    },
  },
  methods: {
    close() {
      this.active = !this.active
      this.$emit('close')
      this.form = {}
      this.files = []
    },
    async submit() {
      try {
        let documentFiles = []
        if (this.files.length > 0) {
          const filesUploaded = await this.$repository.upload.create(this.files)
          documentFiles = filesUploaded.map((files) => files.id)
        }
        const { worker } = this.$route.params
        const document = {
          worker,
          title: this.documentFactory.title,
          document_factory: this.documentFactory.id,
          information: this.form,
          document_files: documentFiles,
        }
        this.files = []
        this.$emit('submit', document)
      } catch (error) {
        this.$buefy.toast.open({
          message: 'Ocurrió un error, verifique la información',
          type: 'is-danger',
        })
      }
    },
    handleChange({ field, value }) {
      const newForm = this.form.map((element) => {
        if (element.field === field) {
          return { ...element, value }
        }
        return element
      })
      this.form = newForm
    },
    deleteDropFile(index) {
      this.files.splice(index, 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.form-group {
  padding: 0.3rem 0;
}
.document-information {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem 0;
}
.form-group-files {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
