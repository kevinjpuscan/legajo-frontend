<template>
  <nuxt-link :to="`/workers/${id}`">
    <div class="worker-card">
      <div class="worker-image">
        <figure class="media-left">
          <p class="image is-64x64">
            <b-image
              v-if="image"
              :src="image"
              alt="The Buefy Logo"
              ratio="1by1"
              :rounded="true"
            ></b-image>
            <b-skeleton
              v-if="!image"
              circle
              width="64px"
              height="64px"
            ></b-skeleton>
          </p>
        </figure>
      </div>
      <div class="worker-content">
        <p>
          <span class="worker-area">{{ area }}</span>
        </p>
        <p>
          <span class="worker-names">{{ names }}</span>
        </p>
        <p>
          <span class="worker-position">{{ jobPosition }}</span>
        </p>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: null,
    },
    jobPosition: {
      type: String,
      default: "Sin Cargo",
    },
    area: {
      type: String,
      default: "Sin Area",
    },
    names: {
      type: String,
      default: "NN",
    },
    id: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/_theme-default";

.worker-card:hover {
  cursor: pointer;
}
.worker-card {
  padding: 0.5rem 1rem;
  box-shadow: $navbar-box-shadow;
  border-radius: 5px;
  display: flex;
  background: $white;

  .worker-image {
    display: flex;
    align-items: center;
  }

  .worker-content {
    width: 100%;
    .worker-area {
      color: $text-ligth;
      font-weight: 600;
      font-size: 10px;
      text-transform: uppercase;
    }
    .worker-names {
      color: $text-color;
      font-weight: bold;
      font-size: 16px;
    }
    .worker-position {
      color: $text-color;
      font-weight: normal;
      font-size: 12px;
    }
  }
}
</style>