<template>
  <Wrapper>
    <section class="actions">
      <div>
        <Button @click="toogleModalNewWorker">Agregar Servidor Público</Button>
      </div>
      <div class="action-search">
        <b-input
          v-model="searchText"
          icon="account-search"
          type="text"
          placeholder="Buscar por nombre o DNI"
          name="search"
        />
      </div>
    </section>

    <section class="elements">
      <div class="element" v-for="(worker, index) in workers" :key="index">
        <WorkerCard
          image="https://industrial.unmsm.edu.pe/wp-content/uploads/2015/03/foto-carnet1.jpg"
          :names="`${worker.first_names} ${worker.last_names}`"
          :job-position="jobPosition(worker)"
          :area="area(worker)"
          :id="worker.id"
          :is-large="true"
        />
      </div>
    </section>

    <section class="pagination">
      <Pagination
        :current-page="Number(currentPage)"
        :route-base="`?search=${searchText}&page=`"
        :has-more-next="workers.length === perPage"
        :has-more-preview="currentPage > 1"
      />
    </section>
    <ModalNewWorker
      :value="showModalNewWorker"
      @submit="submitNewWorker"
      @close="toogleModalNewWorker"
    />
    <ModalConfirmation
      :model="showModalConfirmation"
      @resolve="resolveAction"
      @reject="rejectAction"
    />
  </Wrapper>
</template>

<script>
import Wrapper from "~/components/containers/Wrapper.vue";
import Button from "~/components/shared/Button.vue";
import WorkerCard from "~/components/molecules/WorkerCard.vue";
import Pagination from "~/components/shared/Pagination.vue";
import ModalNewWorker from "~/components/workers/ModalNewWorker.vue";
import ModalConfirmation from "~/components/shared/ModalConfirmation.vue";
export default {
  name: "HomePage",

  components: {
    Wrapper,
    Button,
    WorkerCard,
    Pagination,
    ModalNewWorker,
    ModalConfirmation,
  },
  data: () => ({
    workers: [],
    searchText: "",
    currentPage: 1,
    perPage: 15,
    showModalNewWorker: false,
    showModalConfirmation: false,
    newWorker: {},
  }),
  computed: {
    filters() {
      return {
        populate: ["job_position", "job_position.organizational_unit"],
        _where: {
          _or: [
            { first_names_contains: this.searchText },
            { last_names_contains: this.searchText },
            { identification_number_contains: this.searchText },
          ],
        },
        _limit: this.perPage,
        _start: (this.currentPage - 1) * this.perPage,
      };
    },
  },
  async fetch() {
    const { page, search } = this.$route.query;
    this.currentPage = page || 1;
    this.searchText = search || "";
    this.workers = await this.fetchWorkers();
  },
  methods: {
    async fetchWorkers() {
      return this.$repository.worker.find(this.filters);
    },
    area(worker) {
      return worker.job_position?.organizational_unit?.name;
    },
    jobPosition(worker) {
      return worker.job_position?.title;
    },
    toogleModalNewWorker() {
      this.showModalNewWorker = !this.showModalNewWorker;
    },
    toogleModalConfirmation() {
      this.showModalConfirmation = !this.showModalConfirmation;
    },
    submitNewWorker(form) {
      this.newWorker = form;
      this.toogleModalConfirmation();
    },
    async resolveAction() {
      this.$store.commit("loading", true);
      try {
        await this.$repository.worker.create(this.newWorker);
        this.$buefy.toast.open({
          message: "Servidor Público registrado correctamente",
          type: "is-success",
          queue: false,
          duration: 3000,
        });
        this.toogleModalNewWorker();
      } catch (e) {
        this.$buefy.toast.open({
          message: "Ocurrió un error, verifique la información",
          type: "is-danger",
        });
      } finally {
        this.$store.commit("loading", false);
        await this.$fetch();
        this.toogleModalConfirmation();
      }
    },
    rejectAction() {
      this.toogleModalConfirmation();
      console.log("reject");
    },
  },
  watch: {
    async searchText() {
      this.workers = await this.fetchWorkers();
    },
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
  @media screen and (min-width: $breakpoint-mobile) {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 10rem), 150px));
  }
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(100%, 10rem), min(1fr, 150px))
  );
}

.element {
  grid-column: span 2;
}

.pagination {
  justify-content: center;
  padding: 1rem 0;
}
</style>
