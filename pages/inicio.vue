<template>
  <Wrapper>
    <section class="actions">
      <div>
        <Button>Agregar Servidor Público</Button>
      </div>
      <div class="action-search">
        <b-input
          icon="account-search"
          type="text"
          placeholder="Buscar por nombre, DNI o cargo"
          name="search"
        />
      </div>
    </section>

    <section class="elements">
      <div class="element">
        <WorkerCard
          job-position="Ing. de Sistemas"
          names="Juan Perez Chavez"
          area="Area de Sistemas"
          id="5"
          :is-large="true"
        />
      </div>
      <div class="element">
        <WorkerCard
          image="https://industrial.unmsm.edu.pe/wp-content/uploads/2015/03/foto-carnet1.jpg"
          job-position="Ing. de Sistemas"
          names="Juan Perez Chavez"
          area="Area de Sistemas"
          id="5"
          :is-large="true"
        />
      </div>
      <div class="element">
        <WorkerCard
          image="https://industrial.unmsm.edu.pe/wp-content/uploads/2015/03/foto-carnet1.jpg"
          job-position="Ing. de Sistemas"
          area="Area de Sistemas"
          id="5"
          :is-large="true"
        />
      </div>
      <div class="element">
        <WorkerCard
          image="https://industrial.unmsm.edu.pe/wp-content/uploads/2015/03/foto-carnet1.jpg"
          job-position="Ing. de Sistemas"
          names="Juan Perez Chavez"
          area="Area de Sistemas"
          id="5"
          :is-large="true"
        />
      </div>
      <div class="element">
        <WorkerCard
          image="https://industrial.unmsm.edu.pe/wp-content/uploads/2015/03/foto-carnet1.jpg"
          job-position="Ing. de Sistemas"
          names="Juan Perez Chavez"
          area="Area de Sistemas"
          id="5"
          :is-large="true"
        />
      </div>
      <div class="element">
        <WorkerCard
          image="https://industrial.unmsm.edu.pe/wp-content/uploads/2015/03/foto-carnet1.jpg"
          job-position="Ing. de Sistemas"
          names="Juan Perez Chavez"
          area="Area de Sistemas"
          id="5"
          :is-large="true"
        />
      </div>
      <div class="element">
        <WorkerCard
          image="https://industrial.unmsm.edu.pe/wp-content/uploads/2015/03/foto-carnet1.jpg"
          job-position="Ing. de Sistemas"
          names="Juan Perez Chavez"
          area="Area de Sistemas"
          id="5"
          :is-large="true"
        />
      </div>
      <div class="element">
        <WorkerCard
          image="https://industrial.unmsm.edu.pe/wp-content/uploads/2015/03/foto-carnet1.jpg"
          job-position="Ing. de Sistemas"
          names="Juan Perez Chavez"
          area="Area de Sistemas"
          id="5"
          :is-large="true"
        />
      </div>
      <div class="element">
        <WorkerCard
          image="https://industrial.unmsm.edu.pe/wp-content/uploads/2015/03/foto-carnet1.jpg"
          job-position="Ing. de Sistemas"
          names="Juan Perez Chavez"
          area="Area de Sistemas"
          id="5"
          :is-large="true"
        />
      </div>
      <div class="element">
        <WorkerCard
          image="https://industrial.unmsm.edu.pe/wp-content/uploads/2015/03/foto-carnet1.jpg"
          job-position="Ing. de Sistemas"
          names="Juan Perez Chavez"
          area="Area de Sistemas"
          id="5"
          :is-large="true"
        />
      </div>
    </section>

    <section class="pagination">
      <b-pagination
        v-model="currentPage"
        :range-before="rangeBefore"
        :range-after="rangeAfter"
        :order="order"
        :size="size"
        :simple="isSimple"
        :rounded="isRounded"
        :per-page="perPage"
        :icon-prev="prevIcon"
        :icon-next="nextIcon"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
      </b-pagination>
    </section>
  </Wrapper>
</template>

<script>
import Wrapper from "~/components/containers/Wrapper.vue";
import Button from "~/components/shared/Button.vue";
import WorkerCard from "~/components/molecules/WorkerCard.vue";

export default {
  name: "HomePage",

  components: {
    Wrapper,
    Button,
    WorkerCard,
  },
  data: () => ({
    currentPage: 1,
  }),
  async fetch() {
    console.log(this.$repository.user);
    const data = await this.$repository.user.findOne(1);
    console.log(data);
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/_theme-default";
.actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 0 1rem 0;

  @media screen and (min-width: $breakpoint-mobile) {
    flex-direction: row;
    justify-content: space-between;
    padding: 3rem 0 1.5rem 0;
  }
  .action-search {
    width: 400px;
    max-width: 95%;
    margin-top: 0.5rem;
    @media screen and (min-width: $breakpoint-mobile) {
      margin-top: 0;
    }
  }
}

.elements {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 10rem), 1fr));
}

.element {
  grid-column: span 2;
}

.pagination {
  justify-content: center;
  padding: 1rem 0;
}
</style>
