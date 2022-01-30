<template>
  <div>
    <loading-spinner v-if="$store.state.loading" />
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
            <Button type="is-light" @click="salir"> Salir </Button>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

    <section>
      <div :class="`layout-container ${open ? 'open' : 'close'}`">
        <div
          :class="`collapse-menu ${open ? 'open' : 'close'}`"
          @click="toogleMenu"
        >
          <b-icon
            class="collapse-icon"
            icon="arrow-left-circle"
            size="is-medium"
          />
        </div>
        <div :class="`menu-container ${open ? 'open' : 'close'}`">
          <Menu
            :worker="this.$store.state.worker.worker"
            :sections="sections"
          />
        </div>
        <div class="page">
          <div class="content-page">
            <Nuxt />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Menu from '~/components/molecules/Menu.vue'
import Button from '~/components/shared/Button.vue'
import LoadingSpinner from '~/components/shared/LoadingSpinner.vue'
export default {
  middleware: 'auth',
  components: {
    Menu,
    Button,
    LoadingSpinner,
  },
  async fetch() {
    const { worker } = this.$route.params
    await this.$store.dispatch('worker/fetchWorker', worker)
    this.fetchSections()
  },
  data() {
    return {
      open: true,
      items: [
        {
          title: 'Servidores Públicos',
          to: { name: '/' },
        },
        {
          title: 'Rotaciones',
          to: { name: '/rotaciones' },
        },
        {
          title: 'Licencias',
          to: { name: '/licencias' },
        },
        {
          title: 'Remuneraciones',
          to: { name: '/remuneraciones' },
        },
        {
          title: 'Reportes',
          to: { name: '/reportes' },
        },
      ],
      sections: [],
    }
  },
  methods: {
    async fetchSections() {
      this.sections = await this.$repository.section.find({ _limit: -1 })
    },
    toogleMenu() {
      this.open = !this.open
    },
    salir() {
      this.$router.push('/salir')
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/scss/_theme-default';
.company-logo {
  color: $primary;
  font-weight: bold;
  font-size: 1.2rem;
}
.navbar-main {
  padding: 0 1rem;
}

.layout-container.close {
  grid-template-columns: 1fr;
}

.layout-container {
  display: grid;
  grid-template-columns: min(70%, 20rem) 1fr;
  grid-template-rows: 1fr;
  height: calc(100vh - 64px);

  .menu-container {
    background: #fafbfc;
    border: 1px solid #e6e6e6;
    transition: 0.5s;
  }

  .menu-container.close {
    display: none;
    transition: 0.5s;
  }
}

.collapse-menu {
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  padding: 0.5rem;
  position: absolute;
  top: 80px;
  left: min(56%, 16.5rem);
  transition: 0.5s;
}
.collapse-icon {
  transition: 0.5s;
}

.collapse-menu.close {
  left: 0;
  transition: 0.5s;
  background: #209cee;
  color: white;
  .collapse-icon {
    transform: rotate(180deg);
    transition: 0.5s;
  }
}

.page {
  overflow-x: hidden;

  .content-page {
    width: 100%;
    min-width: 400px;
  }
}
</style>
