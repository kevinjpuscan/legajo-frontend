<template>
  <aside class="menu">
    <div class="menu-header"></div>
    <div>
      <WorkerCard />
    </div>
    <ul>
      <li>
        <ItemMenu />
      </li>
      <li>
        <ItemMenu />
      </li>
      <li>
        <ItemMenu />
      </li>
      <li>
        <ItemMenu />
      </li>
      <li>
        <ItemMenu />
      </li>
      <li>
        <ItemMenu />
      </li>
      <li>
        <ItemMenu />
      </li>
    </ul>
  </aside>
</template>

<script>
import WorkerCard from "~/components/molecules/WorkerCard.vue";
import ItemMenu from "~/components/molecules/ItemMenu";

export default {
  components: {
    WorkerCard,
    ItemMenu,
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/_theme-default";
.menu {
  padding: 1.5rem 1rem;
}

.menu ul li {
  margin-top: 1rem;
}

.menu-header {
  height: 60px;
}
</style>