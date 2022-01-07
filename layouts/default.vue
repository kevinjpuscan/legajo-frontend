<template>
  <div>
    <b-navbar class="navbar-main">
      <template #brand>
        <b-navbar-item
          class="company-logo"
          tag="router-link"
          :to="{ path: '/' }"
        >
          LEGAJO MPC
        </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-item
          v-for="(item, index) in items"
          :key="index"
          :href="item.to.name"
        >
          {{ item.title }}
        </b-navbar-item>
      </template>

      <template #end>
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-light"> Salir </a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

    <section>
      <Nuxt />
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Servidores Públicos",
          to: { name: "/inicio" },
        },
        {
          title: "Rotaciones",
          to: { name: "/rotaciones" },
        },
        {
          title: "Licencias",
          to: { name: "/licencias" },
        },
        {
          title: "Remuneraciones",
          to: { name: "/remuneraciones" },
        },
        {
          title: "Reportes",
          to: { name: "/reportes" },
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/_theme-default";
.company-logo {
  color: $primary;
  font-weight: bold;
  font-size: 1.2rem;
}
.navbar-main {
  padding: 0 1rem;
}
</style>
