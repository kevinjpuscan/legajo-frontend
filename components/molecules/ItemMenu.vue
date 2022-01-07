<template>
  <nuxt-link to="/workers/1/sections/1">
    <div class="item-menu">
      <div class="item-icon">
        <figure>
          <b-icon icon="file-document-multiple-outline" size="is-medium">
          </b-icon>
        </figure>
      </div>
      <div class="item-content">
        <div class="section-title">
          <span>{{ title }}</span>
        </div>
        <div class="section-description">
          <span> {{ description }}</span>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Sección #",
    },
    description: {
      type: String,
      default: "Sin Descripción",
    },
  },
};
</script>


<style lang="scss" scoped>
@import "assets/scss/_theme-default";

.item-menu:hover {
  background: #f5f5f5;
  color: #209cee;
}

.item-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 5px;
  padding: 0.5rem;
  color: gray;
}

.section-title {
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 150%;
  padding: 0;
}

.section-description {
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 120%;
  padding: 0;
}
</style>