<template>
  <Wrapper>
    <div class="section">
      <SubSection />
      <SubSection />
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
};
</script>

<style lang="scss" scoped>
.section {
  padding: 5rem 0;
}
</style>