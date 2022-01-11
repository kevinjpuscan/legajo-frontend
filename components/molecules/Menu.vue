<template>
  <aside class="menu">
    <div class="menu-header"></div>
    <div>
      <WorkerCard
        image="https://industrial.unmsm.edu.pe/wp-content/uploads/2015/03/foto-carnet1.jpg"
        :names="`${worker.first_names} ${worker.last_names}`"
        :job-position="jobPosition(worker)"
        :area="area(worker)"
        :id="worker.id"
      />
    </div>
    <ul>
      <li v-for="(section, index) in sections" :key="index">
        <ItemMenu
          :section-id="section.id"
          :worker-id="worker.id"
          :title="`Sección ${section.ordinal}`"
          :description="section.title"
        />
      </li>
    </ul>
  </aside>
</template>

<script>
import WorkerCard from "~/components/molecules/WorkerCard.vue";
import ItemMenu from "~/components/molecules/ItemMenu";

export default {
  props: {
    worker: {
      type: Object,
      default: () => {},
    },
    sections: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    WorkerCard,
    ItemMenu,
  },
  methods: {
    area(worker) {
      return worker.job_position?.organizational_unit?.name;
    },
    jobPosition(worker) {
      return worker.job_position?.title;
    },
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