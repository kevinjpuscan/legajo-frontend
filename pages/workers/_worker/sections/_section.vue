<template>
  <Wrapper>
    <div class="section">
      <SubSection
        v-for="(subSection, index) in subSections"
        :key="index"
        :sub-section="subSection"
      />
    </div>
  </Wrapper>
</template>

<script>
import Wrapper from "~/components/containers/Wrapper.vue";
import SubSection from "~/components/documents/SubSection.vue";
export default {
  components: {
    Wrapper,
    SubSection,
  },
  layout: "documents",
  async fetch() {
    this.$store.commit("loading", true);
    const { worker, section } = this.$route.params;
    const currentSection = await this.$repository.section.findOne(section);
    const documents = await this.$repository.document.find({
      _where: {
        worker,
        document_factory_in: currentSection.document_factories.map(
          (doc) => doc.id
        ),
      },
    });

    const documentsFactories = currentSection.document_factories.map(
      (documentFactory) => ({
        ...documentFactory,
        documents: documents.filter(
          (document) => document.document_factory === documentFactory.id
        ),
      })
    );

    if (currentSection.subsections.length > 0) {
      this.subSections = currentSection.subsections.map((subsection) => ({
        ...subsection,
        documentFactories: documentsFactories.filter(
          (documentFactory) => documentFactory.subsection === subsection.id
        ),
      }));
    } else {
      this.subSections = [
        {
          id: 0,
          ordinal_letter: "",
          title: currentSection.title,
          documentFactories: documentsFactories,
        },
      ];
    }
    this.$store.commit("loading", false);
  },
  data: () => ({
    subSections: [],
  }),
};
</script>

<style lang="scss" scoped>
.section {
  padding: 5rem 0;
}
</style>