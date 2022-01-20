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
            :key="option.id"
            :value="option.id"
          >
            {{ option.title }}
          </option>
        </b-select>
      </div>
    </div>
    <div class="subsection-content">
      <div
        v-for="(documentFactory, index) in subSection.documentFactories"
        :key="index"
        class="document-content"
      >
        <Document
          :id="documentFactory.id"
          :title="documentFactory.title"
          :document-factory="documentFactory"
          :handle-click="handleClickDocument"
        />
      </div>
    </div>
    <div class="modals">
      <ModalNewDocument
        :value="newDocument.isOpenModal"
        @submit="() => {}"
        @close="closeModalNewDocument"
      />
      <ModalShowDocument
        :value="showDocument.isOpenModal"
        :document-factory="showDocument.documentFactory"
        @submit="() => {}"
        @delete="showModalDeleteConfirmation"
        @close="closeModalShowDocument"
      />
      <ModalConfirmationDelete
        :model="documentDelete.isOpenModal"
        @resolve="deleteDocument"
        @reject="cancelDeleteDocument"
      />
    </div>
  </section>
</template>

<script>
import Document from '~/components/documents/Document.vue'
import ModalNewDocument from '~/components/documents/ModalNewDocument.vue'
import ModalShowDocument from '~/components/documents/ModalShowDocument.vue'
import ModalConfirmationDelete from '~/components/shared/ModalConfirmation.vue'
export default {
  components: {
    Document,
    ModalNewDocument,
    ModalShowDocument,
    ModalConfirmationDelete,
  },
  props: {
    subSection: {
      type: Object,
      default: () => ({
        title: 'Título de subsección',
        ordinal_letter: '0.',
        documentFactories: [],
      }),
    },
  },
  data: () => ({
    options: [],
    newDocument: {
      isOpenModal: false,
    },
    showDocument: {
      isOpenModal: false,
      documentFactory: {},
    },
    documentDelete: {
      documentId: 0,
      isOpenModal: false,
    },
  }),
  methods: {
    title() {
      const ordinalLetter =
        this.subSection.ordinal_letter !== ''
          ? `${this.subSection.ordinal_letter}. `
          : ''
      return `${ordinalLetter}${this.subSection.title}`
    },
    closeModalNewDocument() {
      this.newDocument.isOpenModal = false
    },
    closeModalShowDocument() {
      this.showDocument.isOpenModal = false
    },
    async showModalShowDocument(documentFactory) {
      const documents = await this.$repository.document.find({
        _where: {
          id_in: documentFactory.documents?.map((document) => document.id),
        },
        populate: ['document_files'],
      })
      documentFactory.documents = documents
      this.showDocument = { isOpenModal: true, documentFactory }
    },
    async handleClickDocument(documentFactory) {
      documentFactory.documents.length > 0
        ? await this.showModalShowDocument(documentFactory)
        : (this.newDocument.isOpenModal = true)
    },
    showModalDeleteConfirmation(documentId) {
      this.documentDelete = {
        documentId,
        isOpenModal: true,
      }
    },
    async deleteDocument() {
      await this.$repository.document.delete(this.documentDelete.documentId)
      this.documentDelete = {
        documentId: 0,
        isOpenModal: false,
      }
      this.showDocument = { isOpenModal: false, documentFactory: {} }
      this.cancelDeleteDocument()
      this.$emit('refresh')
    },
    cancelDeleteDocument() {
      this.documentDelete = {
        documentId: 0,
        isOpenModal: false,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/scss/_theme-default';
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
